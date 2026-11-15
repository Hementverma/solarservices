import { useEffect, useMemo, useState } from 'react'
import Icon from '@/components/Icon'
import { useContent } from '@/context/ContentContext'
import { buildWhatsAppUrl, formatCurrency, normalizePhoneHref } from '@/lib/utils'
import {
  SUBSIDY_DISCLAIMER,
  connectionTypes,
  getIndicativeSubsidy,
  subsidyCapacityOptions,
} from '@/data/subsidy'

export default function SubsidyCalculator({ onEstimateChange, initialCapacity = 3 }) {
  const { contact, calculator } = useContent()
  const rate = Number(calculator?.systemCostPerKw) || 52000
  const [capacity, setCapacity] = useState(Number(initialCapacity) || 3)
  const [connectionType, setConnectionType] = useState('Residential')
  const [cost, setCost] = useState(() => String(Math.round(rate * (Number(initialCapacity) || 3))))
  const [costEdited, setCostEdited] = useState(false)

  useEffect(() => {
    setCapacity(Number(initialCapacity) || 3)
  }, [initialCapacity])

  useEffect(() => {
    if (!costEdited) setCost(String(Math.round(rate * capacity)))
  }, [capacity, rate, costEdited])

  const isResidential = connectionType === 'Residential'
  const subsidy = isResidential ? getIndicativeSubsidy(capacity) : 0
  const costValue = Number(cost)
  const validCost = cost !== '' && Number.isFinite(costValue) && costValue >= 0
  const afterSubsidy = validCost ? Math.max(0, costValue - subsidy) : null

  const estimate = useMemo(
    () => ({
      capacity,
      connectionType,
      subsidy,
      cost: validCost ? costValue : null,
      afterSubsidy,
      isResidential,
    }),
    [capacity, connectionType, subsidy, validCost, costValue, afterSubsidy, isResidential],
  )

  useEffect(() => {
    onEstimateChange?.(estimate)
  }, [estimate, onEstimateChange])

  const whatsappMessage = `Hello Ramesh Solar Services, I used the PM Surya Ghar subsidy calculator. Capacity: ${capacity} kW. Connection: ${connectionType}. Indicative central subsidy: ${formatCurrency(subsidy)}.${
    validCost ? ` Estimated installation cost: ${formatCurrency(costValue)}.` : ''
  } Please contact me to discuss eligibility and a site-specific proposal.`

  const whatsappUrl = buildWhatsAppUrl(contact.whatsapp || contact.phoneRaw, whatsappMessage)
  const callUrl = normalizePhoneHref(contact.phoneRaw || contact.phone)

  const chooseCapacity = (value) => {
    setCapacity(value)
    if (!costEdited) setCost(String(Math.round(rate * value)))
  }

  return (
    <div className="overflow-hidden rounded-5xl border border-forest-900/10 bg-white shadow-card">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-forest-900/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest-50 text-forest-700">
              <Icon name="BadgeIndianRupee" size={21} />
            </span>
            <div>
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-forest-500">
                Subsidy estimator
              </p>
              <h2 className="mt-0.5 text-base font-extrabold text-forest-900">
                Calculate your indicative subsidy
              </h2>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="subsidy-connection-type" className="field-label">
              Electricity connection type
            </label>
            <select
              id="subsidy-connection-type"
              className="field-select"
              value={connectionType}
              onChange={(event) => setConnectionType(event.target.value)}
            >
              {connectionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-[0.68rem] leading-5 text-ink/45">
              Central PM Surya Ghar subsidy applies to eligible residential connections only.
            </p>
          </div>

          <fieldset className="mt-6">
            <legend className="field-label">Required solar capacity</legend>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {subsidyCapacityOptions.map((value) => {
                const active = capacity === value
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => chooseCapacity(value)}
                    aria-pressed={active}
                    className={`rounded-2xl border px-2 py-3 text-center text-sm font-extrabold transition ${
                      active
                        ? 'border-forest-900 bg-forest-900 text-white shadow-soft'
                        : 'border-forest-900/15 bg-mist text-forest-900 hover:border-forest-900/35'
                    }`}
                  >
                    {value} kW
                  </button>
                )
              })}
            </div>
            <p className="mt-2 text-[0.68rem] leading-5 text-ink/45">
              3 kW and above are capped at the maximum central subsidy. Larger systems may have a
              higher project cost.
            </p>
          </fieldset>

          <div className="mt-6">
            <label htmlFor="subsidy-system-cost" className="field-label">
              Estimated total installation cost{' '}
              <span className="font-medium normal-case tracking-normal text-ink/35">(optional)</span>
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-ink/40">
                ₹
              </span>
              <input
                id="subsidy-system-cost"
                type="number"
                inputMode="numeric"
                min="0"
                step="1000"
                value={cost}
                onChange={(event) => {
                  setCostEdited(true)
                  setCost(event.target.value)
                }}
                placeholder="Enter your quoted project cost"
                className="field-input pl-9"
              />
            </div>
            <p className="mt-1.5 text-[0.68rem] leading-5 text-ink/45">
              Pre-filled using an indicative rate. Replace it with your quotation if available.
            </p>
          </div>

          {!isResidential && (
            <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
              <Icon name="CircleHelp" size={17} className="mt-0.5 shrink-0" />
              This residential subsidy is not shown for commercial, industrial or agricultural
              connections. You can still request a solar consultation for those properties.
            </div>
          )}
        </div>

        <div className="bg-forest-900 p-6 text-white sm:p-8">
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-solar-300">
            Indicative estimate
          </p>
          <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-[0.68rem] font-semibold text-white/50">Selected capacity</p>
            <p className="mt-1 font-display text-4xl text-white">{capacity} kW</p>
            <div className="mt-5 h-px bg-white/10" />
            <p className="mt-5 text-[0.68rem] font-semibold text-white/50">
              Indicative central subsidy
            </p>
            <p className="mt-1 font-display text-5xl leading-none text-solar-400">
              {formatCurrency(subsidy)}
            </p>
            <p className="mt-2 text-[0.65rem] leading-5 text-white/45">
              {isResidential
                ? 'For eligible residential rooftop systems, subject to scheme and DISCOM verification.'
                : 'Residential subsidy is not applicable to this connection type.'}
            </p>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3">
              <span className="text-xs text-white/50">Estimated project cost</span>
              <span className="text-sm font-extrabold text-white">
                {validCost ? formatCurrency(costValue) : 'Not entered'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3">
              <span className="text-xs text-white/50">Estimated cost after subsidy</span>
              <span className="text-sm font-extrabold text-solar-300">
                {afterSubsidy !== null ? formatCurrency(afterSubsidy) : '—'}
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            <button
              type="button"
              onClick={() => document.getElementById('subsidy-lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="btn-primary w-full"
            >
              Get Free Solar Consultation
              <Icon name="ArrowRight" size={17} />
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a href={callUrl} className="btn-white justify-center px-3 text-xs">
                <Icon name="Phone" size={15} />
                Talk to Our Expert
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-white justify-center px-3 text-xs"
              >
                <Icon name="MessageCircle" size={15} />
                WhatsApp
              </a>
            </div>
          </div>

          <p className="mt-4 text-[0.62rem] leading-5 text-white/35">{SUBSIDY_DISCLAIMER}</p>
        </div>
      </div>
    </div>
  )
}
