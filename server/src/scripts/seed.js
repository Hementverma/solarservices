import { config } from '../config/env.js'
import { connectDB, disconnectDB } from '../config/db.js'
import Admin from '../models/Admin.js'
import ContactSetting from '../models/ContactSetting.js'
import CalculatorSetting from '../models/CalculatorSetting.js'
import Service from '../models/Service.js'
import Location from '../models/Location.js'
import {
  defaultCalculator,
  defaultContact,
  defaultLocations,
  defaultServices,
} from '../data/defaultContent.js'

async function seed() {
  try {
    await connectDB(config.mongoUri)

    let admin = await Admin.findOne({ email: config.admin.email })
    if (!admin) {
      admin = new Admin({
        name: config.admin.name,
        email: config.admin.email,
        role: 'admin',
        active: true,
      })
      await admin.setPassword(config.admin.password)
      await admin.save()
      console.log(`[seed] Admin created: ${config.admin.email}`)
    } else {
      console.log(`[seed] Admin already exists: ${config.admin.email}`)
    }

    const contactResult = await ContactSetting.updateOne(
      { singleton: 'main' },
      { $setOnInsert: defaultContact },
      { upsert: true },
    )
    console.log(`[seed] Contact settings ${contactResult.upsertedCount ? 'created' : 'already exist'}.`)

    const calculatorResult = await CalculatorSetting.updateOne(
      { singleton: 'main' },
      { $setOnInsert: defaultCalculator },
      { upsert: true },
    )
    console.log(
      `[seed] Calculator settings ${calculatorResult.upsertedCount ? 'created' : 'already exist'}.`,
    )

    for (const service of defaultServices) {
      const result = await Service.updateOne(
        { slug: service.slug },
        { $setOnInsert: service },
        { upsert: true },
      )
      if (result.upsertedCount) console.log(`[seed] Service created: ${service.title}`)
    }

    for (const location of defaultLocations) {
      const result = await Location.updateOne(
        { slug: location.slug },
        { $setOnInsert: location },
        { upsert: true },
      )
      if (result.upsertedCount) console.log(`[seed] Location created: ${location.name}`)
    }

    console.log('[seed] Seed completed successfully.')
    console.log(`[seed] Admin login: ${config.admin.email}`)
    console.log('[seed] Use ADMIN_PASSWORD from the server .env file.')
    await disconnectDB()
    process.exit(0)
  } catch (error) {
    console.error('[seed] Failed:', error)
    await disconnectDB()
    process.exit(1)
  }
}

seed()
