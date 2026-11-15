import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@/components/Icon'
import { useContent } from '@/context/ContentContext'
import { api } from '@/lib/api'
import { buildWhatsAppUrl, digitsOnly } from '@/lib/utils'
import {
  propertyTypes,
  requirements,
  serviceCities,
} from '@/data/site'

const initialForm = {
  name: '',
  mobile: '',
  city: 'Indore',
  propertyType: 'Home',
  monthlyBill: '',
  requirement: 'Residential Solar',
  message: '',
  consent: false,
  website: '',
}

function validate(values) {
  const errors = {}
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Please enter your full name.'
  }
  if (!/^[6-9]\d{9}$/.test(values.mobile)) {
    errors.mobile = 'Enter a valid 10-digit Indian mobile number.'
  }
  if (!serviceCities.includes(values.city)) {
    errors.city = 'Please select your city.'
  }
  if (!propertyTypes.includes(values.propertyType)) {
    errors.propertyType = 'Please select your property type.'
  }
  const bill = Number(values.monthlyBill)
  if (!values.monthlyBill || !Number.isFinite(bill) || bill < 0 || bill > 10000000) {
    errors.monthlyBill = 'Enter your approximate monthly electricity bill.'
  }
  if (!requirements.includes(values.requirement)) {
    errors.requirement = 'Please select your solar requirement.'
  }
  if (!values.consent) {
    errors.consent = 'Please accept the privacy policy to continue.'
  }
  return errors
}

