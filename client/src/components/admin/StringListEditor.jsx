import Icon from '@/components/Icon'

export default function StringListEditor({
  label,
  values = [],
  onChange,
  placeholder = 'Add an item',
  maxItems = 10,
  maxLength = 160,
  addLabel = 'Add item',
}) {
  const update = (index, value) => {
    const next = values.map((item, itemIndex) => (itemIndex === index ? value : item))
    onChange(next)
  }

  const remove = (index) => {
    onChange(values.filter((_item, itemIndex) => itemIndex !== index))
  }

  const add = () => {
    if (values.length >= maxItems) return
    onChange([...values, ''])
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="admin-label mb-0">{label}</span>
        <span className="text-[0.62rem] font-semibold text-ink/30">
          {values.length}/{maxItems}
        </span>
      </div>
      <div className="mt-2 space-y-2">
        {values.length === 0 && (
          <p className="rounded-xl border border-dashed border-forest-900/15 px-3 py-3 text-xs text-ink/35">
            No items added yet.
          </p>
        )}
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              maxLength={maxLength}
              onChange={(event) => update(index, event.target.value)}
              placeholder={placeholder}
              className="admin-input"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-forest-900/10 text-ink/40 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              aria-label={`Remove item ${index + 1}`}
            >
              <Icon name="Trash2" size={15} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        disabled={values.length >= maxItems}
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-forest-600 transition hover:text-forest-800 disabled:opacity-40"
      >
        <Icon name="Plus" size={14} />
        {addLabel}
      </button>
    </div>
  )
}
