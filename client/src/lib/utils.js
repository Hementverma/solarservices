export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatCurrency(value, options = {}) {
  if (value === null || value === undefined || value === '') return '—'
  const number = Number(value)
  if (!Number.isFinite(number)) return '—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: options.decimals ?? 0,
    minimumFractionDigits: 0,
  }).format(number)
}

export function formatNumber(value, decimals = 0) {
  const number = Number(value)
  if (!Number.isFinite(number)) return '—'
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  }).format(number)
}

export function formatDateTime(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function digitsOnly(value = '') {
  return String(value).replace(/\D/g, '').slice(-10)
}

export function buildWhatsAppUrl(number, message) {
  const digits = String(number || '').replace(/\D/g, '')
  const normalized = digits.length === 10 ? `91${digits}` : digits
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
}

export function normalizePhoneHref(number) {
  const digits = String(number || '').replace(/\D/g, '')
  if (!digits) return 'tel:'
  return digits.startsWith('91') ? `tel:+${digits}` : `tel:+91${digits}`
}

export function getJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function scrollToId(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