export default function EnquiryForm({
  variant = 'full',
  source = 'website',
  defaultCity,
  defaultRequirement,
  defaultPropertyType,
  defaultBill,
  initialMessage,
  title = 'Get your free solar consultation',
  subtitle = 'Share a few details and our solar advisor will call you to understand your requirement.',
  className = '',
  compact = false,
}) {
  const uid = useId()
  const { contact } = useContent()
  const initialValues = {
    ...initialForm,
    city: defaultCity || initialForm.city,
    requirement: defaultRequirement || initialForm.requirement,
    propertyType: defaultPropertyType || initialForm.propertyType,
    monthlyBill: defaultBill ? String(defaultBill) : initialForm.monthlyBill,
    message: initialMessage || initialForm.message,
  }
  const [form, setForm] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const [result, setResult] = useState(null)

  const fieldId = (name) => `${uid}-${name}`
  const update = (name, value) => {
    setForm((previous) => ({ ...previous, [name]: value }))
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: undefined }))
    if (serverError) setServerError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setServerError('')
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const first = document.getElementById(fieldId(Object.keys(nextErrors)[0]))
      first?.focus()
      return
    }

    setStatus('submitting')
    try {
      const data = await api.post('/api/enquiries', {
        name: form.name.trim(),
        mobile: form.mobile,
        city: form.city,
        propertyType: form.propertyType,
        monthlyBill: Number(form.monthlyBill),
        requirement: form.requirement,
        message: form.message.trim(),
        consent: form.consent,
        website: form.website,
        source,
      })
      setResult(data)
      setStatus('success')
      setForm(initialValues)
    } catch (error) {
      setStatus('idle')
      if (error.details && Array.isArray(error.details)) {
        const next = {}
        error.details.forEach((detail) => {
          if (detail.field) next[detail.field] = detail.message
        })
        setErrors(next)
      }
      setServerError(error.message)
    }
  }

  if (status === 'success' && result) {
    const waUrl = buildWhatsAppUrl(
      contact.whatsapp || contact.phoneRaw,
      `Hello Ramesh Solar Services, I have submitted an enquiry. My reference ID is ${result.enquiryId}.`,
    )
    return (
      <div className={`card overflow-hidden p-7 text-center sm:p-9 ${className}`}>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-50 text-forest-700 ring-8 ring-forest-50/50">
          <Icon name="CheckCircle2" size={32} />
        </div>
        <h3 className="mt-6 font-display text-3xl text-forest-900">Enquiry received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/60">
          Thank you, {result.name || 'there'}. Our team will contact you shortly to understand your
          requirement. Your enquiry is saved securely.
        </p>
        <div className="mx-auto mt-6 max-w-xs rounded-2xl border border-dashed border-forest-900/20 bg-forest-50/60 px-5 py-4">
          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-ink/45">
            Your enquiry ID
          </p>
          <p className="mt-1 text-lg font-extrabold tracking-wide text-forest-900">
            {result.enquiryId}
          </p>
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={waUrl} target="_blank" rel="noreferrer" className="btn-primary">
            <Icon name="MessageCircle" size={18} />
            Continue on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setResult(null)
              setStatus('idle')
            }}
            className="btn-secondary"
          >
            Submit another enquiry
          </button>
        </div>
        <p className="mt-5 text-xs leading-5 text-ink/45">
          Keep your enquiry ID handy for future communication. We never sell your personal data.
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {(title || subtitle) && !compact && (
        <div className="mb-6">
          {title && (
            <h3 className="font-display text-3xl leading-tight text-forest-900 sm:text-[2.15rem]">
              {title}
            </h3>
          )}
          {subtitle && <p className="mt-2 text-sm leading-6 text-ink/55">{subtitle}</p>}
        </div>
      )}
      {compact && title && (
        <div className="mb-5">
          <h3 className="font-display text-[1.75rem] leading-tight text-forest-900">{title}</h3>
          {subtitle && <p className="mt-1.5 text-xs leading-5 text-ink/55">{subtitle}</p>}
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <Icon name="XCircle" size={18} className="mt-0.5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor={fieldId('website')}>Website</label>
          <input
            id={fieldId('website')}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => update('website', event.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="field-label" htmlFor={fieldId('name')}>
              Full name
            </label>
            <input
              id={fieldId('name')}
              className="field-input"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? fieldId('name-error') : undefined}
            />
            {errors.name && (
              <p id={fieldId('name-error')} className="field-error">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="field-label" htmlFor={fieldId('mobile')}>
              Mobile number
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-ink/40">
                +91
              </span>
              <input
                id={fieldId('mobile')}
                className="field-input pl-12"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                placeholder="10-digit mobile"
                value={form.mobile}
                onChange={(event) => update('mobile', digitsOnly(event.target.value))}
                aria-invalid={Boolean(errors.mobile)}
                aria-describedby={errors.mobile ? fieldId('mobile-error') : undefined}
              />
            </div>
            {errors.mobile && (
              <p id={fieldId('mobile-error')} className="field-error">
                {errors.mobile}
              </p>
            )}
          </div>

          <div>
            <label className="field-label" htmlFor={fieldId('city')}>
              City
            </label>
            <select
              id={fieldId('city')}
              className="field-select"
              value={form.city}
              onChange={(event) => update('city', event.target.value)}
              aria-invalid={Boolean(errors.city)}
            >
              {serviceCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="field-error">{errors.city}</p>}
          </div>

          <div>
            <label className="field-label" htmlFor={fieldId('propertyType')}>
              Property type
            </label>
            <select
              id={fieldId('propertyType')}
              className="field-select"
              value={form.propertyType}
              onChange={(event) => update('propertyType', event.target.value)}
              aria-invalid={Boolean(errors.propertyType)}
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.propertyType && <p className="field-error">{errors.propertyType}</p>}
          </div>

          <div>
            <label className="field-label" htmlFor={fieldId('monthlyBill')}>
              Monthly electricity bill (₹)
            </label>
            <input
              id={fieldId('monthlyBill')}
              className="field-input"
              type="number"
              inputMode="numeric"
              min="0"
              max="10000000"
              step="1"
              placeholder="e.g. 3000"
              value={form.monthlyBill}
              onChange={(event) => update('monthlyBill', event.target.value)}
              aria-invalid={Boolean(errors.monthlyBill)}
              aria-describedby={errors.monthlyBill ? fieldId('bill-error') : undefined}
            />
            {errors.monthlyBill && (
              <p id={fieldId('bill-error')} className="field-error">
                {errors.monthlyBill}
              </p>
            )}
          </div>

          <div>
            <label className="field-label" htmlFor={fieldId('requirement')}>
              Solar requirement
            </label>
            <select
              id={fieldId('requirement')}
              className="field-select"
              value={form.requirement}
              onChange={(event) => update('requirement', event.target.value)}
              aria-invalid={Boolean(errors.requirement)}
            >
              {requirements.map((requirement) => (
                <option key={requirement} value={requirement}>
                  {requirement}
                </option>
              ))}
            </select>
            {errors.requirement && <p className="field-error">{errors.requirement}</p>}
          </div>

          {!compact && (
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor={fieldId('message')}>
                Message <span className="font-medium normal-case tracking-normal text-ink/35">(optional)</span>
              </label>
              <textarea
                id={fieldId('message')}
                className="field-textarea"
                placeholder="Roof size, preferred timeline, or anything else we should know"
                maxLength={1000}
                value={form.message}
                onChange={(event) => update('message', event.target.value)}
              />
            </div>
          )}
        </div>

        <div className="mt-5 flex items-start gap-3">
          <input
            id={fieldId('consent')}
            type="checkbox"
            checked={form.consent}
            onChange={(event) => update('consent', event.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-forest-900/30 accent-forest-800"
            aria-invalid={Boolean(errors.consent)}
          />
          <label htmlFor={fieldId('consent')} className="text-xs leading-5 text-ink/55">
            I agree to be contacted about my enquiry and accept the{' '}
            <Link to="/privacy-policy" className="font-bold text-forest-700 underline underline-offset-2">
              privacy policy
            </Link>
            .
          </label>
        </div>
        {errors.consent && <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.consent}</p>}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary mt-5 w-full"
        >
          {status === 'submitting' ? (
            <>
              <Icon name="Loader2" size={18} className="animate-spin" />
              Sending enquiry…
            </>
          ) : (
            <>
              Get Your Free Solar Consultation
              <Icon name="ArrowRight" size={18} />
            </>
          )}
        </button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[0.68rem] font-semibold text-ink/40">
          <Icon name="ShieldCheck" size={13} />
          No spam. Your details stay private.
        </p>
      </form>
    </div>
  )
}
