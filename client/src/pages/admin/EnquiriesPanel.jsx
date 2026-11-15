import { useCallback, useEffect, useState } from 'react'
import Icon from '@/components/Icon'
import Drawer from '@/components/admin/Drawer'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import StatusBadge from '@/components/admin/StatusBadge'
import { useAuth } from '@/context/AuthContext'
import { api, downloadEnquiriesCsv } from '@/lib/api'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { ADMIN_CITIES, ENQUIRY_STATUSES } from '@/data/admin'

const emptyPagination = { page: 1, pages: 1, total: 0, limit: 12 }

export default function EnquiriesPanel({ initialOpenId, onDataChanged }) {
  const { admin } = useAuth()
  const [filters, setFilters] = useState({ search: '', city: '', status: '' })
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState({ enquiries: [], pagination: emptyPagination })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [exporting, setExporting] = useState(false)
  const [flash, setFlash] = useState('')

  const [selectedId, setSelectedId] = useState(initialOpenId || null)
  const [detail, setDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState('')
  const [statusDraft, setStatusDraft] = useState('')
  const [savingStatus, setSavingStatus] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [actionError, setActionError] = useState('')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(filters.search.trim())
      setPage(1)
    }, 350)
    return () => window.clearTimeout(timer)
  }, [filters.search])

  useEffect(() => {
    setPage(1)
  }, [filters.city, filters.status])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    const params = new URLSearchParams()
    if (debouncedSearch) params.set('search', debouncedSearch)
    if (filters.city) params.set('city', filters.city)
    if (filters.status) params.set('status', filters.status)
    params.set('page', String(page))
    params.set('limit', '12')

    api
      .get(`/api/enquiries?${params.toString()}`)
      .then((response) => {
        if (!active) return
        setData(response)
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
  }, [debouncedSearch, filters.city, filters.status, page, reloadKey])

  useEffect(() => {
    if (!selectedId) {
      setDetail(null)
      return
    }
    let active = true
    setDetailLoading(true)
    setDetailError('')
    setActionError('')
    setNoteText('')
    api
      .get(`/api/enquiries/${selectedId}`)
      .then((response) => {
        if (!active) return
        setDetail(response.enquiry)
        setStatusDraft(response.enquiry.status)
      })
      .catch((requestError) => {
        if (active) setDetailError(requestError.message)
      })
      .finally(() => {
        if (active) setDetailLoading(false)
      })
    return () => {
      active = false
    }
  }, [selectedId])

  const showFlash = useCallback((message) => {
    setFlash(message)
    window.setTimeout(() => setFlash(''), 3500)
  }, [])

  const updateListItem = useCallback((enquiry) => {
    setData((previous) => ({
      ...previous,
      enquiries: previous.enquiries.map((item) =>
        item._id === enquiry._id ? enquiry : item,
      ),
    }))
  }, [])

  const handleStatusUpdate = async () => {
    if (!detail || statusDraft === detail.status) return
    setSavingStatus(true)
    setActionError('')
    try {
      const response = await api.patch(`/api/enquiries/${detail._id}/status`, {
        status: statusDraft,
      })
      setDetail(response.enquiry)
      updateListItem(response.enquiry)
      showFlash('Status updated successfully.')
      onDataChanged?.()
    } catch (requestError) {
      setActionError(requestError.message)
    } finally {
      setSavingStatus(false)
    }
  }

  const handleAddNote = async (event) => {
    event.preventDefault()
    if (!noteText.trim()) return
    setSavingNote(true)
    setActionError('')
    try {
      const response = await api.post(`/api/enquiries/${detail._id}/notes`, {
        text: noteText,
      })
      setDetail((previous) => ({ ...previous, notes: response.notes }))
      setNoteText('')
      showFlash('Internal note added.')
    } catch (requestError) {
      setActionError(requestError.message)
    } finally {
      setSavingNote(false)
    }
  }

  const handleDelete = async () => {
    if (!detail) return
    setDeleting(true)
    try {
      await api.delete(`/api/enquiries/${detail._id}`)
      setDeleteOpen(false)
      setSelectedId(null)
      setReloadKey((value) => value + 1)
      showFlash('Enquiry deleted permanently.')
      onDataChanged?.()
    } catch (requestError) {
      setActionError(requestError.message)
      setDeleteOpen(false)
    } finally {
      setDeleting(false)
    }
  }

  const handleExport = async () => {
    setExporting(true)
    setError('')
    try {
      await downloadEnquiriesCsv({
        search: debouncedSearch,
        city: filters.city,
        status: filters.status,
      })
      showFlash('CSV export downloaded.')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setExporting(false)
    }
  }

  const clearFilters = () => {
    setFilters({ search: '', city: '', status: '' })
    setPage(1)
  }

  const hasFilters = filters.search || filters.city || filters.status
  const selectedEnquiry = detail || data.enquiries.find((item) => item._id === selectedId)

  return (
    <div>
      {flash && (
        <div className="mb-4 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          <Icon name="CheckCircle2" size={17} />
          {flash}
        </div>
      )}

      <div className="rounded-3xl border border-forest-900/10 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative min-w-0 flex-1 xl:max-w-md">
            <Icon
              name="Search"
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/30"
            />
            <input
              type="search"
              value={filters.search}
              onChange={(event) =>
                setFilters((previous) => ({ ...previous, search: event.target.value }))
              }
              placeholder="Search name, mobile or enquiry ID…"
              className="admin-input pl-10"
              aria-label="Search enquiries"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:flex xl:items-center">
            <select
              value={filters.city}
              onChange={(event) =>
                setFilters((previous) => ({ ...previous, city: event.target.value }))
              }
              className="admin-input min-w-[140px]"
              aria-label="Filter by city"
            >
              <option value="">All cities</option>
              {ADMIN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <select
              value={filters.status}
              onChange={(event) =>
                setFilters((previous) => ({ ...previous, status: event.target.value }))
              }
              className="admin-input min-w-[170px]"
              aria-label="Filter by status"
            >
              <option value="">All statuses</option>
              {ENQUIRY_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="admin-btn border border-forest-900/15 bg-white text-forest-700 hover:bg-forest-50"
              >
                <Icon name="X" size={15} />
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="admin-btn bg-forest-900 text-white hover:bg-forest-800"
            >
              {exporting ? (
                <Icon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <Icon name="Download" size={16} />
              )}
              Export CSV
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-ink/40">
          <span>
            {data.pagination.total} enquir{data.pagination.total === 1 ? 'y' : 'ies'} found
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="ShieldCheck" size={13} className="text-forest-500" />
            Customer details are confidential. Access is restricted to authorised staff.
          </span>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <Icon name="XCircle" size={18} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <div className="mt-4 overflow-hidden rounded-3xl border border-forest-900/10 bg-white">
        {loading ? (
          <div className="space-y-3 p-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-16 animate-pulse rounded-2xl bg-mist" />
            ))}
          </div>
        ) : data.enquiries.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest-50 text-forest-300">
              <Icon name="Inbox" size={26} />
            </span>
            <h3 className="mt-4 text-sm font-extrabold text-forest-900">
              {hasFilters ? 'No enquiries match these filters' : 'No enquiries yet'}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-ink/45">
              {hasFilters
                ? 'Try changing the search term, city or status filter.'
                : 'When a customer submits the website enquiry form, the lead will appear here.'}
            </p>
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="admin-btn mt-4 bg-forest-900 text-white">
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[920px] text-left">
                <thead className="border-b border-forest-900/10 bg-mist/60">
                  <tr>
                    {['Customer', 'Contact', 'Requirement', 'Monthly bill', 'Status', 'Submitted', ''].map(
                      (heading) => (
                        <th
                          key={heading}
                          className="px-4 py-3 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-ink/40"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest-900/8">
                  {data.enquiries.map((enquiry) => (
                    <tr
                      key={enquiry._id}
                      className="cursor-pointer transition hover:bg-mist/50"
                      onClick={() => setSelectedId(enquiry._id)}
                    >
                      <td className="px-4 py-4">
                        <p className="text-sm font-extrabold text-forest-900">{enquiry.name}</p>
                        <p className="mt-0.5 text-[0.65rem] font-semibold text-forest-400">
                          {enquiry.enquiryId}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-ink/70">+91 {enquiry.mobile}</p>
                        <p className="mt-0.5 text-[0.65rem] text-ink/40">{enquiry.city}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="max-w-[180px] text-xs font-semibold leading-5 text-ink/65">
                          {enquiry.requirement}
                        </p>
                        <p className="mt-0.5 text-[0.65rem] text-ink/40">{enquiry.propertyType}</p>
                      </td>
                      <td className="px-4 py-4 text-sm font-extrabold text-forest-900">
                        {formatCurrency(enquiry.monthlyBill)}
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={enquiry.status} />
                      </td>
                      <td className="px-4 py-4 text-[0.68rem] font-semibold text-ink/45">
                        {formatDateTime(enquiry.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="inline-grid h-8 w-8 place-items-center rounded-full border border-forest-900/10 text-forest-600">
                          <Icon name="ChevronRight" size={15} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-forest-900/8 lg:hidden">
              {data.enquiries.map((enquiry) => (
                <button
                  key={enquiry._id}
                  type="button"
                  onClick={() => setSelectedId(enquiry._id)}
                  className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-mist/50"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest-50 text-sm font-extrabold text-forest-700">
                    {enquiry.name.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-extrabold text-forest-900">{enquiry.name}</span>
                      <StatusBadge status={enquiry.status} />
                    </span>
                    <span className="mt-0.5 block text-[0.68rem] text-ink/45">
                      +91 {enquiry.mobile} · {enquiry.city}
                    </span>
                    <span className="mt-1 block text-[0.66rem] text-ink/35">
                      {enquiry.requirement} · {formatCurrency(enquiry.monthlyBill)}
                    </span>
                    <span className="mt-1 block text-[0.62rem] font-semibold text-forest-400">
                      {enquiry.enquiryId} · {formatDateTime(enquiry.createdAt)}
                    </span>
                  </span>
                  <Icon name="ChevronRight" size={16} className="mt-1 shrink-0 text-forest-300" />
                </button>
              ))}
            </div>
          </>
        )}

        {data.pagination.total > 0 && (
          <div className="flex flex-col gap-3 border-t border-forest-900/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink/40">
              Page {data.pagination.page} of {data.pagination.pages}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={data.pagination.page <= 1 || loading}
                className="admin-btn border border-forest-900/15 bg-white text-forest-800 disabled:opacity-40"
              >
                <Icon name="ChevronLeft" size={15} />
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPage((value) => Math.min(data.pagination.pages, value + 1))}
                disabled={data.pagination.page >= data.pagination.pages || loading}
                className="admin-btn border border-forest-900/15 bg-white text-forest-800 disabled:opacity-40"
              >
                Next
                <Icon name="ChevronRight" size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      <Drawer
        open={Boolean(selectedId)}
        onClose={() => setSelectedId(null)}
        title="Enquiry details"
        subtitle={selectedEnquiry?.enquiryId || 'Loading enquiry…'}
        width="max-w-2xl"
        footer={
          detail && admin?.role === 'admin' ? (
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.65rem] text-ink/35">Deleting an enquiry cannot be undone.</p>
              <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                className="admin-btn border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
              >
                <Icon name="Trash2" size={15} />
                Delete
              </button>
            </div>
          ) : null
        }
      >
        {detailLoading ? (
          <div className="space-y-4">
            <div className="h-40 animate-pulse rounded-3xl bg-mist" />
            <div className="h-64 animate-pulse rounded-3xl bg-mist" />
          </div>
        ) : detailError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {detailError}
          </div>
        ) : detail ? (
          <div className="space-y-5">
            {actionError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                {actionError}
              </div>
            )}

            <div className="rounded-3xl bg-forest-900 p-5 text-white">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-solar-300">
                    {detail.enquiryId}
                  </p>
                  <h2 className="mt-1 font-display text-3xl text-white">{detail.name}</h2>
                  <p className="mt-1 text-xs text-white/50">
                    Submitted {formatDateTime(detail.createdAt)} · Source: {detail.source}
                  </p>
                </div>
                <StatusBadge status={detail.status} className="bg-white/10 text-white ring-white/20" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={`tel:+91${detail.mobile}`}
                  className="inline-flex items-center gap-2 rounded-full bg-solar-400 px-4 py-2 text-xs font-extrabold text-forest-950"
                >
                  <Icon name="Phone" size={14} />
                  +91 {detail.mobile}
                </a>
                <a
                  href={`https://wa.me/91${detail.mobile}?text=${encodeURIComponent(
                    `Hello ${detail.name}, this is Ramesh Solar Services regarding your enquiry ${detail.enquiryId}.`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white"
                >
                  <Icon name="MessageCircle" size={14} className="text-solar-300" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-forest-900/10 p-5">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/40">
                Update status
              </h3>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <select
                  value={statusDraft}
                  onChange={(event) => setStatusDraft(event.target.value)}
                  className="admin-input flex-1"
                >
                  {ENQUIRY_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleStatusUpdate}
                  disabled={savingStatus || statusDraft === detail.status}
                  className="admin-btn bg-forest-900 text-white hover:bg-forest-800"
                >
                  {savingStatus ? (
                    <Icon name="Loader2" size={16} className="animate-spin" />
                  ) : (
                    <Icon name="Save" size={16} />
                  )}
                  Save status
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-forest-900/10 p-5">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/40">
                Customer details
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Full name', value: detail.name },
                  { label: 'Mobile number', value: `+91 ${detail.mobile}` },
                  { label: 'City', value: detail.city },
                  { label: 'Property type', value: detail.propertyType },
                  { label: 'Monthly bill', value: formatCurrency(detail.monthlyBill) },
                  { label: 'Solar requirement', value: detail.requirement },
                  ...(detail.consumerNumber
                    ? [{ label: 'Consumer number', value: detail.consumerNumber }]
                    : []),
                  ...(detail.subsidyCapacity
                    ? [{ label: 'Subsidy capacity', value: `${detail.subsidyCapacity} kW` }]
                    : []),
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.13em] text-ink/35">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-forest-900">{item.value}</p>
                  </div>
                ))}
              </div>
              {detail.message && (
                <div className="mt-4 rounded-2xl bg-mist p-4">
                  <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.13em] text-ink/35">
                    Customer message
                  </p>
                  <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6 text-ink/65">
                    {detail.message}
                  </p>
                </div>
              )}
              <p className="mt-4 flex items-center gap-2 text-[0.65rem] text-ink/35">
                <Icon name="ShieldCheck" size={13} className="text-forest-500" />
                Consent recorded at {formatDateTime(detail.consentAt || detail.createdAt)}
              </p>
            </div>

            <div className="rounded-3xl border border-forest-900/10 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/40">
                  Internal notes
                </h3>
                <span className="rounded-full bg-mist px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-ink/35">
                  {detail.notes?.length || 0}
                </span>
              </div>
              <p className="mt-1 text-[0.65rem] text-ink/35">
                Only visible to authorised admin staff.
              </p>

              {detail.notes?.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {[...detail.notes].reverse().map((note) => (
                    <div key={note._id || note.createdAt} className="rounded-2xl bg-mist p-4">
                      <p className="whitespace-pre-wrap text-sm leading-6 text-ink/65">{note.text}</p>
                      <p className="mt-2 text-[0.6rem] font-semibold text-ink/35">
                        {note.addedByName || 'Admin'} · {formatDateTime(note.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 rounded-2xl border border-dashed border-forest-900/15 px-4 py-6 text-center text-xs text-ink/35">
                  No internal notes yet.
                </p>
              )}

              <form onSubmit={handleAddNote} className="mt-4">
                <label htmlFor="new-note" className="admin-label">
                  Add a note
                </label>
                <textarea
                  id="new-note"
                  value={noteText}
                  onChange={(event) => setNoteText(event.target.value)}
                  maxLength={1000}
                  placeholder="Call summary, site visit update, follow-up date…"
                  className="admin-input min-h-24 resize-y"
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[0.62rem] text-ink/35">{noteText.length}/1000</span>
                  <button
                    type="submit"
                    disabled={savingNote || !noteText.trim()}
                    className="admin-btn bg-forest-900 text-white hover:bg-forest-800"
                  >
                    {savingNote ? (
                      <Icon name="Loader2" size={15} className="animate-spin" />
                    ) : (
                      <Icon name="NotebookPen" size={15} />
                    )}
                    Add note
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </Drawer>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete this enquiry?"
        description={
          detail
            ? `This will permanently delete the enquiry from ${detail.name} (${detail.enquiryId}) and all internal notes. This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete enquiry"
        loading={deleting}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
