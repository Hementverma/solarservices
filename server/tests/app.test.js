import test, { after, before } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'

const TEST_MONGO_URI = 'mongodb://127.0.0.1:27017/ramesh_solar_test'
const ADMIN_EMAIL = 'admin@rameshsolar.in'
const ADMIN_PASSWORD = 'TestPass@123'

process.env.NODE_ENV = 'test'
process.env.MONGODB_URI = TEST_MONGO_URI
process.env.JWT_SECRET = 'test-only-secret-ramesh-solar-services-123456'
process.env.CLIENT_URL = 'http://localhost:5173'
process.env.ADMIN_EMAIL = ADMIN_EMAIL
process.env.ADMIN_PASSWORD = ADMIN_PASSWORD

let app
let agent
let mongoose
let disconnectDB
let Admin
let Enquiry

const enquiryPayload = {
  name: 'Integration Test Customer',
  mobile: '9876501234',
  city: 'Indore',
  propertyType: 'Home',
  monthlyBill: 4200,
  requirement: 'Residential Solar',
  message: 'Please contact me for a rooftop site assessment.',
  consent: true,
  source: 'integration-test',
}

before(async () => {
  const db = await import('../src/config/db.js')
  const { createApp } = await import('../src/app.js')
  mongoose = (await import('mongoose')).default
  Admin = (await import('../src/models/Admin.js')).default
  Enquiry = (await import('../src/models/Enquiry.js')).default
  const ContactSetting = (await import('../src/models/ContactSetting.js')).default
  const CalculatorSetting = (await import('../src/models/CalculatorSetting.js')).default
  const Service = (await import('../src/models/Service.js')).default
  const Location = (await import('../src/models/Location.js')).default
  const {
    defaultCalculator,
    defaultContact,
    defaultLocations,
    defaultServices,
  } = await import('../src/data/defaultContent.js')

  disconnectDB = db.disconnectDB
  await db.connectDB(TEST_MONGO_URI)
  await mongoose.connection.dropDatabase()

  const admin = new Admin({
    name: 'Test Admin',
    email: ADMIN_EMAIL,
    role: 'admin',
    active: true,
  })
  await admin.setPassword(ADMIN_PASSWORD)
  await admin.save()

  await ContactSetting.create(defaultContact)
  await CalculatorSetting.create(defaultCalculator)
  await Service.create(defaultServices[0])
  await Location.create(defaultLocations[0])

  app = createApp()
  agent = request.agent(app)
})

after(async () => {
  if (mongoose) await mongoose.connection.dropDatabase()
  if (disconnectDB) await disconnectDB()
})

test('health endpoint reports a connected database', async () => {
  const response = await request(app).get('/api/health').expect(200)
  assert.equal(response.body.status, 'ok')
  assert.equal(response.body.database, 'connected')
})

test('public content exposes active services, locations and defaults', async () => {
  const response = await request(app).get('/api/content').expect(200)
  assert.equal(response.body.services.length, 1)
  assert.equal(response.body.locations.length, 1)
  assert.equal(response.body.services[0].slug, 'residential-solar')
  assert.match(response.body.contact.phone, /^\+91/)
  assert.equal(response.body.calculator.performanceRatio, 0.8)
  assert.match(response.body.contact.phone2, /^\+91/)
})

test('admin routes reject unauthenticated requests', async () => {
  await request(app).get('/api/auth/me').expect(401)
  await request(app).get('/api/admin/stats').expect(401)
  await request(app).get('/api/enquiries').expect(401)
})

test('login validates credentials and creates a session', async () => {
  await agent
    .post('/api/auth/login')
    .send({ email: ADMIN_EMAIL, password: 'WrongPassword@123' })
    .expect(401)

  const login = await agent
    .post('/api/auth/login')
    .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    .expect(200)

  assert.equal(login.body.admin.email, ADMIN_EMAIL)
  assert.equal(login.body.admin.role, 'admin')
  assert.ok(login.headers['set-cookie']?.some((cookie) => cookie.includes('rss_admin_token')))
  assert.equal(login.body.admin.passwordHash, undefined)

  const me = await agent.get('/api/auth/me').expect(200)
  assert.equal(me.body.admin.email, ADMIN_EMAIL)

  const stats = await agent.get('/api/admin/stats').expect(200)
  assert.equal(stats.body.stats.total, 0)
})

