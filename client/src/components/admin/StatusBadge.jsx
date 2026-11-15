const styles = {
  New: 'bg-solar-100 text-solar-800 ring-solar-500/20',
  Contacted: 'bg-sky-50 text-sky-700 ring-sky-500/20',
  'Site Visit Scheduled': 'bg-violet-50 text-violet-700 ring-violet-500/20',
  'Quotation Sent': 'bg-indigo-50 text-indigo-700 ring-indigo-500/20',
  Converted: 'bg-emerald-50 text-emerald-700 ring-emerald-500/20',
  'Not Interested': 'bg-slate-100 text-slate-600 ring-slate-500/15',
}

export default function StatusBadge({ status, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-extrabold ring-1 ${
        styles[status] || 'bg-slate-100 text-slate-600 ring-slate-500/15'
      } ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  )
}
