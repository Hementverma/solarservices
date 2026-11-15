import { useEffect, useState } from 'react'
import Icon from '@/components/Icon'
import Drawer from '@/components/admin/Drawer'
import StringListEditor from '@/components/admin/StringListEditor'
import { api } from '@/lib/api'
import { SERVICE_ICON_OPTIONS } from '@/data/admin'

const images = [
  '/images/residential-solar.jpg',
  '/images/commercial-solar.jpg',
  '/images/industrial-solar.jpg',
  '/images/ongrid-solar.jpg',
  '/images/offgrid-solar.jpg',
  '/images/hybrid-solar.jpg',
  '/images/hero-solar.jpg',
  '/images/about-solar.jpg',
]

const tabs = [
  { key: 'services', label: 'Services', icon: 'Sun' },
  { key: 'locations', label: 'Locations', icon: 'MapPin' },
]

export default function ContentPanel() {
  const [tab, setTab] = useState('services')
  const [services, setServices] = useState([])
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [flash, setFlash] = useState('')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    Promise.all([api.get('/api/admin/services'), api.get('/api/admin/locations')])
      .then(([serviceResponse, locationResponse]) => {
        if (!active) return
        setServices(serviceResponse.services)
        setLocations(locationResponse.locations)
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

  const showFlash = (message) => {
    setFlash(message)
    window.setTimeout(() => setFlash(''), 3500)
  }

  const openService = (service) => {
    setSaveError('')
    setEditing({ type: 'services', item: service })
    setForm({
      title: service.title,
      shortDescription: service.shortDescription,
      description: service.description,
      image: service.image,
      icon: service.icon,
      bestFor: service.bestFor || '',
      features: [...(service.features || [])],
      order: service.order ?? 0,
      active: Boolean(service.active),
    })
  }

  const openLocation = (location) => {
    setSaveError('')
    setEditing({ type: 'locations', item: location })
    setForm({
      name: location.name,
      title: location.title,
      metaTitle: location.metaTitle || '',
      metaDescription: location.metaDescription || '',
      intro: location.intro || '',
      description: location.description,
      image: location.image || '',
      highlights: [...(location.highlights || [])],
      areas: [...(location.areas || [])],
      order: location.order ?? 0,
      active: Boolean(location.active),
    })
  }

  const closeDrawer = () => {
    setEditing(null)
    setForm(null)
    setSaving(false)
    setSaveError('')
  }

  const handleSave = async (event) => {
    event.preventDefault()
    if (!editing || !form) return
    setSaving(true)
    setSaveError('')
    try {
      const payload =
        editing.type === 'services'
          ? {
              ...form,
              order: Number(form.order) || 0,
              features: form.features.filter((item) => item.trim()),
            }
          : {
              ...form,
              order: Number(form.order) || 0,
              highlights: form.highlights.filter((item) => item.trim()),
              areas: form.areas.filter((item) => item.trim()),
            }
      const response = await api.put(
        `/api/admin/${editing.type}/${editing.item._id}`,
        payload,
      )
      if (editing.type === 'services') {
        setServices((previous) =>
          previous.map((item) => (item._id === response.service._id ? response.service : item)),
        )
      } else {
        setLocations((previous) =>
          previous.map((item) => (item._id === response.location._id ? response.location : item)),
        )
      }
      showFlash(response.message)
      closeDrawer()
    } catch (requestError) {
      setSaveError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  const items = tab === 'services' ? services : locations
  const filtered = items.filter((item) => {
    if (!search.trim()) return true
    const haystack = `${item.title} ${item.name || ''} ${item.slug}`.toLowerCase()
    return haystack.includes(search.trim().toLowerCase())
  })

  return (
    <div>
      {flash && (
        <div className="mb-4 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          <Icon name="CheckCircle2" size={17} />
          {flash}
        </div>
      )}

      <div className="flex flex-col gap-3 rounded-3xl border border-forest-900/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex gap-1 rounded-2xl bg-mist p-1">
          {tabs.map((item) => {
            const count = item.key === 'services' ? services.length : locations.length
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key)}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-extrabold transition ${
                  tab === item.key
                    ? 'bg-white text-forest-900 shadow-sm'
                    : 'text-ink/45 hover:text-forest-800'
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
                <span className="rounded-full bg-forest-900/5 px-1.5 py-0.5 text-[0.6rem]">
                  {count}
                </span>
              </button>
            )
          })}
        </div>
        <div className="relative sm:w-64">
          <Icon
            name="Search"
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={`Search ${tab}…`}
            className="admin-input pl-9"
            aria-label={`Search ${tab}`}
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <Icon name="XCircle" size={18} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-40 animate-pulse rounded-3xl bg-white" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-4 rounded-3xl border border-dashed border-forest-900/15 bg-white px-5 py-16 text-center">
          <Icon name="FileText" size={28} className="mx-auto text-forest-300" />
          <h3 className="mt-3 text-sm font-extrabold text-forest-900">Nothing found</h3>
          <p className="mt-1 text-xs text-ink/40">Try a different search term.</p>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {filtered.map((item) =>
            tab === 'services' ? (
              <button
                key={item._id}
                type="button"
                onClick={() => openService(item)}
                className="group flex overflow-hidden rounded-3xl border border-forest-900/10 bg-white text-left transition hover:border-forest-900/20 hover:shadow-soft"
              >
                <img
                  src={item.image}
                  alt=""
                  className="h-auto w-28 shrink-0 object-cover sm:w-36"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="flex items-center gap-1.5 text-[0.6rem] font-extrabold uppercase tracking-wider text-forest-400">
                        <Icon name={item.icon} size={12} />
                        {item.slug}
                      </span>
                      <h3 className="mt-1 truncate text-sm font-extrabold text-forest-900">
                        {item.title}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[0.55rem] font-extrabold uppercase tracking-wider ${
                        item.active
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.active ? 'Live' : 'Hidden'}
                    </span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-[0.68rem] leading-5 text-ink/45">
                    {item.shortDescription}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[0.62rem] font-semibold text-ink/30">
                      {item.features?.length || 0} features · order {item.order}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold text-forest-600">
                      Edit
                      <Icon name="Pencil" size={12} />
                    </span>
                  </div>
                </div>
              </button>
            ) : (
              <button
                key={item._id}
                type="button"
                onClick={() => openLocation(item)}
                className="group flex overflow-hidden rounded-3xl border border-forest-900/10 bg-white text-left transition hover:border-forest-900/20 hover:shadow-soft"
              >
                <img
                  src={item.image}
                  alt=""
                  className="h-auto w-24 shrink-0 object-cover sm:w-32"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="flex items-center gap-1.5 text-[0.6rem] font-extrabold uppercase tracking-wider text-forest-400">
                        <Icon name="MapPin" size={12} />
                        {item.slug}
                      </span>
                      <h3 className="mt-1 truncate text-sm font-extrabold text-forest-900">
                        {item.name}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[0.55rem] font-extrabold uppercase tracking-wider ${
                        item.active
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.active ? 'Live' : 'Hidden'}
                    </span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-[0.68rem] leading-5 text-ink/45">
                    {item.title}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[0.62rem] font-semibold text-ink/30">
                      {item.areas?.length || 0} areas · order {item.order}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold text-forest-600">
                      Edit
                      <Icon name="Pencil" size={12} />
                    </span>
                  </div>
                </div>
              </button>
            ),
          )}
        </div>
      )}

      <p className="mt-4 flex items-start gap-2 text-[0.68rem] leading-5 text-ink/35">
        <Icon name="ShieldCheck" size={14} className="mt-0.5 shrink-0 text-forest-500" />
        Slugs and page routes are fixed to protect existing links and search rankings. Editing text
        or images does not change the URL.
      </p>

      <Drawer
        open={Boolean(editing)}
        onClose={closeDrawer}
        title={editing?.type === 'services' ? 'Edit service' : 'Edit location'}
        subtitle={editing ? `/${editing.type === 'services' ? 'solutions' : 'locations'}/${editing.item.slug}` : ''}
        width="max-w-2xl"
        footer={
          form ? (
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeDrawer}
                disabled={saving}
                className="admin-btn border border-forest-900/15 bg-white text-forest-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="content-edit-form"
                disabled={saving}
                className="admin-btn bg-forest-900 text-white hover:bg-forest-800"
              >
                {saving ? (
                  <Icon name="Loader2" size={16} className="animate-spin" />
                ) : (
                  <Icon name="Save" size={16} />
                )}
                Save changes
              </button>
            </div>
          ) : null
        }
      >
        {form && editing && (
          <form id="content-edit-form" onSubmit={handleSave} className="space-y-5">
            {saveError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                {saveError}
              </div>
            )}

            {editing.type === 'services' ? (
              <>
                <div>
                  <label htmlFor="service-title" className="admin-label">
                    Title
                  </label>
                  <input
                    id="service-title"
                    type="text"
                    value={form.title}
                    maxLength={80}
                    onChange={(event) =>
                      setForm((previous) => ({ ...previous, title: event.target.value }))
                    }
                    className="admin-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="service-short" className="admin-label">
                    Short description
                  </label>
                  <textarea
                    id="service-short"
                    value={form.shortDescription}
                    maxLength={240}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        shortDescription: event.target.value,
                      }))
                    }
                    className="admin-input min-h-20"
                    required
                  />
                  <p className="mt-1 text-right text-[0.62rem] text-ink/30">
                    {form.shortDescription.length}/240
                  </p>
                </div>
                <div>
                  <label htmlFor="service-description" className="admin-label">
                    Full description
                  </label>
                  <textarea
                    id="service-description"
                    value={form.description}
                    maxLength={800}
                    onChange={(event) =>
                      setForm((previous) => ({ ...previous, description: event.target.value }))
                    }
                    className="admin-input min-h-28"
                    required
                  />
                  <p className="mt-1 text-right text-[0.62rem] text-ink/30">
                    {form.description.length}/800
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="service-icon" className="admin-label">
                      Icon
                    </label>
                    <select
                      id="service-icon"
                      value={form.icon}
                      onChange={(event) =>
                        setForm((previous) => ({ ...previous, icon: event.target.value }))
                      }
                      className="admin-input"
                    >
                      {SERVICE_ICON_OPTIONS.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="service-order" className="admin-label">
                      Display order
                    </label>
                    <input
                      id="service-order"
                      type="number"
                      min="0"
                      max="1000"
                      value={form.order}
                      onChange={(event) =>
                        setForm((previous) => ({ ...previous, order: event.target.value }))
                      }
                      className="admin-input"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="service-image" className="admin-label">
                    Image path or URL
                  </label>
                  <input
                    id="service-image"
                    type="text"
                    list="content-image-options"
                    value={form.image}
                    maxLength={300}
                    onChange={(event) =>
                      setForm((previous) => ({ ...previous, image: event.target.value }))
                    }
                    className="admin-input"
                    required
                  />
                  <datalist id="content-image-options">
                    {images.map((image) => (
                      <option key={image} value={image} />
                    ))}
                  </datalist>
                  <p className="mt-1 text-[0.62rem] text-ink/35">
                    Use one of the existing site images or a hosted image URL.
                  </p>
                </div>
                <div>
                  <label htmlFor="service-bestfor" className="admin-label">
                    Best for
                  </label>
                  <input
                    id="service-bestfor"
                    type="text"
                    value={form.bestFor}
                    maxLength={160}
                    onChange={(event) =>
                      setForm((previous) => ({ ...previous, bestFor: event.target.value }))
                    }
                    className="admin-input"
                  />
                </div>
                <StringListEditor
                  label="Key features"
                  values={form.features}
                  onChange={(values) => setForm((previous) => ({ ...previous, features: values }))}
                  placeholder="e.g. Free roof and load assessment"
                  addLabel="Add feature"
                />
              </>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="location-name" className="admin-label">
                      City name
                    </label>
                    <input
                      id="location-name"
                      type="text"
                      value={form.name}
                      maxLength={80}
                      onChange={(event) =>
                        setForm((previous) => ({ ...previous, name: event.target.value }))
                      }
                      className="admin-input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="location-order" className="admin-label">
                      Display order
                    </label>
                    <input
                      id="location-order"
                      type="number"
                      min="0"
                      max="1000"
                      value={form.order}
                      onChange={(event) =>
                        setForm((previous) => ({ ...previous, order: event.target.value }))
                      }
                      className="admin-input"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="location-title" className="admin-label">
                    Page heading
                  </label>
                  <input
                    id="location-title"
                    type="text"
                    value={form.title}
                    maxLength={160}
                    onChange={(event) =>
                      setForm((previous) => ({ ...previous, title: event.target.value }))
                    }
                    className="admin-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="location-intro" className="admin-label">
                    Short intro
                  </label>
                  <textarea
                    id="location-intro"
                    value={form.intro}
                    maxLength={240}
                    onChange={(event) =>
                      setForm((previous) => ({ ...previous, intro: event.target.value }))
                    }
                    className="admin-input min-h-20"
                  />
                </div>
                <div>
                  <label htmlFor="location-description" className="admin-label">
                    Description
                  </label>
                  <textarea
                    id="location-description"
                    value={form.description}
                    maxLength={1500}
                    onChange={(event) =>
                      setForm((previous) => ({ ...previous, description: event.target.value }))
                    }
                    className="admin-input min-h-32"
                    required
                  />
                  <p className="mt-1 text-right text-[0.62rem] text-ink/30">
                    {form.description.length}/1500
                  </p>
                </div>
                <div>
                  <label htmlFor="location-image" className="admin-label">
                    Image path or URL
                  </label>
                  <input
                    id="location-image"
                    type="text"
                    list="content-image-options"
                    value={form.image}
                    maxLength={300}
                    onChange={(event) =>
                      setForm((previous) => ({ ...previous, image: event.target.value }))
                    }
                    className="admin-input"
                  />
                </div>
                <div className="rounded-2xl border border-forest-900/10 bg-mist/60 p-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.13em] text-ink/40">
                    Search engine listing
                  </h3>
                  <div className="mt-3 space-y-4">
                    <div>
                      <label htmlFor="location-meta-title" className="admin-label">
                        Meta title
                      </label>
                      <input
                        id="location-meta-title"
                        type="text"
                        value={form.metaTitle}
                        maxLength={200}
                        onChange={(event) =>
                          setForm((previous) => ({ ...previous, metaTitle: event.target.value }))
                        }
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="location-meta-description" className="admin-label">
                        Meta description
                      </label>
                      <textarea
                        id="location-meta-description"
                        value={form.metaDescription}
                        maxLength={320}
                        onChange={(event) =>
                          setForm((previous) => ({
                            ...previous,
                            metaDescription: event.target.value,
                          }))
                        }
                        className="admin-input min-h-20"
                      />
                      <p className="mt-1 text-right text-[0.62rem] text-ink/30">
                        {form.metaDescription.length}/320
                      </p>
                    </div>
                  </div>
                </div>
                <StringListEditor
                  label="Highlights"
                  values={form.highlights}
                  onChange={(values) =>
                    setForm((previous) => ({ ...previous, highlights: values }))
                  }
                  placeholder="e.g. Residential rooftop solar with subsidy guidance"
                  addLabel="Add highlight"
                />
                <StringListEditor
                  label="Service areas"
                  values={form.areas}
                  onChange={(values) => setForm((previous) => ({ ...previous, areas: values }))}
                  placeholder="e.g. Rau"
                  maxItems={15}
                  addLabel="Add area"
                />
              </>
            )}

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-forest-900/10 px-4 py-3">
              <span>
                <span className="block text-sm font-bold text-forest-900">Show on website</span>
                <span className="mt-0.5 block text-[0.65rem] text-ink/40">
                  Inactive content is hidden from public pages.
                </span>
              </span>
              <span className="relative inline-flex">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(event) =>
                    setForm((previous) => ({ ...previous, active: event.target.checked }))
                  }
                  className="peer sr-only"
                />
                <span className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-forest-600" />
                <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
              </span>
            </label>
          </form>
        )}
      </Drawer>
    </div>
  )
}