test('public enquiry rejects invalid input and consent', async () => {
  const invalid = await request(app)
    .post('/api/enquiries')
    .send({ ...enquiryPayload, mobile: '12345', consent: false })
    .expect(400)

  assert.ok(invalid.body.errors.length >= 2)
  assert.equal(await Enquiry.countDocuments(), 0)
})

test('enquiry lifecycle supports create, list, status, notes, export and delete', async () => {
  const created = await request(app)
    .post('/api/enquiries')
    .send(enquiryPayload)
    .expect(201)

  assert.match(created.body.enquiryId, /^RSS-\d{4}-[A-F0-9]{8}$/)
  assert.equal(created.body.name, enquiryPayload.name)

  await request(app).post('/api/enquiries').send(enquiryPayload).expect(409)

  const list = await agent
    .get('/api/enquiries')
    .query({ search: 'Integration Test', city: 'Indore', status: 'New' })
    .expect(200)

  assert.equal(list.body.pagination.total, 1)
  const enquiry = list.body.enquiries[0]
  assert.equal(enquiry.mobile, enquiryPayload.mobile)

  const detail = await agent.get(`/api/enquiries/${enquiry._id}`).expect(200)
  assert.equal(detail.body.enquiry.name, enquiryPayload.name)
  assert.equal(detail.body.enquiry.consent, true)

  const updated = await agent
    .patch(`/api/enquiries/${enquiry._id}/status`)
    .send({ status: 'Contacted' })
    .expect(200)
  assert.equal(updated.body.enquiry.status, 'Contacted')

  const note = await agent
    .post(`/api/enquiries/${enquiry._id}/notes`)
    .send({ text: 'Called the customer; site visit to be scheduled.' })
    .expect(201)
  assert.equal(note.body.notes.length, 1)
  assert.equal(note.body.notes[0].addedByName, 'Test Admin')

  const stats = await agent.get('/api/admin/stats').expect(200)
  assert.equal(stats.body.stats.total, 1)
  assert.equal(stats.body.stats.byStatus.Contacted, 1)
  assert.equal(stats.body.stats.byCity.Indore, 1)
  assert.equal(stats.body.stats.conversionRate, 0)

  const csv = await agent
    .get('/api/enquiries/export.csv')
    .query({ search: 'Integration Test' })
    .expect(200)
  assert.match(csv.headers['content-type'], /text\/csv/)
  assert.match(csv.text, /Integration Test Customer/)
  assert.match(csv.text, /E\.164|Enquiry ID/i)

  await agent.delete(`/api/enquiries/${enquiry._id}`).expect(200)
  await agent.get(`/api/enquiries/${enquiry._id}`).expect(404)
  assert.equal(await Enquiry.countDocuments(), 0)
})

