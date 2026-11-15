import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@/components/Icon'
import { useContent } from '@/context/ContentContext'
import { api } from '@/lib/api'
import { buildWhatsAppUrl, digitsOnly, formatCurrency } from '@/lib/utils'
import { serviceCities } from '@/data/site'
import {
  SUBSIDY_SOURCE,
  getIndicativeSubsidy,
  subsidyCapacityOptions,
} from '@/data/subsidy'

const initialForm = {
  name: '',
  mobile: '',
  city: 'Indore',
  consumerNumber: '',
  capacity: '3',
  monthlyBill: '',
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
  if (values.consumerNumber.trim().length > 30) {
    errors.consumerNumber = 'Consumer number cannot exceed 30 characters.'
  }
  if (!subsidyCapacityOptions.includes(Number(values.capacity))) {
    errors.capacity = 'Please select your required solar capacity.'
  }
  if (values.monthlyBill !== '') {
    const bill = Number(values.monthlyBill)
    if (!Number.isFinite(bill) || bill < 0 || bill > 10000000) {
      errors.monthlyBill = 'Enter a valid monthly electricity bill or leave it blank.'
    }
  }
  if (!values.consent) {
    errors.consent = 'Please accept the privacy policy to continue.'
  }
  return errors
}

export default function SubsidyEnquiryForm({ initialCapacity = 3 }) {
  const uid = useId()
  const { contact } = useContent()
  const [form, setForm] = useState({
    ...initialForm,
    capacity: String(initialCapacity || initialForm.capacity),
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (!initialCapacity) return
    setForm((previous) => ({ ...previous, capacity: String(initialCapacity) }))
  }, [initialCapacity])

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
      document.getElementById(fieldId(Object.keys(nextErrors)[0]))?.focus()
      return
    }

    setStatus('submitting')
    try {
      const data = await api.post('/api/enquiries', {
        name: form.name.trim(),
        mobile: form.mobile,
        city: form.city,
        propertyType: 'Home',
        monthlyBill: form.monthlyBill === '' ? undefined : Number(form.monthlyBill),
        requirement: 'Residential Solar',
        subsidyCapacity: Number(form.capacity),
        consumerNumber: form.consumerNumber.trim(),
        message: form.message.trim(),
        consent: form.consent,
        website: form.website,
        source: SUBSIDY_SOURCE,
      })
      setResult({ ...data, capacity: Number(form.capacity) })
      setStatus('success')
      setForm({
        ...initialForm,
        capacity: String(initialCapacity || initialForm.capacity),
      })
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
    const estimate = getIndicativeSubsidy(result.capacity)
    const whatsappUrl = buildWhatsAppUrl(
      contact.whatsapp || contact.phoneRaw,
      `Hello Ramesh Solar Services, I submitted a PM Surya Ghar subsidy enquiry. My reference ID is ${result.enquiryId}. Capacity: ${result.capacity} kW. Indicative subsidy: ${formatCurrency(
        estimate,
      )}.`,
    )

    return (
      <div className="rounded-5xl border border-forest-900/10 bg-white p-7 text-center shadow-card sm:p-9">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-50 text-forest-700 ring-8 ring-forest-50/50">
          <Icon name="CheckCircle2" size={32} />
        </div>
        <h3 className="mt-6 font-display text-3xl text-forest-900">Enquiry received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/60">
          Thank you, {result.name || 'there'}. Our team will contact you about your PM Surya Ghar
          subsidy query and the next practical step for your home.
        </p>
        <div className="mx-auto mt-6 grid max-w-md gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-dashed border-forest-900/20 bg-forest-50/60 px-4 py-3">
            <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-ink/45">
              Enquiry ID
            </p>
            <p className="mt-1 text-sm font-extrabold tracking-wide text-forest-900">
              {result.enquiryId}
            </p>
          </div>
          <div className="rounded-2xl border border-dashed border-forest-900/20 bg-forest-50/60 px-4 py-3">
            <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-ink/45">
              Indicative subsidy
            </p>
            <p className="mt-1 text-sm font-extrabold tracking-wide text-forest-900">
              {formatCurrency(estimate)}
            </p>
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-md text-[0.68rem] leading-5 text-ink/40">
          The amount shown is indicative only. Final eligibility and subsidy release depend on the
          official portal, DISCOM verification and current scheme rules.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
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
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-forest-500">
          Subsidy consultation
        </p>
        <h3 className="mt-1 font-display text-3xl leading-tight text-forest-900 sm:text-[2.15rem]">
          Get free guidance on your application
        </h3>
        <p className="mt-2 text-sm leading-6 text-ink/55">
          Share a few details and our team will help you understand the documents, installation
          requirements and next steps. This is not an official government application.
        </p>
      </div>

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
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
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
              />
            </div>
            {errors.mobile && <p className="field-error">{errors.mobile}</p>}
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
            <label className="field-label" htmlFor={fieldId('consumerNumber')}>
              Electricity consumer number{' '}
              <span className="font-medium normal-case tracking-normal text-ink/35">(optional)</span>
            </label>
            <input
              id={fieldId('consumerNumber')}
              className="field-input"
              type="text"
              maxLength={30}
              placeholder="As printed on your electricity bill"
              value={form.consumerNumber}
              onChange={(event) => update('consumerNumber', event.target.value)}
              aria-invalid={Boolean(errors.consumerNumber)}
            />
            {errors.consumerNumber && <p className="field-error">{errors.consumerNumber}</p>}
          </div>

          <div>
            <label className="field-label" htmlFor={fieldId('capacity')}>
              Required solar capacity
            </label>
            <select
              id={fieldId('capacity')}
              className="field-select"
              value={form.capacity}
              onChange={(event) => update('capacity', event.target.value)}
              aria-invalid={Boolean(errors.capacity)}
            >
              {subsidyCapacityOptions.map((value) => (
                <option key={value} value={value}>
                  {value} kW
                </option>
              ))}
            </select>
            {errors.capacity && <p className="field-error">{errors.capacity}</p>}
          </div>

          <div>
            <label className="field-label" htmlFor={fieldId('monthlyBill')}>
              Monthly electricity bill{' '}
              <span className="font-medium normal-case tracking-normal text-ink/35">(optional)</span>
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-ink/40">
                ₹
              </span>
              <input
                id={fieldId('monthlyBill')}
                className="field-input pl-9"
                type="number"
                inputMode="numeric"
                min="0"
                max="10000000"
                step="1"
                placeholder="e.g. 3000"
                value={form.monthlyBill}
                onChange={(event) => update('monthlyBill', event.target.value)}
                aria-invalid={Boolean(errors.monthlyBill)}
              />
            </div>
            {errors.monthlyBill && <p className="field-error">{errors.monthlyBill}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className="field-label" htmlFor={fieldId('message')}>
              Message{' '}
              <span className="font-medium normal-case tracking-normal text-ink/35">(optional)</span>
            </label>
            <textarea
              id={fieldId('message')}
              className="field-textarea"
              placeholder="Roof size, DISCOM, previous subsidy status, or anything else we should know"
              maxLength={1000}
              value={form.message}
              onChange={(event) => update('message', event.target.value)}
            />
          </div>
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
            I agree to be contacted about my subsidy query and accept the{' '}
            <Link
              to="/privacy-policy"
              className="font-bold text-forest-700 underline underline-offset-2"
            >
              privacy policy
            </Link>
            .
          </label>
        </div>
        {errors.consent && (
          <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.consent}</p>
        )}

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
              Get Free Solar Consultation
              <Icon name="ArrowRight" size={18} />
            </>
          )}
        </button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[0.68rem] font-semibold text-ink/40">
          <Icon name="ShieldCheck" size={13} />
          Your details stay private. We do not guarantee subsidy approval.
        </p>
      </form>
    </div>
  )
}
