import mongoose from 'mongoose'

export function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` })
}

export default function errorHandler(error, req, res, _next) {
  let status = error.statusCode || 500
  let message = error.message || 'Internal server error.'
  let errors

  if (error instanceof mongoose.Error.ValidationError) {
    status = 400
    message = 'Some fields are invalid.'
    errors = Object.values(error.errors).map((item) => ({
      field: item.path,
      message: item.message,
    }))
  }

  if (error instanceof mongoose.Error.CastError) {
    status = 400
    message = 'Invalid identifier supplied.'
  }

  if (error.code === 11000) {
    status = 409
    const field = Object.keys(error.keyPattern || error.keyValue || {})[0]
    message =
      field === 'enquiryId'
        ? 'We could not generate a unique enquiry ID. Please try again.'
        : `A record with this ${field || 'value'} already exists.`
  }

  if (status >= 500 && process.env.NODE_ENV !== 'test') {
    console.error('[error]', {
      message: error.message,
      method: req.method,
      path: req.originalUrl,
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
    })
  }

  res.status(status).json({
    message: status >= 500 && process.env.NODE_ENV === 'production'
      ? 'Something went wrong. Please try again later.'
      : message,
    ...(errors ? { errors } : {}),
  })
}
