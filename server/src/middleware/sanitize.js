function clean(value) {
  if (!value || typeof value !== 'object') return

  if (Array.isArray(value)) {
    value.forEach(clean)
    return
  }

  Object.keys(value).forEach((key) => {
    if (key.startsWith('$') || key.includes('.')) {
      delete value[key]
      return
    }
    clean(value[key])
  })
}

export default function sanitizeInput(req, _res, next) {
  clean(req.body)
  clean(req.params)
  clean(req.query)
  next()
}
