import { useEffect, useState } from 'react'
import Icon from '@/components/Icon'
import StatusBadge from '@/components/admin/StatusBadge'
import { api } from '@/lib/api'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { ENQUIRY_STATUSES } from '@/data/admin'

const cards = [
  {
    key: 'total',
    label: 'Total enquiries',
    icon: 'Inbox',
    color: 'bg-forest-900 text-solar-400',
    hint: 'All leads received',
  },
  {
    key: 'new',
    label: 'New enquiries',
    icon: 'Sparkles',
    color: 'bg-solar-100 text-solar-800',
    hint: 'Awaiting first contact',
  },
  {
    key: 'converted',
    label: 'Converted customers',
    icon: 'CheckCircle2',
    color: 'bg-emerald-50 text-emerald-700',
    hint: 'Marked as converted',
  },
  {
    key: 'thisMonth',
    label: 'This month',
    icon: 'CalendarDays',
    color: 'bg-sky-50 text-sky-700',
    hint: 'New enquiries this month',
  },
]

export default function OverviewPanel({ onNavigate, refreshKey = 0 }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    api
      .get('/api/admin/stats')
      .then((response) => {
        if (active) setData(response.stats)
      })
      .catch((requestError) => {
        if (active) setError(requestError.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [refreshKey])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-32 animate-pulse rounded-3xl bg-white" />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-3xl bg-white" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        <div className="flex items-center gap-3">
          <Icon name="XCircle" size={20} />
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!data) return null

  const statusMax = Math.max(...Object.values(data.byStatus), 1)
  const cityMax = Math.max(...Object.values(data.byCity), 1)

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.key}
            className="rounded-3xl border border-forest-900/10 bg-white p-5 shadow-[0_16px_50px_-36px_rgba(18,59,42,0.35)]"
          >
            <div className="flex items-start justify-between">
              <span className={`grid h-11 w-11 place-items-center rounded-2xl ${card.color}`}>
                <Icon name={card.icon} size={20} />
              </span>
              <span className="text-[0.6rem] font-bold uppercase tracking-wider text-ink/30">
                {card.hint}
              </span>
            </div>
            <p className="mt-5 font-display text-4xl text-forest-900">{data[card.key]}</p>
            <p className="mt-1 text-xs font-bold text-ink/45">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-forest-900/10 bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-forest-900">Recent enquiries</h2>
              <p className="mt-1 text-xs text-ink/40">The latest leads submitted through the website.</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('enquiries')}
              className="admin-btn border border-forest-900/15 bg-white text-forest-800 hover:bg-forest-50"
            >
              View all
              <Icon name="ArrowRight" size={15} />
            </button>
          </div>

          {data.recent.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-forest-900/15 px-5 py-12 text-center">
              <Icon name="Inbox" size={28} className="mx-auto text-forest-300" />
              <p className="mt-3 text-sm font-bold text-forest-900">No enquiries yet</p>
              <p className="mt-1 text-xs text-ink/40">
                New website enquiries will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="mt-5 divide-y divide-forest-900/8">
              {data.recent.map((enquiry) => (
                <button
                  key={enquiry._id}
                  type="button"
                  onClick={() => onNavigate('enquiries', enquiry._id)}
                  className="flex w-full items-center gap-3 py-3.5 text-left transition hover:opacity-70"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest-50 text-sm font-extrabold text-forest-700">
                    {enquiry.name.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-extrabold text-forest-900">
                        {enquiry.name}
                      </span>
                      <StatusBadge status={enquiry.status} />
                    </span>
                    <span className="mt-0.5 block truncate text-[0.68rem] text-ink/40">
                      {enquiry.city} · {enquiry.requirement} · {formatCurrency(enquiry.monthlyBill)}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-right sm:block">
                    <span className="block text-[0.65rem] font-semibold text-ink/35">
                      {formatDateTime(enquiry.createdAt)}
                    </span>
                    <span className="mt-0.5 block text-[0.6rem] font-bold uppercase tracking-wider text-forest-400">
                      {enquiry.enquiryId}
                    </span>
                  </span>
                  <Icon name="ChevronRight" size={16} className="shrink-0 text-forest-300" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-forest-900/10 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-forest-900">Pipeline</h2>
              <span className="rounded-full bg-forest-50 px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-wider text-forest-600">
                {data.activePipeline} active
              </span>
            </div>
            <div className="mt-5 space-y-3.5">
              {ENQUIRY_STATUSES.map((status) => {
                const count = data.byStatus[status] || 0
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between text-[0.68rem]">
                      <span className="font-semibold text-ink/55">{status}</span>
                      <span className="font-extrabold text-forest-900">{count}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-forest-50">
                      <div
                        className={`h-full rounded-full ${
                          status === 'Converted'
                            ? 'bg-emerald-500'
                            : status === 'Not Interested'
                              ? 'bg-slate-300'
                              : status === 'New'
                                ? 'bg-solar-400'
                                : 'bg-forest-500'
                        }`}
                        style={{ width: `${Math.max(4, (count / statusMax) * 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-mist px-4 py-3">
              <span className="text-[0.68rem] font-semibold text-ink/45">Conversion rate</span>
              <span className="text-sm font-extrabold text-forest-900">{data.conversionRate}%</span>
            </div>
          </div>

          <div className="rounded-3xl border border-forest-900/10 bg-white p-5 sm:p-6">
            <h2 className="text-base font-extrabold text-forest-900">Leads by city</h2>
            <div className="mt-4 space-y-3">
              {Object.entries(data.byCity).map(([city, count]) => (
                <div key={city}>
                  <div className="flex items-center justify-between text-[0.68rem]">
                    <span className="font-semibold text-ink/55">{city}</span>
                    <span className="font-extrabold text-forest-900">{count}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-forest-50">
                    <div
                      className="h-full rounded-full bg-solar-400"
                      style={{ width: `${Math.max(3, (count / cityMax) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: 'Review new leads',
            description: 'Contact new enquiries and keep statuses current.',
            icon: 'PhoneCall',
            action: 'Open enquiries',
            tab: 'enquiries',
          },
          {
            title: 'Update site content',
            description: 'Edit services, locations and contact details.',
            icon: 'FileText',
            action: 'Manage content',
            tab: 'content',
          },
          {
            title: 'Calculator assumptions',
            description: 'Keep estimate assumptions current and documented.',
            icon: 'SlidersHorizontal',
            action: 'Open settings',
            tab: 'calculator',
          },
        ].map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => onNavigate(item.tab)}
            className="group rounded-3xl border border-forest-900/10 bg-white p-5 text-left transition hover:border-forest-900/20 hover:shadow-soft"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-50 text-forest-700 transition group-hover:bg-forest-900 group-hover:text-solar-400">
              <Icon name={item.icon} size={18} />
            </span>
            <h3 className="mt-4 text-sm font-extrabold text-forest-900">{item.title}</h3>
            <p className="mt-1 text-xs leading-5 text-ink/45">{item.description}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-forest-600">
              {item.action}
              <Icon name="ArrowRight" size={13} />
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
