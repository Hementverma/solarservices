import crypto from 'node:crypto'

export function generateEnquiryId() {
  const now = new Date()
  const year = String(now.getFullYear()).slice(-2)
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const random = crypto.randomBytes(4).toString('hex').toUpperCase()
  return `RSS-${year}${month}-${random}`
}
