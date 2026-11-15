import jwt from 'jsonwebtoken'
import { matchedData } from 'express-validator'
import { config } from '../config/env.js'
import Admin from '../models/Admin.js'
import asyncHandler from '../utils/asyncHandler.js'
import { getClearCookieOptions, getCookieOptions } from '../utils/cookieOptions.js'

function signToken(admin) {
  return jwt.sign(
    {
      sub: admin._id.toString(),
      role: admin.role,
      name: admin.name,
    },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn },
  )
}

export const login = asyncHandler(async (req, res) => {
  const { email, password } = matchedData(req)
  const admin = await Admin.findOne({ email: String(email).toLowerCase() }).select('+passwordHash')

  if (!admin || !admin.active) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  const isValid = await admin.comparePassword(password)
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  admin.lastLoginAt = new Date()
  await admin.save({ validateBeforeSave: false })

  const token = signToken(admin)
  res.cookie(config.cookieName, token, getCookieOptions())

  return res.json({
    message: 'Signed in successfully.',
    admin: admin.toSafeJSON(),
  })
})

export const me = asyncHandler(async (req, res) => {
  res.json({ admin: req.admin.toSafeJSON() })
})

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie(config.cookieName, getClearCookieOptions())
  res.json({ message: 'Signed out successfully.' })
})

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = matchedData(req)
  const admin = await Admin.findById(req.admin._id).select('+passwordHash')

  if (!admin) {
    return res.status(404).json({ message: 'Admin account not found.' })
  }

  const isValid = await admin.comparePassword(currentPassword)
  if (!isValid) {
    return res.status(400).json({
      message: 'Your current password is incorrect.',
      errors: [{ field: 'currentPassword', message: 'Current password is incorrect.' }],
    })
  }

  await admin.setPassword(newPassword)
  await admin.save()

  res.json({ message: 'Password updated successfully. Please keep it safe.' })
})
