import mongoose from 'mongoose'
import Enquiry from '../models/Enquiry.js'
import asyncHandler from '../utils/asyncHandler.js'
import { generateEnquiryId } from '../utils/enquiryId.js'
import { enquiriesToCsv } from '../utils/csv.js'
import { ENQUIRY_STATUSES, SERVICE_CITIES } from '../data/constants.js'
import httpError from '../utils/httpError.js'

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildFilters(query) {
  const filter = {}

  if (query.status) {
    if (!ENQUIRY_STATUSES.includes(query.status)) {
      throw httpError(400, 'Invalid enquiry status filter.')
    }
    filter.status = query.status
  }

  if (query.city) {
    if (!SERVICE_CITIES.includes(query.city)) {
      throw httpError(400, 'Invalid city filter.')
    }
    filter.city = query.city
  }

  if (query.search && String(query.search).trim()) {
    const search = String(query.search).trim().slice(0, 80)
    const regex = new RegExp(escapeRegex(search), 'i')
    filter.$or = [
      { name: regex },
      { mobile: regex },
      { enquiryId: regex },
      { consumerNumber: regex },
    ]
  }

  if (query.from || query.to) {
    filter.createdAt = {}
    if (query.from) {
      const from = new Date(query.from)
      if (Number.isNaN(from.getTime())) throw httpError(400, 'Invalid start date.')
      filter.createdAt.$gte = from
    }
    if (query.to) {
      const to = new Date(query.to)
      if (Number.isNaN(to.getTime())) throw httpError(400, 'Invalid end date.')
      to.setHours(23, 59, 59, 999)
      filter.createdAt.$lte = to
    }
  }

  return filter
}

export const createEnquiry = asyncHandler(async (req, res) => {
  if (req.body.website) {
    return res.status(400).json({ message: 'Invalid submission. Please try again.' })
  }

  const recentDuplicate = await Enquiry.exists({
    mobile: req.body.mobile,
    createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
  })

  if (recentDuplicate) {
    throw httpError(
      409,
      'We have already received an enquiry from this mobile number recently. Please wait a few minutes before submitting again, or contact us by phone.',
    )
  }

  let enquiry = null
  for (let attempt = 0; attempt < 3 && !enquiry; attempt += 1) {
    try {
      enquiry = await Enquiry.create({
        enquiryId: generateEnquiryId(),
        name: req.body.name,
        mobile: req.body.mobile,
        city: req.body.city,
        propertyType: req.body.propertyType,
        monthlyBill:
          req.body.monthlyBill === undefined ||
          req.body.monthlyBill === null ||
          req.body.monthlyBill === ''
            ? null
            : Number(req.body.monthlyBill),
        consumerNumber: req.body.consumerNumber || '',
        subsidyCapacity:
          req.body.subsidyCapacity === undefined ||
          req.body.subsidyCapacity === null ||
          req.body.subsidyCapacity === ''
            ? null
            : Number(req.body.subsidyCapacity),
        requirement: req.body.requirement,
        message: req.body.message || '',
        consent: req.body.consent,
        consentAt: new Date(),
        source: req.body.source || 'website',
      })
    } catch (error) {
      if (error.code !== 11000 || attempt === 2) throw error
    }
  }

  res.status(201).json({
    message: 'Your enquiry has been received. Our team will contact you shortly.',
    enquiryId: enquiry.enquiryId,
    name: enquiry.name,
    status: enquiry.status,
    createdAt: enquiry.createdAt,
  })
})

export const listEnquiries = asyncHandler(async (req, res) => {
  const filter = buildFilters(req.query)
  const page = Math.max(1, Number(req.query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 12))
  const skip = (page - 1) * limit

  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Enquiry.countDocuments(filter),
  ])

  res.json({
    enquiries,
    pagination: {
      page,
      limit,
      total,
      pages: Math.max(1, Math.ceil(total / limit)),
    },
  })
})

export const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params
  const filter = mongoose.isValidObjectId(id)
    ? { $or: [{ _id: id }, { enquiryId: id }] }
    : { enquiryId: id }

  const enquiry = await Enquiry.findOne(filter)
  if (!enquiry) throw httpError(404, 'Enquiry not found.')
  res.json({ enquiry })
})

export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body
  if (!ENQUIRY_STATUSES.includes(status)) {
    throw httpError(400, 'Please select a valid enquiry status.')
  }

  const enquiry = await Enquiry.findById(req.params.id)
  if (!enquiry) throw httpError(404, 'Enquiry not found.')

  enquiry.status = status
  await enquiry.save()

  res.json({
    message: 'Enquiry status updated.',
    enquiry,
  })
})

export const addEnquiryNote = asyncHandler(async (req, res) => {
  const { text } = req.body
  if (!text || !String(text).trim()) {
    throw httpError(400, 'Note text is required.')
  }
  if (String(text).trim().length > 1000) {
    throw httpError(400, 'Notes cannot exceed 1000 characters.')
  }

  const enquiry = await Enquiry.findById(req.params.id)
  if (!enquiry) throw httpError(404, 'Enquiry not found.')

  enquiry.notes.push({
    text: String(text).trim(),
    addedBy: req.admin._id,
    addedByName: req.admin.name,
  })
  await enquiry.save()

  res.status(201).json({
    message: 'Internal note added.',
    notes: enquiry.notes,
  })
})

export const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id)
  if (!enquiry) throw httpError(404, 'Enquiry not found.')
  res.json({ message: 'Enquiry deleted permanently.' })
})

export const exportEnquiries = asyncHandler(async (req, res) => {
  const filter = buildFilters(req.query)
  const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 }).limit(10000).lean()
  const csv = enquiriesToCsv(enquiries)
  const date = new Date().toISOString().slice(0, 10)

  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="ramesh-solar-enquiries-${date}.csv"`,
  )
  res.send(csv)
})

export const getStats = asyncHandler(async (_req, res) => {
  const monthStart = new Date()
  monthStart.setDate(1)
  monthStart.setHours(0, 0, 0, 0)

  const [total, newCount, converted, notInterested, thisMonth, statusAgg, cityAgg, recent] =
    await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'New' }),
      Enquiry.countDocuments({ status: 'Converted' }),
      Enquiry.countDocuments({ status: 'Not Interested' }),
      Enquiry.countDocuments({ createdAt: { $gte: monthStart } }),
      Enquiry.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Enquiry.aggregate([
        { $group: { _id: '$city', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Enquiry.find().sort({ createdAt: -1 }).limit(5),
    ])

  const byStatus = Object.fromEntries(ENQUIRY_STATUSES.map((status) => [status, 0]))
  statusAgg.forEach((item) => {
    if (item._id in byStatus) byStatus[item._id] = item.count
  })

  const byCity = Object.fromEntries(SERVICE_CITIES.map((city) => [city, 0]))
  cityAgg.forEach((item) => {
    if (item._id in byCity) byCity[item._id] = item.count
  })

  res.json({
    stats: {
      total,
      new: newCount,
      converted,
      notInterested,
      thisMonth,
      activePipeline: total - converted - notInterested,
      conversionRate: total ? Math.round((converted / total) * 1000) / 10 : 0,
      byStatus,
      byCity,
      recent,
    },
  })
})
