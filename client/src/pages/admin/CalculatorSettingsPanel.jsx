import { useEffect, useState } from 'react'
import Icon from '@/components/Icon'
import { api } from '@/lib/api'
import { formatDateTime, formatNumber } from '@/lib/utils'
import { ADMIN_CITIES, ADMIN_PROPERTY_TYPES } from '@/data/admin'

const emptyForm = {
  tariffDefaults: {},
  peakSunHoursByCity: {},
  performanceRatio: 0.8,
  systemCostPerKw: 52000,
  co2PerKwh: 0.82,
  minCapacity: 1,
  maxCapacity: 1000,
}

const numberFields = [
  {
    name: 'performanceRatio',
    label: 'Performance ratio',
    hint: 'Typical range 0.75–0.85. Accounts for heat, wiring and soiling losses.',
    min: 0.4,
    max: 1,
    step: 0.01,
  },
  {
    name: 'systemCostPerKw',
    label: 'Indicative cost per kW (₹)',
    hint: 'Used to show an indicative system cost. Not a quotation or guaranteed price.',
    min: 10000,
    max: 200000,
    step: 500,
  },
  {
    name: 'co2PerKwh',
    label: 'CO₂ factor (kg per kWh)',
    hint: 'Used to estimate avoided emissions from solar generation.',
    min: 0,
    max: 2,
    step: 0.01,
  },
  {
    name: 'minCapacity',
    label: 'Minimum capacity (kW)',
    hint: 'Smallest system size the calculator will recommend.',
    min: 0.5,
    max: 100,
    step: 0.1,
  },
  {
    name: 'maxCapacity',
    label: 'Maximum capacity (kW)',
    hint: 'Largest system size the calculator will consider.',
    min: 100,
    max: 100000,
    step: 1,
  },
]

