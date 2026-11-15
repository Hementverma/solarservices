import { useEffect, useState } from 'react'
import Icon from '@/components/Icon'
import { api } from '@/lib/api'
import { formatDateTime } from '@/lib/utils'

const emptyForm = {
  phone: '',
  phoneRaw: '',
  phone2: '',
  phone2Raw: '',
  whatsapp: '',
  email: '',
  address: '',
  hours: '',
  mapsUrl: '',
}

const fields = [
  {
    name: 'phone',
    label: 'Display phone number',
    placeholder: '+91 98765 43210',
    hint: 'Shown on the website and used for call buttons.',
    maxLength: 24,
  },
  {
    name: 'phoneRaw',
    label: 'Call link number',
    placeholder: '+919876543210',
    hint: 'International format used in tel: links, e.g. +919876543210.',
    maxLength: 24,
  },
  {
    name: 'phone2',
    label: 'Alternate phone number (optional)',
    placeholder: '+91 98765 43210',
    hint: 'A second number shown on contact and subsidy pages.',
    maxLength: 24,
    optional: true,
  },
  {
    name: 'phone2Raw',
    label: 'Alternate call link number (optional)',
    placeholder: '+919876543210',
    hint: 'International format used for the alternate tel: link.',
    maxLength: 24,
    optional: true,
  },
  {
    name: 'whatsapp',
    label: 'WhatsApp number',
    placeholder: '+919876543210',
    hint: 'International format used for WhatsApp links.',
    maxLength: 24,
  },
  {
    name: 'email',
    label: 'Email address',
    placeholder: 'hello@yourdomain.in',
    hint: 'Where customer email enquiries should reach you.',
    maxLength: 160,
    type: 'email',
  },
  {
    name: 'hours',
    label: 'Business hours',
    placeholder: 'Mon – Sat · 9:00 AM – 7:00 PM',
    hint: 'Displayed in the website footer and contact page.',
    maxLength: 100,
  },
  {
    name: 'mapsUrl',
    label: 'Google Maps URL (optional)',
    placeholder: 'https://maps.google.com/…',
    hint: 'Full URL to your business location on Google Maps.',
    maxLength: 500,
    type: 'url',
  },
]

