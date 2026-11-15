import { useState } from 'react'
import Icon from '@/components/Icon'
import { useContent } from '@/context/ContentContext'
import { buildWhatsAppUrl, formatCurrency } from '@/lib/utils'
import {
  getIndicativeSubsidy,
  indianStates,
  mpDiscoms,
  subsidyCapacityOptions,
} from '@/data/subsidy'

const steps = [
  'Connection type',
  'State',
  'DISCOM',
  'Rooftop space',
  'Previous subsidy',
  'System size',
]

const optionButtonClass = (active) =>
  `flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-bold transition ${
    active
      ? 'border-forest-900 bg-forest-50 text-forest-900 ring-1 ring-forest-900'
      : 'border-forest-900/12 bg-white text-ink/65 hover:border-forest-900/30'
  }`

function ChoiceGroup({ label, options, value, onChange }) {
  return (
    <div>
      <p className="text-sm font-extrabold text-forest-900">{label}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value
          const optionLabel = typeof option === 'string' ? option : option.label
          const active = value === optionValue
          return (
            <button
              key={optionValue}
              type="button"
              onClick={() => onChange(optionValue)}
              className={optionButtonClass(active)}
              aria-pressed={active}
            >
              <span>{optionLabel}</span>
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                  active ? 'border-forest-900 bg-forest-900 text-white' : 'border-forest-900/20'
                }`}
              >
                {active && <Icon name="Check" size={12} />}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function EligibilityChecker({ onCapacitySelect }) {
  const { contact } = useContent()
  const [step, setStep] = useState(0)
  const [residential, setResidential] = useState('')
  const [state, setState] = useState('Madhya Pradesh')
  const [discom, setDiscom] = useState('')
  const [rooftop, setRooftop] = useState('')
  const [received, setReceived] = useState('')
  const [capacity, setCapacity] = useState('')
  const [touched, setTouched] = useState(false)
  const [result, setResult] = useState(null)

  const discomOptions =
    state === 'Madhya Pradesh'
      ? mpDiscoms
      : [{ value: 'Other / Not sure', label: 'Other DISCOM / Not sure' }]

  const answered =
    (step === 0 && Boolean(residential)) ||
    step === 1 ||
    (step === 2 && Boolean(discom)) ||
    (step === 3 && Boolean(rooftop)) ||
    (step === 4 && Boolean(received)) ||
    (step === 5 && Boolean(capacity))

  const chooseState = (value) => {
    setState(value)
    setDiscom(value === 'Madhya Pradesh' ? discom : 'Other / Not sure')
  }

  const evaluate = () => {
    const selectedCapacity = Number(capacity)
    const selectedCapacityText = capacity ? `${capacity} kW` : 'your planned capacity'
    const subsidy = selectedCapacity ? getIndicativeSubsidy(selectedCapacity) : 0

    if (residential === 'No') {
      return {
        tone: 'not',
        title: 'Residential subsidy may not apply',
        description:
          'PM Surya Ghar central financial assistance is intended for eligible residential rooftop systems. Commercial, industrial and agricultural connections should not assume this subsidy. We can still help you plan a solar system for your property.',
        capacity,
        subsidy: 0,
      }
    }

    if (rooftop === 'No') {
      return {
        tone: 'not',
        title: 'A rooftop assessment is needed first',
        description:
          'A suitable installation area is generally required for rooftop solar. If your roof is shared, under construction or has structural constraints, a site inspection can confirm what is possible.',
        capacity,
        subsidy: 0,
      }
    }

    if (received === 'Yes') {
      return {
        tone: 'not',
        title: 'Eligibility needs careful verification',
        description:
          'If you have already received rooftop solar subsidy for this connection, a repeat claim may be restricted under the scheme rules. Please verify your status on the official portal or with your DISCOM before applying again.',
        capacity,
        subsidy: 0,
      }
    }

    if (received === 'Not sure') {
      return {
        tone: 'verify',
        title: 'You may be eligible, subject to verification',
        description: `Based on your answers, eligibility looks possible for ${selectedCapacityText}, but your previous subsidy status, DISCOM records and technical feasibility must be verified. An indicative central subsidy could be ${formatCurrency(
          subsidy,
        )} for an eligible 3 kW or higher residential system.`,
        capacity,
        subsidy,
      }
    }

    return {
      tone: 'possible',
      title: 'You may be eligible, subject to verification',
      description: `Based on your answers, an eligible residential rooftop system of ${selectedCapacityText} could be considered for an indicative central subsidy of ${formatCurrency(
        subsidy,
      )}. Final eligibility, approval and release depend on the official portal, DISCOM verification and current scheme rules.${
        state !== 'Madhya Pradesh'
          ? ' State-specific rules may also apply outside Madhya Pradesh.'
          : ''
      }`,
      capacity,
      subsidy,
    }
  }

  const next = () => {
    setTouched(true)
    if (!answered) return
    if (step < steps.length - 1) {
      setStep((value) => value + 1)
      setTouched(false)
      return
    }
    const nextResult = evaluate()
    setResult(nextResult)
    if (nextResult.capacity) onCapacitySelect?.(Number(nextResult.capacity))
  }

  const reset = () => {
    setStep(0)
    setResidential('')
    setState('Madhya Pradesh')
    setDiscom('')
    setRooftop('')
    setReceived('')
    setCapacity('')
    setTouched(false)
    setResult(null)
  }

  const toneStyles = {
    possible: {
      icon: 'BadgeCheck',
      box: 'border-emerald-200 bg-emerald-50 text-emerald-900',
      iconBox: 'bg-emerald-100 text-emerald-700',
    },
    verify: {
      icon: 'CircleHelp',
      box: 'border-amber-300 bg-amber-50 text-amber-900',
      iconBox: 'bg-amber-100 text-amber-700',
    },
    not: {
      icon: 'XCircle',
      box: 'border-red-200 bg-red-50 text-red-900',
      iconBox: 'bg-red-100 text-red-700',
    },
  }

  if (result) {
    const style = toneStyles[result.tone]
    const waUrl = buildWhatsAppUrl(
      contact.whatsapp || contact.phoneRaw,
      `Hello Ramesh Solar Services, I completed the PM Surya Ghar eligibility check. Connection: ${residential}. State: ${state}. DISCOM: ${discom}. Rooftop: ${rooftop}. Previous subsidy: ${received}. Capacity: ${
        result.capacity || 'not sure'
      } kW. Please help me understand the next step.`,
    )

    return (
      <div className="rounded-5xl border border-forest-900/10 bg-white p-6 shadow-card sm:p-8">
        <div className={`rounded-4xl border p-6 ${style.box}`}>
          <span className={`grid h-12 w-12 place-items-center rounded-2xl ${style.iconBox}`}>
            <Icon name={style.icon} size={24} />
          </span>
          <h3 className="mt-4 font-display text-3xl">{result.title}</h3>
          <p className="mt-3 text-sm leading-7 opacity-80">{result.description}</p>
          <p className="mt-4 flex items-start gap-2 text-[0.68rem] leading-5 opacity-65">
            <Icon name="ShieldCheck" size={15} className="mt-0.5 shrink-0" />
            This is an indicative self-check, not an official government decision. Verify current
            eligibility at pmsuryaghar.gov.in or with your DISCOM.
          </p>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => document.getElementById('subsidy-lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="btn-primary w-full"
          >
            Get Free Solar Consultation
            <Icon name="ArrowRight" size={17} />
          </button>
          <a href={waUrl} target="_blank" rel="noreferrer" className="btn-secondary w-full">
            <Icon name="MessageCircle" size={17} />
            Talk to Our Expert
          </a>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-4 text-xs font-bold text-forest-600 underline underline-offset-4 transition hover:text-forest-900"
        >
          Check again with different answers
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-5xl border border-forest-900/10 bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-forest-500">
            Eligibility checker
          </p>
          <h3 className="mt-1 font-display text-3xl text-forest-900">Check your eligibility</h3>
        </div>
        <span className="rounded-full bg-mist px-3 py-1.5 text-[0.65rem] font-extrabold text-forest-600">
          Step {step + 1} of {steps.length}
        </span>
      </div>

      <div className="mt-5">
        <div className="h-1.5 overflow-hidden rounded-full bg-mist">
          <div
            className="h-full rounded-full bg-forest-700 transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {steps.map((label, index) => (
            <span
              key={label}
              className={`text-[0.62rem] font-bold ${
                index === step ? 'text-forest-900' : index < step ? 'text-forest-500' : 'text-ink/30'
              }`}
            >
              {index < step ? '✓ ' : ''}
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-7">
        {step === 0 && (
          <ChoiceGroup
            label="Is this an electricity connection for a residential property?"
            options={['Yes', 'No']}
            value={residential}
            onChange={setResidential}
          />
        )}

        {step === 1 && (
          <div>
            <label htmlFor="eligibility-state" className="field-label">
              Which state is the property in?
            </label>
            <select
              id="eligibility-state"
              className="field-select"
              value={state}
              onChange={(event) => chooseState(event.target.value)}
            >
              {indianStates.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <p className="mt-2 text-[0.68rem] leading-5 text-ink/45">
              Madhya Pradesh is selected by default. Scheme availability and state rules can differ
              by location.
            </p>
          </div>
        )}

        {step === 2 && (
          <ChoiceGroup
            label="Which DISCOM supplies electricity to the property?"
            options={discomOptions}
            value={discom}
            onChange={setDiscom}
          />
        )}

        {step === 3 && (
          <ChoiceGroup
            label="Is suitable rooftop space available for solar panels?"
            options={['Yes', 'No']}
            value={rooftop}
            onChange={setRooftop}
          />
        )}

        {step === 4 && (
          <ChoiceGroup
            label="Have you already received a rooftop solar subsidy for this connection?"
            options={['No', 'Yes', 'Not sure']}
            value={received}
            onChange={setReceived}
          />
        )}

        {step === 5 && (
          <div>
            <label htmlFor="eligibility-capacity" className="field-label">
              What solar capacity are you interested in?
            </label>
            <select
              id="eligibility-capacity"
              className="field-select"
              value={capacity}
              onChange={(event) => setCapacity(event.target.value)}
            >
              <option value="">Select a capacity</option>
              {subsidyCapacityOptions.map((value) => (
                <option key={value} value={value}>
                  {value} kW
                </option>
              ))}
            </select>
            <p className="mt-2 text-[0.68rem] leading-5 text-ink/45">
              The final capacity depends on your usage, sanctioned load and site assessment.
            </p>
          </div>
        )}
      </div>

      {touched && !answered && (
        <p className="mt-3 text-xs font-semibold text-red-600">
          Please choose an option to continue.
        </p>
      )}

      <div className="mt-7 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            setStep((value) => Math.max(0, value - 1))
            setTouched(false)
          }}
          disabled={step === 0}
          className="btn-secondary disabled:opacity-40"
        >
          <Icon name="ArrowLeft" size={16} />
          Back
        </button>
        <button type="button" onClick={next} className="btn-primary">
          {step === steps.length - 1 ? 'Check My Subsidy' : 'Continue'}
          <Icon name="ArrowRight" size={17} />
        </button>
      </div>
    </div>
  )
}
