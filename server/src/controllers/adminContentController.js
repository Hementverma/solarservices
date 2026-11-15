import ContactSetting from '../models/ContactSetting.js'
import CalculatorSetting from '../models/CalculatorSetting.js'
import Service from '../models/Service.js'
import Location from '../models/Location.js'
import asyncHandler from '../utils/asyncHandler.js'
import { defaultCalculator, defaultContact } from '../data/defaultContent.js'
import httpError from '../utils/httpError.js'
import { PROPERTY_TYPES, SERVICE_CITIES } from '../data/constants.js'

export const getContactSettings = asyncHandler(async (_req, res) => {
  const setting = await ContactSetting.findOne({ singleton: 'main' }).lean()
  res.json({ contact: setting || defaultContact })
})

export const updateContactSettings = asyncHandler(async (req, res) => {
  const body = req.body
  const phoneDigits = String(body.phone || '').replace(/\D/g, '')
  const derivedRaw = phoneDigits
    ? phoneDigits.startsWith('91')
      ? `+${phoneDigits}`
      : `+91${phoneDigits.slice(-10)}`
    : body.phoneRaw
  const phone2Digits = String(body.phone2 || '').replace(/\D/g, '')
  const derivedPhone2Raw = phone2Digits
    ? phone2Digits.startsWith('91')
      ? `+${phone2Digits}`
      : `+91${phone2Digits.slice(-10)}`
    : body.phone2Raw

  const payload = {
    phone: String(body.phone).trim(),
    phoneRaw: String(body.phoneRaw || derivedRaw).trim(),
    phone2: body.phone2 ? String(body.phone2).trim() : '',
    phone2Raw: body.phone2Raw || derivedPhone2Raw ? String(body.phone2Raw || derivedPhone2Raw).trim() : '',
    whatsapp: String(body.whatsapp || derivedRaw).replace(/\s/g, ''),
    email: String(body.email).trim().toLowerCase(),
    address: String(body.address).trim(),
    hours: String(body.hours).trim(),
    mapsUrl: body.mapsUrl ? String(body.mapsUrl).trim() : '',
  }

  const contact = await ContactSetting.findOneAndUpdate(
    { singleton: 'main' },
    { $set: payload, $setOnInsert: { singleton: 'main' } },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  )

  res.json({ message: 'Contact details updated.', contact })
})

export const getCalculatorSettings = asyncHandler(async (_req, res) => {
  const setting = await CalculatorSetting.findOne({ singleton: 'main' })
  if (!setting) return res.json({ calculator: defaultCalculator })

  const plain = setting.toObject()
  delete plain._id
  delete plain.singleton
  delete plain.updatedBy
  delete plain.__v
  delete plain.createdAt
  plain.updatedAt = setting.updatedAt
  res.json({ calculator: plain })
})

export const updateCalculatorSettings = asyncHandler(async (req, res) => {
  const body = req.body
  const tariffDefaults = {}
  PROPERTY_TYPES.forEach((type) => {
    tariffDefaults[type] = Number(body.tariffDefaults?.[type])
  })
  const peakSunHoursByCity = {}
  SERVICE_CITIES.forEach((city) => {
    peakSunHoursByCity[city] = Number(body.peakSunHoursByCity?.[city])
  })

  const setting = await CalculatorSetting.findOneAndUpdate(
    { singleton: 'main' },
    {
      $set: {
        tariffDefaults,
        peakSunHoursByCity,
        performanceRatio: Number(body.performanceRatio),
        systemCostPerKw: Number(body.systemCostPerKw),
        co2PerKwh: Number(body.co2PerKwh),
        minCapacity: Number(body.minCapacity),
        maxCapacity: Number(body.maxCapacity),
        updatedBy: req.admin._id,
      },
      $setOnInsert: { singleton: 'main' },
    },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  )

  const plain = setting.toObject()
  delete plain._id
  delete plain.singleton
  delete plain.updatedBy
  delete plain.__v
  delete plain.createdAt

  res.json({ message: 'Calculator assumptions updated.', calculator: plain })
})

export const adminListServices = asyncHandler(async (_req, res) => {
  const services = await Service.find().sort({ order: 1, createdAt: 1 })
  res.json({ services })
})

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)
  if (!service) throw httpError(404, 'Service not found.')

  const body = req.body
  const allowed = [
    'title',
    'shortDescription',
    'description',
    'image',
    'icon',
    'bestFor',
    'active',
    'order',
  ]
  allowed.forEach((field) => {
    if (body[field] !== undefined) service[field] = body[field]
  })

  if (Array.isArray(body.features)) {
    service.features = body.features
      .map((feature) => String(feature).trim())
      .filter(Boolean)
      .slice(0, 10)
  }

  await service.save()
  res.json({ message: 'Service updated.', service })
})

export const adminListLocations = asyncHandler(async (_req, res) => {
  const locations = await Location.find().sort({ order: 1, createdAt: 1 })
  res.json({ locations })
})

export const updateLocation = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id)
  if (!location) throw httpError(404, 'Location not found.')

  const body = req.body
  const allowed = [
    'name',
    'title',
    'metaTitle',
    'metaDescription',
    'intro',
    'description',
    'image',
    'active',
    'order',
  ]
  allowed.forEach((field) => {
    if (body[field] !== undefined) location[field] = body[field]
  })

  if (Array.isArray(body.highlights)) {
    location.highlights = body.highlights
      .map((item) => String(item).trim())
      .filter(Boolean)
      .slice(0, 10)
  }
  if (Array.isArray(body.areas)) {
    location.areas = body.areas
      .map((item) => String(item).trim())
      .filter(Boolean)
      .slice(0, 15)
  }

  await location.save()
  res.json({ message: 'Location updated.', location })
})
