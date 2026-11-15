import { useState } from 'react'
import Icon from '@/components/Icon'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'
import { formatDate, formatDateTime } from '@/lib/utils'

export default function AccountPanel() {
  const { admin } = useAuth()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [show, setShow] = useState({ current: false, next: false, confirm: false })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [flash, setFlash] = useState('')

  const update = (name, value) => setForm((previous) => ({ ...previous, [name]: value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setFlash('')

    if (form.newPassword.length < 8) {
      setError('New password must be at least 8 characters long.')
      return
    }
    if (form.newPassword !== form.confirmPassword) {
      setError('The new password and confirmation do not match.')
      return
    }
    if (form.newPassword === form.currentPassword) {
      setError('Choose a new password that is different from your current password.')
      return
    }

    setSaving(true)
    try {
      const response = await api.put('/api/auth/password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setFlash(response.message)
      window.setTimeout(() => setFlash(''), 5000)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  const toggle = (key) => setShow((previous) => ({ ...previous, [key]: !previous[key] }))

  return (
    <div>
      {flash && (
        <div className="mb-4 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          <Icon name="CheckCircle2" size={17} />
          {flash}
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-forest-900/10 bg-white p-5">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-forest-900 font-display text-2xl text-solar-400">
                {(admin?.name || 'A').slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-base font-extrabold text-forest-900">
                  {admin?.name || 'Admin'}
                </h2>
                <p className="truncate text-xs text-ink/45">{admin?.email}</p>
              </div>
            </div>
            <dl className="mt-5 space-y-3">
              {[
                {
                  label: 'Role',
                  value: admin?.role === 'admin' ? 'Administrator' : admin?.role || 'Staff',
                },
                { label: 'Last sign in', value: formatDateTime(admin?.lastLoginAt) },
                { label: 'Account created', value: formatDate(admin?.createdAt) },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 border-b border-forest-900/8 pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-xs text-ink/40">{item.label}</dt>
                  <dd className="text-right text-xs font-bold text-forest-900">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-3xl border border-forest-900/10 bg-forest-900 p-5 text-white">
            <Icon name="ShieldCheck" size={20} className="text-solar-400" />
            <h3 className="mt-3 text-sm font-extrabold">Account security</h3>
            <ul className="mt-2 space-y-1.5 text-[0.68rem] leading-5 text-white/50">
              <li>Use a unique password that is not shared with other services.</li>
              <li>Never share admin credentials over chat or email.</li>
              <li>Keep the server environment file private and backed up securely.</li>
              <li>Replace the default seeded password before going live.</li>
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-forest-900/10 bg-white p-5 sm:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-forest-900">Change password</h2>
              <p className="mt-1 text-xs leading-5 text-ink/40">
                Enter your current password, then choose a new one of at least 8 characters.
              </p>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-forest-50 text-forest-700">
              <Icon name="Lock" size={18} />
            </span>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
              {error}
            </div>
          )}

          <div className="mt-5 space-y-4">
            {[
              {
                key: 'currentPassword',
                id: 'current-password',
                label: 'Current password',
                autoComplete: 'current-password',
                placeholder: 'Enter your current password',
              },
              {
                key: 'newPassword',
                id: 'new-password',
                label: 'New password',
                autoComplete: 'new-password',
                placeholder: 'At least 8 characters',
              },
              {
                key: 'confirmPassword',
                id: 'confirm-password',
                label: 'Confirm new password',
                autoComplete: 'new-password',
                placeholder: 'Re-enter the new password',
              },
            ].map((field) => {
              const showKey =
                field.key === 'currentPassword' ? 'current' : field.key === 'newPassword' ? 'next' : 'confirm'
              return (
                <div key={field.key}>
                  <label htmlFor={field.id} className="admin-label">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      id={field.id}
                      type={show[showKey] ? 'text' : 'password'}
                      autoComplete={field.autoComplete}
                      value={form[field.key]}
                      onChange={(event) => update(field.key, event.target.value)}
                      placeholder={field.placeholder}
                      className="admin-input pr-12"
                      required
                      minLength={field.key === 'currentPassword' ? 1 : 8}
                      maxLength={72}
                    />
                    <button
                      type="button"
                      onClick={() => toggle(showKey)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-ink/35 transition hover:text-forest-800"
                      aria-label={show[showKey] ? 'Hide password' : 'Show password'}
                    >
                      <Icon name={show[showKey] ? 'EyeOff' : 'Eye'} size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-forest-900/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.65rem] leading-4 text-ink/35">
              Existing sessions remain valid until they expire.
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
              Update password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
