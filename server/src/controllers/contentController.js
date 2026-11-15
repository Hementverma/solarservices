import Service from '../models/Service.js'
import Location from '../models/Location.js'
import ContactSetting from '../models/ContactSetting.js'
import CalculatorSetting from '../models/CalculatorSetting.js'
import { defaultCalculator, defaultContact } from '../data/defaultContent.js'
import asyncHandler from '../utils/asyncHandler.js'

function calculatorPayload(setting) {
  if (!setting) {
    return {
      ...defaultCalculator,
      singleton: undefined,
      updatedAt: null,
    }
  }
  const plain = setting.toObject()
  delete plain._id
  delete plain.singleton
  delete plain.updatedBy
  delete plain.__v
  delete plain.createdAt
  plain.updatedAt = setting.updatedAt
  return plain
}

export const getPublicContent = asyncHandler(async (_req, res) => {
  const [contact, calculator, services, locations] = await Promise.all([
    ContactSetting.findOne({ singleton: 'main' }).lean(),
    CalculatorSetting.findOne({ singleton: 'main' }),
    Service.find({ active: true }).sort({ order: 1, createdAt: 1 }).lean(),
    Location.find({ active: true }).sort({ order: 1, createdAt: 1 }).lean(),
  ])

  const publicContact = contact
    ? {
        phone: contact.phone,
        phoneRaw: contact.phoneRaw,
        phone2: contact.phone2 || '',
        phone2Raw: contact.phone2Raw || '',
        whatsapp: contact.whatsapp,
        email: contact.email,
        address: contact.address,
        hours: contact.hours,
        mapsUrl: contact.mapsUrl || '',
      }
    : defaultContact

  res.set('Cache-Control', 'public, max-age=60')
  res.json({
    contact: publicContact,
    calculator: calculatorPayload(calculator),
    services: services.map(({ _id, __v, ...rest }) => rest),
    locations: locations.map(({ _id, __v, ...rest }) => rest),
  })
})
