import { Router } from 'express'
import { body, param } from 'express-validator'
import { authorize, protect } from '../middleware/auth.js'
import validateRequest from '../middleware/validateRequest.js'
import { getStats } from '../controllers/enquiryController.js'
import {
  adminListLocations,
  adminListServices,
  getCalculatorSettings,
  getContactSettings,
  updateCalculatorSettings,
  updateContactSettings,
  updateLocation,
  updateService,
} from '../controllers/adminContentController.js'
import { PROPERTY_TYPES, SERVICE_CITIES } from '../data/constants.js'

const router = Router()

router.use(protect)
router.get('/stats', getStats)

router.get('/settings/contact', authorize('admin'), getContactSettings)
router.put(
  '/settings/contact',
  authorize('admin'),
  [
    body('phone')
      .trim()
      .isLength({ min: 6, max: 24 })
      .withMessage('Enter a valid phone number.'),
    body('phoneRaw').optional({ values: 'falsy' }).trim().isLength({ max: 24 }),
    body('phone2').optional({ values: 'falsy' }).trim().isLength({ max: 24 }),
    body('phone2Raw').optional({ values: 'falsy' }).trim().isLength({ max: 24 }),
    body('whatsapp').optional({ values: 'falsy' }).trim().isLength({ max: 24 }),
    body('email').trim().isEmail().withMessage('Enter a valid email address.').normalizeEmail(),
    body('address')
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Address must be 5 to 200 characters.'),
    body('hours')
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('Business hours are required.'),
    body('mapsUrl')
      .optional({ values: 'falsy' })
      .trim()
      .isURL({ require_protocol: true })
      .withMessage('Map URL must be a full URL.'),
  ],
  validateRequest,
  updateContactSettings,
)

router.get('/settings/calculator', authorize('admin'), getCalculatorSettings)
router.put(
  '/settings/calculator',
  authorize('admin'),
  [
    body('tariffDefaults').custom((value) => {
      if (!value || typeof value !== 'object') throw new Error('Tariff defaults are required.')
      PROPERTY_TYPES.forEach((type) => {
        const amount = Number(value[type])
        if (!Number.isFinite(amount) || amount < 0 || amount > 50) {
          throw new Error(`Enter a valid tariff for ${type} (0–50).`)
        }
      })
      return true
    }),
    body('peakSunHoursByCity').custom((value) => {
      if (!value || typeof value !== 'object') throw new Error('Sun hours are required.')
      SERVICE_CITIES.forEach((city) => {
        const hours = Number(value[city])
        if (!Number.isFinite(hours) || hours < 1 || hours > 10) {
          throw new Error(`Enter valid peak sun hours for ${city} (1–10).`)
        }
      })
      return true
    }),
    body('performanceRatio')
      .isFloat({ min: 0.4, max: 1 })
      .withMessage('Performance ratio must be between 0.4 and 1.')
      .toFloat(),
    body('systemCostPerKw')
      .isFloat({ min: 10000, max: 200000 })
      .withMessage('Cost per kW must be between ₹10,000 and ₹2,00,000.')
      .toFloat(),
    body('co2PerKwh')
      .isFloat({ min: 0, max: 2 })
      .withMessage('CO₂ factor must be between 0 and 2.')
      .toFloat(),
    body('minCapacity')
      .isFloat({ min: 0.5, max: 100 })
      .withMessage('Minimum capacity must be between 0.5 and 100 kW.')
      .toFloat(),
    body('maxCapacity')
      .isFloat({ min: 100, max: 100000 })
      .withMessage('Maximum capacity must be between 100 and 1,00,000 kW.')
      .toFloat()
      .custom((value, { req }) => {
        if (Number(value) <= Number(req.body.minCapacity)) {
          throw new Error('Maximum capacity must be greater than minimum capacity.')
        }
        return true
      }),
  ],
  validateRequest,
  updateCalculatorSettings,
)

router.get('/services', authorize('admin'), adminListServices)
router.put(
  '/services/:id',
  authorize('admin'),
  [
    param('id').isMongoId(),
    body('title').optional().trim().isLength({ min: 2, max: 80 }),
    body('shortDescription').optional().trim().isLength({ min: 10, max: 240 }),
    body('description').optional().trim().isLength({ min: 10, max: 800 }),
    body('image').optional().trim().isLength({ max: 300 }),
    body('icon').optional().trim().isLength({ max: 40 }),
    body('bestFor').optional().trim().isLength({ max: 160 }),
    body('features').optional().isArray({ max: 10 }),
    body('active').optional().isBoolean().toBoolean(),
    body('order').optional().isInt({ min: 0, max: 1000 }).toInt(),
  ],
  validateRequest,
  updateService,
)

router.get('/locations', authorize('admin'), adminListLocations)
router.put(
  '/locations/:id',
  authorize('admin'),
  [
    param('id').isMongoId(),
    body('name').optional().trim().isLength({ min: 2, max: 80 }),
    body('title').optional().trim().isLength({ min: 5, max: 160 }),
    body('metaTitle').optional().trim().isLength({ max: 200 }),
    body('metaDescription').optional().trim().isLength({ max: 320 }),
    body('intro').optional().trim().isLength({ max: 240 }),
    body('description').optional().trim().isLength({ min: 10, max: 1500 }),
    body('image').optional().trim().isLength({ max: 300 }),
    body('highlights').optional().isArray({ max: 10 }),
    body('areas').optional().isArray({ max: 15 }),
    body('active').optional().isBoolean().toBoolean(),
    body('order').optional().isInt({ min: 0, max: 1000 }).toInt(),
  ],
  validateRequest,
  updateLocation,
)

export default router