export default function CalculatorSettingsPanel() {
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
      .get('/api/admin/settings/calculator')
      .then((response) => {
        if (!active) return
        const calculator = response.calculator || {}
        const tariffDefaults = {}
        ADMIN_PROPERTY_TYPES.forEach((type) => {
          tariffDefaults[type] = calculator.tariffDefaults?.[type] ?? ''
        })
        const peakSunHoursByCity = {}
        ADMIN_CITIES.forEach((city) => {
          peakSunHoursByCity[city] = calculator.peakSunHoursByCity?.[city] ?? ''
        })
        setForm({
          tariffDefaults,
          peakSunHoursByCity,
          performanceRatio: calculator.performanceRatio ?? 0.8,
          systemCostPerKw: calculator.systemCostPerKw ?? 52000,
          co2PerKwh: calculator.co2PerKwh ?? 0.82,
          minCapacity: calculator.minCapacity ?? 1,
          maxCapacity: calculator.maxCapacity ?? 1000,
        })
        setMeta(calculator)
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setSaveError('')
    setFlash('')
    try {
      const payload = {
        tariffDefaults: Object.fromEntries(
          Object.entries(form.tariffDefaults).map(([key, value]) => [key, Number(value)]),
        ),
        peakSunHoursByCity: Object.fromEntries(
          Object.entries(form.peakSunHoursByCity).map(([key, value]) => [key, Number(value)]),
        ),
        performanceRatio: Number(form.performanceRatio),
        systemCostPerKw: Number(form.systemCostPerKw),
        co2PerKwh: Number(form.co2PerKwh),
        minCapacity: Number(form.minCapacity),
        maxCapacity: Number(form.maxCapacity),
      }
      const response = await api.put('/api/admin/settings/calculator', payload)
      setMeta(response.calculator)
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
        <div className="h-[620px] animate-pulse rounded-3xl bg-white" />
        <div className="h-80 animate-pulse rounded-3xl bg-white" />
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

      <div className="mb-4 flex items-start gap-3 rounded-2xl border border-forest-900/10 bg-white px-4 py-3 text-xs leading-5 text-ink/50">
        <Icon name="ShieldCheck" size={17} className="mt-0.5 shrink-0 text-forest-600" />
        <p>
          These assumptions power the public solar calculator. Results are clearly labelled as
          indicative estimates on the website. Review tariff, generation and cost assumptions
          periodically and keep them realistic — do not use them to imply a guaranteed saving.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-forest-900/10 bg-white p-5 sm:p-6"
        >
          {saveError && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
              {saveError}
            </div>
          )}

          <section>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-solar-100 text-solar-800">
                <Icon name="IndianRupee" size={17} />
              </span>
              <div>
                <h2 className="text-sm font-extrabold text-forest-900">Default electricity tariffs</h2>
                <p className="text-[0.65rem] text-ink/40">₹ per unit (kWh), by property type.</p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ADMIN_PROPERTY_TYPES.map((type) => (
                <div key={type}>
                  <label htmlFor={`tariff-${type}`} className="admin-label">
                    {type}
                  </label>
                  <input
                    id={`tariff-${type}`}
                    type="number"
                    min="0"
                    max="50"
                    step="0.1"
                    value={form.tariffDefaults[type] ?? ''}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        tariffDefaults: {
                          ...previous.tariffDefaults,
                          [type]: event.target.value,
                        },
                      }))
                    }
                    className="admin-input"
                    required
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="mt-7 border-t border-forest-900/10 pt-6">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-solar-100 text-solar-800">
                <Icon name="SunMedium" size={17} />
              </span>
              <div>
                <h2 className="text-sm font-extrabold text-forest-900">Peak sun hours by city</h2>
                <p className="text-[0.65rem] text-ink/40">
                  Average daily generation hours used in estimates.
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ADMIN_CITIES.map((city) => (
                <div key={city}>
                  <label htmlFor={`sun-${city}`} className="admin-label">
                    {city}
                  </label>
                  <input
                    id={`sun-${city}`}
                    type="number"
                    min="1"
                    max="10"
                    step="0.1"
                    value={form.peakSunHoursByCity[city] ?? ''}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        peakSunHoursByCity: {
                          ...previous.peakSunHoursByCity,
                          [city]: event.target.value,
                        },
                      }))
                    }
                    className="admin-input"
                    required
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="mt-7 border-t border-forest-900/10 pt-6">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-solar-100 text-solar-800">
                <Icon name="SlidersHorizontal" size={17} />
              </span>
              <div>
                <h2 className="text-sm font-extrabold text-forest-900">System assumptions</h2>
                <p className="text-[0.65rem] text-ink/40">
                  Shared factors used across every calculator result.
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {numberFields.map((field) => (
                <div key={field.name} className={field.name === 'maxCapacity' ? 'sm:col-span-2 lg:col-span-1' : ''}>
                  <label htmlFor={`calc-${field.name}`} className="admin-label">
                    {field.label}
                  </label>
                  <input
                    id={`calc-${field.name}`}
                    type="number"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={form[field.name]}
                    onChange={(event) =>
                      setForm((previous) => ({ ...previous, [field.name]: event.target.value }))
                    }
                    className="admin-input"
                    required
                  />
                  <p className="mt-1 text-[0.62rem] leading-4 text-ink/35">{field.hint}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-forest-900/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.65rem] leading-4 text-ink/35">
              {meta?.updatedAt
                ? `Last updated ${formatDateTime(meta.updatedAt)}`
                : 'Using built-in default assumptions until saved.'}
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
              Save calculator settings
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="rounded-3xl border border-forest-900/10 bg-white p-5">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.13em] text-ink/40">
              Current assumptions at a glance
            </h3>
            <dl className="mt-4 space-y-3">
              {[
                {
                  label: 'Performance ratio',
                  value: `${formatNumber(form.performanceRatio, 2)}`,
                },
                {
                  label: 'Cost per kW',
                  value: `₹${formatNumber(form.systemCostPerKw)}`,
                },
                {
                  label: 'CO₂ factor',
                  value: `${formatNumber(form.co2PerKwh, 2)} kg/kWh`,
                },
                {
                  label: 'Capacity range',
                  value: `${formatNumber(form.minCapacity, 1)} – ${formatNumber(
                    form.maxCapacity,
                    0,
                  )} kW`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 border-b border-forest-900/8 pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-xs text-ink/45">{item.label}</dt>
                  <dd className="text-xs font-extrabold text-forest-900">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-center gap-2 text-amber-800">
              <Icon name="ShieldCheck" size={18} />
              <h3 className="text-sm font-extrabold">Accuracy matters</h3>
            </div>
            <ul className="mt-2 space-y-1.5 text-[0.68rem] leading-5 text-amber-700/80">
              <li>Tariffs vary by DISCOM, slab and contract demand.</li>
              <li>Actual generation depends on shading, tilt and maintenance.</li>
              <li>Subsidy rules can change — always verify before quoting.</li>
              <li>Calculator output must never be presented as a guarantee.</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-forest-900 p-5 text-white">
            <Icon name="Sparkles" size={19} className="text-solar-400" />
            <p className="mt-3 text-xs leading-6 text-white/55">
              The public calculator labels every result as an indicative estimate and explains the
              assumptions used. Keep the text on the calculator page aligned with these values.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
