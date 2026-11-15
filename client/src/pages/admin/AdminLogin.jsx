import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import SEO from '@/components/SEO'
import Icon from '@/components/Icon'
import Logo from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'

export default function AdminLogin() {
  const { admin, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (admin) return <Navigate to="/admin" replace />

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email.trim(), password)
      const destination = location.state?.from?.startsWith('/admin')
        ? location.state.from
        : '/admin'
      navigate(destination, { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Admin Login"
        description="Secure admin sign in for Ramesh Solar Services."
        path="/admin/login"
        noindex
      />
      <div className="grid min-h-screen bg-cream lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden bg-forest-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <img
            src="/images/hero-solar.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-forest-950/40" />
          <div className="absolute inset-0 hero-grid opacity-40" />
          <div className="relative">
            <Logo light />
          </div>
          <div className="relative max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-solar-300">
              <Icon name="Lock" size={13} />
              Admin workspace
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.02]">
              Manage enquiries.
              <br />
              <span className="italic text-solar-400">Move projects forward.</span>
            </h1>
            <p className="mt-5 text-sm leading-7 text-white/55">
              Track new leads, update enquiry statuses, record internal notes and keep the website
              content current — all from one secure dashboard.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: 'Inbox', title: 'Lead management' },
                { icon: 'Users', title: 'Status tracking' },
                { icon: 'Settings', title: 'Site settings' },
                { icon: 'ShieldCheck', title: 'Secure access' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-3 text-xs font-semibold text-white/65"
                >
                  <Icon name={item.icon} size={16} className="text-solar-400" />
                  {item.title}
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex items-center justify-between text-[0.65rem] text-white/35">
            <span>© {new Date().getFullYear()} Ramesh Solar Services</span>
            <Link to="/" className="inline-flex items-center gap-1.5 transition hover:text-white/70">
              Back to website
              <Icon name="ArrowUpRight" size={13} />
            </Link>
          </div>
        </div>

        <div className="flex min-h-screen flex-col p-5 sm:p-10">
          <div className="flex items-center justify-between lg:justify-end">
            <div className="lg:hidden">
              <Logo />
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-forest-900/10 bg-white px-3.5 py-2 text-xs font-bold text-forest-800 transition hover:border-forest-900/20"
            >
              <Icon name="ArrowLeft" size={14} />
              Website
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center py-10">
            <div className="w-full max-w-md">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest-900 text-solar-400">
                <Icon name="ShieldCheck" size={26} />
              </span>
              <h2 className="mt-7 font-display text-4xl text-forest-900">Welcome back.</h2>
              <p className="mt-2 text-sm leading-6 text-ink/50">
                Sign in to access the Ramesh Solar Services admin dashboard.
              </p>

              {error && (
                <div
                  role="alert"
                  className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  <Icon name="XCircle" size={18} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-7" noValidate>
                <div>
                  <label htmlFor="admin-email" className="field-label">
                    Email address
                  </label>
                  <div className="relative">
                    <Icon
                      name="Mail"
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/30"
                    />
                    <input
                      id="admin-email"
                      type="email"
                      autoComplete="username"
                      className="field-input pl-11"
                      placeholder="admin@rameshsolar.in"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="admin-password" className="field-label">
                    Password
                  </label>
                  <div className="relative">
                    <Icon
                      name="Lock"
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/30"
                    />
                    <input
                      id="admin-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="field-input px-11"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-ink/35 transition hover:text-forest-800"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={17} />
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
                  {loading ? (
                    <>
                      <Icon name="Loader2" size={18} className="animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign in securely
                      <Icon name="ArrowRight" size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-forest-900/10 bg-white px-4 py-3">
                <Icon name="ShieldCheck" size={16} className="mt-0.5 shrink-0 text-forest-600" />
                <p className="text-[0.68rem] leading-5 text-ink/45">
                  This area is restricted to authorised staff. Sessions are protected with a secure
                  HttpOnly cookie and expire automatically. Do not share your login credentials.
                </p>
              </div>

              <p className="mt-6 text-center text-xs text-ink/40">
                Need help? Contact your website administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