test('subsidy enquiry stores consumer number, capacity and source without a monthly bill', async () => {
  const basePayload = {
    ...enquiryPayload,
    mobile: '9876505678',
    source: 'PM Surya Ghar Subsidy Page',
    consumerNumber: 'MP-123456789',
    subsidyCapacity: 3,
  }
  delete basePayload.monthlyBill

  await request(app)
    .post('/api/enquiries')
    .send({ ...basePayload, subsidyCapacity: undefined })
    .expect(400)

  const created = await request(app).post('/api/enquiries').send(basePayload).expect(201)
  assert.match(created.body.enquiryId, /^RSS-\d{4}-[A-F0-9]{8}$/)

  const list = await agent
    .get('/api/enquiries')
    .query({ search: 'MP-123456789' })
    .expect(200)
  assert.equal(list.body.pagination.total, 1)

  const enquiry = list.body.enquiries[0]
  assert.equal(enquiry.monthlyBill, null)
  assert.equal(enquiry.consumerNumber, 'MP-123456789')
  assert.equal(enquiry.subsidyCapacity, 3)
  assert.equal(enquiry.source, 'PM Surya Ghar Subsidy Page')

  const detail = await agent.get(`/api/enquiries/${enquiry._id}`).expect(200)
  assert.equal(detail.body.enquiry.consumerNumber, 'MP-123456789')

  const csv = await agent.get('/api/enquiries/export.csv').expect(200)
  assert.match(csv.text, /Consumer Number/)
  assert.match(csv.text, /Subsidy Capacity \(kW\)/)

  await agent.delete(`/api/enquiries/${enquiry._id}`).expect(200)
  assert.equal(await Enquiry.countDocuments(), 0)
})

test('contact settings update and flow into public content', async () => {
  const current = await agent.get('/api/admin/settings/contact').expect(200)
  assert.equal(current.body.contact.email, 'hello@rameshsolar.in')

  await agent
    .put('/api/admin/settings/contact')
    .send({
      phone: '+91 98765 43210',
      phoneRaw: '+919876543210',
      phone2: '+91 98765 43211',
      phone2Raw: '+919876543211',
      whatsapp: '+919876543210',
      email: 'contact@example.in',
      address: '12 Test Road, Indore, Madhya Pradesh',
      hours: 'Mon – Sat · 10:00 AM – 6:00 PM',
      mapsUrl: '',
    })
    .expect(200)

  const content = await request(app).get('/api/content').expect(200)
  assert.equal(content.body.contact.phone, '+91 98765 43210')
  assert.equal(content.body.contact.phone2, '+91 98765 43211')
  assert.equal(content.body.contact.email, 'contact@example.in')
})

test('calculator settings validate and update public assumptions', async () => {
  const current = await agent.get('/api/admin/settings/calculator').expect(200)
  const calculator = current.body.calculator

  await agent
    .put('/api/admin/settings/calculator')
    .send({
      ...calculator,
      systemCostPerKw: 53000,
      performanceRatio: 0.79,
    })
    .expect(200)

  const content = await request(app).get('/api/content').expect(200)
  assert.equal(content.body.calculator.systemCostPerKw, 53000)
  assert.equal(content.body.calculator.performanceRatio, 0.79)

  await agent
    .put('/api/admin/settings/calculator')
    .send({
      ...calculator,
      minCapacity: 5,
      maxCapacity: 2,
    })
    .expect(400)
})

test('service content can be edited without changing its slug', async () => {
  const list = await agent.get('/api/admin/services').expect(200)
  const service = list.body.services[0]

  const updated = await agent
    .put(`/api/admin/services/${service._id}`)
    .send({
      title: 'Residential Solar Updated',
      features: ['Updated feature one', 'Updated feature two'],
      active: true,
    })
    .expect(200)

  assert.equal(updated.body.service.title, 'Residential Solar Updated')
  assert.equal(updated.body.service.slug, service.slug)
  assert.equal(updated.body.service.features.length, 2)

  const content = await request(app).get('/api/content').expect(200)
  assert.equal(content.body.services[0].title, 'Residential Solar Updated')
})

test('password change requires the current password and works for future logins', async () => {
  await agent
    .put('/api/auth/password')
    .send({ currentPassword: 'Incorrect@123', newPassword: 'NewTestPass@123' })
    .expect(400)

  await agent
    .put('/api/auth/password')
    .send({ currentPassword: ADMIN_PASSWORD, newPassword: 'NewTestPass@123' })
    .expect(200)

  await request(app)
    .post('/api/auth/login')
    .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    .expect(401)

  await request(app)
    .post('/api/auth/login')
    .send({ email: ADMIN_EMAIL, password: 'NewTestPass@123' })
    .expect(200)
})
