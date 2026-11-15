import { Router } from 'express'
import { body, param, query } from 'express-validator'
import {
  addEnquiryNote,
  createEnquiry,
  deleteEnquiry,
  exportEnquiries,
  getEnquiry,
  listEnquiries,
  updateEnquiryStatus,
} from '../controllers/enquiryController.js'
import validateRequest from '../middleware/validateRequest.js'
import { authorize, protect } from '../middleware/auth.js'
import { enquiryLimiter } from '../middleware/rateLimiters.js'
import {
  ENQUIRY_STATUSES,
  PROPERTY_TYPES,
  REQUIREMENTS,
  SERVICE_CITIES,
  SUBSIDY_ENQUIRY_SOURCE,
} from '../data/constants.js'

const router = Router()

router.post(
  '/',
  enquiryLimiter,
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 80 })
      .withMessage('Please enter your full name.'),
    body('mobile')
      .trim()
      .matches(/^[6-9]\d{9}$/)
      .withMessage('Enter a valid 10-digit Indian mobile number.'),
    body('city').isIn(SERVICE_CITIES).withMessage('Please select a valid city.'),
    body('propertyType')
      .isIn(PROPERTY_TYPES)
      .withMessage('Please select a valid property type.'),
    body('monthlyBill')
      .optional({ values: 'falsy' })
      .isFloat({ min: 0, max: 10000000 })
      .withMessage('Enter a valid monthly electricity bill.')
      .toFloat(),
    body('consumerNumber')
      .optional({ values: 'falsy' })
      .trim()
      .isLength({ max: 30 })
      .withMessage('Consumer number cannot exceed 30 characters.'),
    body('subsidyCapacity')
      .custom((value, { req }) => {
        if (
          String(req.body.source || '').trim() === SUBSIDY_ENQUIRY_SOURCE &&
          (value === undefined || value === null || value === '')
        ) {
          throw new Error('Please select your required solar capacity.')
        }
        if (value !== undefined && value !== null && value !== '') {
          const capacity = Number(value)
          if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1000) {
            throw new Error('Select a valid solar capacity.')
          }
        }
        return true
      })
      .customSanitizer((value) =>
        value === undefined || value === null || value === '' ? undefined : Number(value),
      ),
    body('requirement')
      .isIn(REQUIREMENTS)
      .withMessage('Please select a valid solar requirement.'),
    body('message')
      .optional({ values: 'falsy' })
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Message cannot exceed 1000 characters.'),
    body('consent')
      .toBoolean()
      .custom((value) => value === true)
      .withMessage('Please accept the privacy policy.'),
    body('source')
      .optional()
      .trim()
      .isLength({ max: 60 })
      .withMessage('Invalid enquiry source.'),
  ],
  validateRequest,
  createEnquiry,
)

router.get('/export.csv', protect, exportEnquiries)

router.get(
  '/',
  protect,
  [
    query('status').optional().isIn(ENQUIRY_STATUSES),
    query('city').optional().isIn(SERVICE_CITIES),
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  ],
  validateRequest,
  listEnquiries,
)

router.get(
  '/:id',
  protect,
  [param('id').isString().isLength({ min: 1, max: 80 })],
  validateRequest,
  getEnquiry,
)

router.patch(
  '/:id/status',
  protect,
  [
    param('id').isMongoId().withMessage('Invalid enquiry identifier.'),
    body('status').isIn(ENQUIRY_STATUSES).withMessage('Select a valid status.'),
  ],
  validateRequest,
  updateEnquiryStatus,
)

router.post(
  '/:id/notes',
  protect,
  [
    param('id').isMongoId().withMessage('Invalid enquiry identifier.'),
    body('text')
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage('Note must be between 1 and 1000 characters.'),
  ],
  validateRequest,
  addEnquiryNote,
)

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  [param('id').isMongoId().withMessage('Invalid enquiry identifier.')],
  validateRequest,
  deleteEnquiry,
)

export default router
