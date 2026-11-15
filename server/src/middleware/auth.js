import jwt from 'jsonwebtoken'
import { config } from '../config/env.js'
import Admin from '../models/Admin.js'
import asyncHandler from '../utils/asyncHandler.js'

function extractToken(req) {
  const cookieToken = req.cookies?.[config.cookieName]
  if (cookieToken) return cookieToken

  const header = req.headers.authorization || ''
  if (header.startsWith('Bearer ')) return header.slice(7)
  return null
}

export const protect = asyncHandler(async (req, res, next) => {
  const token = extractToken(req)
  if (!token) {
    return res.status(401).json({ message: 'Authentication required. Please sign in.' })
  }

  let decoded
  try {
    decoded = jwt.verify(token, config.jwtSecret)
  } catch {
    return res.status(401).json({ message: 'Your session has expired. Please sign in again.' })
  }

  const admin = await Admin.findById(decoded.sub)
  if (!admin || !admin.active) {
    return res.status(401).json({ message: 'This admin account is not active.' })
  }

  req.admin = admin
  next()
})

export function authorize(...roles) {
  return function roleGuard(req, res, next) {
    if (!req.admin) {
      return res.status(401).json({ message: 'Authentication required.' })
    }
    if (roles.length > 0 && !roles.includes(req.admin.role)) {
      return res.status(403).json({ message: 'You do not have permission for this action.' })
    }
    next()
  }
}
