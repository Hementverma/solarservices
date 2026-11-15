import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@/components/Icon'
import { useContent } from '@/context/ContentContext'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { propertyTypes, serviceCities } from '@/data/site'

function roundCapacity(value) {
  if (value <= 1) return 1
  if (value <= 10) return Math.ceil(value * 2) / 2
  return Math.ceil(value)
}

export default function SolarCalculator({ className = '' }) {
  const { calculator } = useContent()
  const [monthlyBill, setMonthlyBill] = useState('3000')
  const [tariff, setTariff] = useState('')
  const [city, setCity] = useState('Indore')
  const [propertyType, setPropertyType] = useState('Home')

  const result = useMemo(() => {
    const bill = Number(monthlyBill)
    if (!Number.isFinite(bill) || bill <= 0) return null

    const defaultTariff = calculator.tariffDefaults?.[propertyType] ?? 7.2
    const effectiveTariff = tariff ? Number(tariff) : defaultTariff
    if (!Number.isFinite(effectiveTariff) || effectiveTariff <= 0) return null

    const sunHours = calculator.peakSunHoursByCity?.[city] ?? 4.8
    const performanceRatio = calculator.performanceRatio ?? 0.8
    const monthlyUnits = bill / effectiveTariff
    const dailyGenerationPerKw = sunHours * performanceRatio
    const rawCapacity = monthlyUnits / (30 * dailyGenerationPerKw)
    const capacity = Math.min(
      Number(calculator.maxCapacity) || 1000,
      Math.max(Number(calculator.minCapacity) || 1, roundCapacity(rawCapacity)),
    )
    const monthlyGeneration = capacity * 30 * dailyGenerationPerKw
    const monthlySavings = Math.min(monthlyGeneration, monthlyUnits) * effectiveTariff
    const annualSavings = monthlySavings * 12
    const estimatedCost = capacity * (calculator.systemCostPerKw ?? 52000)
    const co2Offset = monthlyGeneration * 12 * (calculator.co2PerKwh ?? 0.82)

    return {
      capacity,
      monthlyGeneration,
      monthlySavings,
      annualSavings,
      estimatedCost,
      co2Offset,
      effectiveTariff,
      sunHours,
      performanceRatio,
      defaultTariff,
    }
  }, [monthlyBill, tariff, city, propertyType, calculator])

  const quoteParams = new URLSearchParams({
    city,
    propertyType,
    bill: monthlyBill,
    capacity: result ? String(result.capacity) : '',
  }).toString()

  const reset = () => {
    setMonthlyBill('3000')
    setTariff('')
    setCity('Indore')
    setPropertyType('Home')
  }

  return (
    <div className={`overflow-hidden rounded-5xl border border-forest-900/10 bg-white shadow-card ${className}`}>
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest-50 text-forest-700">
              <Icon name="SlidersHorizontal" size={21} />
            </span>
            <div>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-forest-500">
                Inputs
              </p>
              <h3 className="text-lg font-extrabold text-forest-900">Tell us about your usage</h3>
            </div>
          </div>

          <div className="mt-7 space-y-5">
            <div>
              <label htmlFor="calc-bill" className="field-label">
                Monthly electricity bill
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-ink/40">
                  ₹
                </span>
                <input
                  id="calc-bill"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="100"
                  className="field-input pl-9"
                  value={monthlyBill}
                  onChange={(event) => setMonthlyBill(event.target.value)}
                  placeholder="e.g. 3000"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="calc-city" className="field-label">
                  City
                </label>
                <select
                  id="calc-city"
                  className="field-select"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                >
                  {serviceCities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="calc-property" className="field-label">
                  Property type
                </label>
                <select
                  id="calc-property"
                  className="field-select"
                  value={propertyType}
                  onChange={(event) => setPropertyType(event.target.value)}
                >
                  {propertyTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="calc-tariff" className="field-label">
                Electricity tariff <span className="font-medium normal-case tracking-normal text-ink/35">(optional, ₹/unit)</span>
              </label>
              <input
                id="calc-tariff"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                className="field-input"
                value={tariff}
                onChange={(event) => setTariff(event.target.value)}
                placeholder={`Default for ${propertyType}: ₹${calculator.tariffDefaults?.[propertyType] ?? 7.2}/unit`}
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-forest-50/70 px-4 py-3.5 text-xs leading-5 text-ink/55">
            <span className="font-bold text-forest-800">How this works:</span> we estimate solar
            capacity from your bill, local sun hours ({result?.sunHours ?? 4.8} kWh/m²/day) and a{' '}
            {Math.round((result?.performanceRatio ?? 0.8) * 100)}% performance ratio. Results are
            indicative, not a guaranteed quote.
          </div>

          <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-forest-600 transition hover:text-forest-900"
          >
            <Icon name="ArrowLeft" size={13} />
            Reset calculator
          </button>
        </div>

        <div className="relative overflow-hidden bg-forest-900 p-6 text-white sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-solar-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-forest-500/30 blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-solar-300">
                  Indicative estimate
                </p>
                <h3 className="mt-1 text-lg font-extrabold text-white">Your solar snapshot</h3>
              </div>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-wider text-white/60">
                {city} · {propertyType}
              </span>
            </div>

            {result ? (
              <>
                <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-white/50">
                    Suggested solar capacity
                  </p>
                  <p className="mt-2 font-display text-5xl text-white">
                    {formatNumber(result.capacity, 1)}{' '}
                    <span className="font-sans text-base font-bold tracking-normal text-solar-300">
                      kW
                    </span>
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/50">
                    Approx. {formatNumber(result.monthlyGeneration)} units/month · tariff taken at ₹
                    {formatNumber(result.effectiveTariff, 2)}/unit
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <Icon name="Zap" size={18} className="text-solar-400" />
                    <p className="mt-3 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-white/45">
                      Est. monthly savings
                    </p>
                    <p className="mt-1 text-xl font-extrabold text-white">
                      {formatCurrency(result.monthlySavings)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <Icon name="TrendingUp" size={18} className="text-solar-400" />
                    <p className="mt-3 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-white/45">
                      Est. annual savings
                    </p>
                    <p className="mt-1 text-xl font-extrabold text-white">
                      {formatCurrency(result.annualSavings)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <Icon name="IndianRupee" size={18} className="text-solar-400" />
                    <p className="mt-3 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-white/45">
                      Indicative system cost
                    </p>
                    <p className="mt-1 text-base font-extrabold text-white">
                      {formatCurrency(result.estimatedCost)}
                    </p>
                    <p className="mt-0.5 text-[0.6rem] text-white/35">Before subsidy</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <Icon name="Leaf" size={18} className="text-solar-400" />
                    <p className="mt-3 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-white/45">
                      Est. CO₂ offset / year
                    </p>
                    <p className="mt-1 text-base font-extrabold text-white">
                      {formatNumber(result.co2Offset)} kg
                    </p>
                  </div>
                </div>

                <Link
                  to={`/contact?${quoteParams}`}
                  className="btn-primary mt-5 w-full"
                >
                  Get an exact proposal
                  <Icon name="ArrowRight" size={17} />
                </Link>
              </>
            ) : (
              <div className="mt-10 rounded-3xl border border-dashed border-white/20 p-8 text-center text-sm text-white/60">
                Enter a monthly electricity bill to see an indicative estimate.
              </div>
            )}

            <p className="mt-4 text-[0.64rem] leading-5 text-white/35">
              Assumptions are configurable by our team. Actual generation, savings and costs vary
              with site conditions, tariff changes, system design and usage. This is not a
              guarantee of savings. Subsidy eligibility is subject to government and DISCOM rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