export default function ContactSettingsPanel() {
  const [form, setForm] = useState(emptyForm)
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saveError, setSaveError] = useState('')
  const [saving, setSaving] = useState(false)
  const [flash, setFlash] = useState('')

  useEffect(() => {
    let active = true
    api
      .get('/api/admin/settings/contact')
      .then((response) => {
        if (!active) return
        const contact = response.contact || {}
        setForm({
          phone: contact.phone || '',
          phoneRaw: contact.phoneRaw || '',
          phone2: contact.phone2 || '',
          phone2Raw: contact.phone2Raw || '',
          whatsapp: contact.whatsapp || '',
          email: contact.email || '',
          address: contact.address || '',
          hours: contact.hours || '',
          mapsUrl: contact.mapsUrl || '',
        })
        setMeta(contact)
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
  }, [])

  const update = (name, value) => setForm((previous) => ({ ...previous, [name]: value }))

  const isPlaceholder = /90000\s*00000|9000000000/.test(form.phone)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setSaveError('')
    setFlash('')
    try {
      const response = await api.put('/api/admin/settings/contact', {
        ...form,
        phone: form.phone.trim(),
        phoneRaw: form.phoneRaw.trim(),
        phone2: form.phone2.trim(),
        phone2Raw: form.phone2Raw.trim(),
        whatsapp: form.whatsapp.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        hours: form.hours.trim(),
        mapsUrl: form.mapsUrl.trim(),
      })
      setMeta(response.contact)
      setFlash(response.message)
      window.setTimeout(() => setFlash(''), 3500)
    } catch (requestError) {
      setSaveError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="h-[520px] animate-pulse rounded-3xl bg-white" />
        <div className="h-72 animate-pulse rounded-3xl bg-white" />
      </div>
    )
  }

  return (
    <div>
      {error && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <Icon name="XCircle" size={18} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {flash && (
        <div className="mb-4 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          <Icon name="CheckCircle2" size={17} />
          {flash}
        </div>
      )}

      {isPlaceholder && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <Icon name="ShieldCheck" size={18} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-extrabold">Placeholder phone number detected</p>
            <p className="mt-0.5 text-xs leading-5 text-amber-700">
              Replace the sample phone number with the real business number before launching the
              website. This value appears across call, WhatsApp and email actions.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-forest-900/10 bg-white p-5 sm:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-forest-900">Contact details</h2>
              <p className="mt-1 text-xs leading-5 text-ink/40">
                Used by the header, footer, floating actions, contact page and WhatsApp buttons.
              </p>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-forest-50 text-forest-700">
              <Icon name="PhoneCall" size={18} />
            </span>
          </div>

          {saveError && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
              {saveError}
            </div>
          )}

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.name} className={field.name === 'mapsUrl' ? 'sm:col-span-2' : ''}>
                <label htmlFor={`contact-${field.name}`} className="admin-label">
                  {field.label}
                </label>
                <input
                  id={`contact-${field.name}`}
                  type={field.type || 'text'}
                  value={form[field.name]}
                  maxLength={field.maxLength}
                  placeholder={field.placeholder}
                  onChange={(event) => update(field.name, event.target.value)}
                  className="admin-input"
                  required={!field.optional && field.name !== 'mapsUrl'}
                />
                <p className="mt-1 text-[0.62rem] leading-4 text-ink/35">{field.hint}</p>
              </div>
            ))}
            <div className="sm:col-span-2">
              <label htmlFor="contact-address" className="admin-label">
                Business address
              </label>
              <textarea
                id="contact-address"
                value={form.address}
                maxLength={200}
                placeholder="Street, area, city, state, PIN code"
                onChange={(event) => update('address', event.target.value)}
                className="admin-input min-h-24"
                required
              />
              <p className="mt-1 text-[0.62rem] leading-4 text-ink/35">
                Use the complete address you want displayed publicly. {form.address.length}/200
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-forest-900/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.65rem] leading-4 text-ink/35">
              {meta?.updatedAt
                ? `Last updated ${formatDateTime(meta.updatedAt)}`
                : 'These details have not been saved from the dashboard yet.'}
            </p>
            <button
              type="submit"
              disabled={saving}
              className="admin-btn bg-forest-900 text-white hover:bg-forest-800"
            >
              {saving ? (
                <Icon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <Icon name="Save" size={16} />
              )}
              Save contact details
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="rounded-3xl border border-forest-900/10 bg-white p-5">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.13em] text-ink/40">
              Live preview
            </h3>
            <div className="mt-4 space-y-3">
              <a
                href={`tel:${form.phoneRaw.replace(/\s/g, '')}`}
                className="flex items-start gap-3 rounded-2xl bg-mist p-3.5 transition hover:bg-forest-50"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-forest-700">
                  <Icon name="Phone" size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.6rem] font-extrabold uppercase tracking-wider text-ink/35">
                    Call
                  </span>
                  <span className="mt-0.5 block truncate text-sm font-bold text-forest-900">
                    {form.phone || 'Not set'}
                  </span>
                </span>
              </a>
              {form.phone2 && (
                <a
                  href={`tel:${(form.phone2Raw || form.phone2).replace(/\s/g, '')}`}
                  className="flex items-start gap-3 rounded-2xl bg-mist p-3.5 transition hover:bg-forest-50"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-forest-700">
                    <Icon name="PhoneCall" size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.6rem] font-extrabold uppercase tracking-wider text-ink/35">
                      Alternate call
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-bold text-forest-900">
                      {form.phone2}
                    </span>
                  </span>
                </a>
              )}
              <a
                href={`https://wa.me/${form.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 rounded-2xl bg-mist p-3.5 transition hover:bg-forest-50"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-emerald-600">
                  <Icon name="MessageCircle" size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.6rem] font-extrabold uppercase tracking-wider text-ink/35">
                    WhatsApp
                  </span>
                  <span className="mt-0.5 block truncate text-sm font-bold text-forest-900">
                    {form.whatsapp || 'Not set'}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${form.email}`}
                className="flex items-start gap-3 rounded-2xl bg-mist p-3.5 transition hover:bg-forest-50"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-forest-700">
                  <Icon name="Mail" size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.6rem] font-extrabold uppercase tracking-wider text-ink/35">
                    Email
                  </span>
                  <span className="mt-0.5 block truncate text-sm font-bold text-forest-900">
                    {form.email || 'Not set'}
                  </span>
                </span>
              </a>
              <div className="flex items-start gap-3 rounded-2xl bg-mist p-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-forest-700">
                  <Icon name="MapPin" size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.6rem] font-extrabold uppercase tracking-wider text-ink/35">
                    Address
                  </span>
                  <span className="mt-0.5 block text-xs font-semibold leading-5 text-forest-900">
                    {form.address || 'Not set'}
                  </span>
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-mist p-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-forest-700">
                  <Icon name="Clock" size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.6rem] font-extrabold uppercase tracking-wider text-ink/35">
                    Hours
                  </span>
                  <span className="mt-0.5 block text-xs font-semibold leading-5 text-forest-900">
                    {form.hours || 'Not set'}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-forest-900/10 bg-forest-900 p-5 text-white">
            <Icon name="ShieldCheck" size={20} className="text-solar-400" />
            <h3 className="mt-3 text-sm font-extrabold">Before you launch</h3>
            <ul className="mt-2 space-y-1.5 text-[0.68rem] leading-5 text-white/50">
              <li>Use a number that is actively answered during business hours.</li>
              <li>Confirm the WhatsApp number is registered and reachable.</li>
              <li>Test the call and email links on a mobile device.</li>
              <li>Keep business hours accurate, including holiday notices.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
