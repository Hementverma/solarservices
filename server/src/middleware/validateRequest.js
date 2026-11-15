import { validationResult } from 'express-validator'

export default function validateRequest(req, res, next) {
  const result = validationResult(req)
  if (result.isEmpty()) return next()

  return res.status(400).json({
    message: 'Please correct the highlighted fields and try again.',
    errors: result.array().map((error) => ({
      field: error.path,
      message: error.msg,
    })),
  })
}
