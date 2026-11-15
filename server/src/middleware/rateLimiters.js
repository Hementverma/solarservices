import rateLimit from 'express-rate-limit'

const standardOptions = {
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
}

export const publicApiLimiter = rateLimit({
  ...standardOptions,
  windowMs: 15 * 60 * 1000,
  limit: 400,
  message: {
    message: 'Too many requests. Please wait a few minutes and try again.',
  },
})

export const enquiryLimiter = rateLimit({
  ...standardOptions,
  windowMs: 15 * 60 * 1000,
  limit: 6,
  message: {
    message: 'Too many enquiries from this connection. Please try again later.',
  },
})

export const loginLimiter = rateLimit({
  ...standardOptions,
  windowMs: 15 * 60 * 1000,
  limit: 12,
  skipSuccessfulRequests: true,
  message: {
    message: 'Too many login attempts. Please wait 15 minutes and try again.',
  },
})
