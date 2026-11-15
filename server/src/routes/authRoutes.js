import { Router } from 'express'
import { body } from 'express-validator'
import { changePassword, login, logout, me } from '../controllers/authController.js'
import validateRequest from '../middleware/validateRequest.js'
import { protect } from '../middleware/auth.js'
import { loginLimiter } from '../middleware/rateLimiters.js'

const router = Router()

router.post(
  '/login',
  loginLimiter,
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Enter a valid email address.')
      .normalizeEmail(),
    body('password')
      .isString()
      .isLength({ min: 1, max: 200 })
      .withMessage('Password is required.'),
  ],
  validateRequest,
  login,
)

router.get('/me', protect, me)
router.post('/logout', logout)

router.put(
  '/password',
  protect,
  [
    body('currentPassword').isString().isLength({ min: 1, max: 200 }),
    body('newPassword')
      .isString()
      .isLength({ min: 8, max: 72 })
      .withMessage('New password must be 8 to 72 characters.'),
  ],
  validateRequest,
  changePassword,
)

export default router
