function escapeValue(value) {
  if (value === null || value === undefined) return ''
  const string = String(value)
  if (/[",\n\r]/.test(string)) {
    return `"${string.replace(/"/g, '""')}"`
  }
  return string
}

const columns = [
  ['Enquiry ID', (row) => row.enquiryId],
  ['Name', (row) => row.name],
  ['Mobile', (row) => row.mobile],
  ['City', (row) => row.city],
  ['Property Type', (row) => row.propertyType],
  ['Monthly Bill (INR)', (row) => row.monthlyBill],
  ['Consumer Number', (row) => row.consumerNumber],
  ['Subsidy Capacity (kW)', (row) => row.subsidyCapacity],
  ['Requirement', (row) => row.requirement],
  ['Status', (row) => row.status],
  ['Source', (row) => row.source],
  ['Message', (row) => row.message],
  ['Internal Notes', (row) => (row.notes || []).map((note) => note.text).join(' | ')],
  ['Submitted At', (row) => new Date(row.createdAt).toISOString()],
  ['Updated At', (row) => new Date(row.updatedAt).toISOString()],
]

export function enquiriesToCsv(enquiries) {
  const header = columns.map(([label]) => escapeValue(label)).join(',')
  const rows = enquiries.map((row) =>
    columns.map(([, resolver]) => escapeValue(resolver(row))).join(','),
  )
  return `\uFEFF${[header, ...rows].join('\r\n')}`
}
