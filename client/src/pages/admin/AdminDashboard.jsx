import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '@/components/SEO'
import Icon from '@/components/Icon'
import Logo from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'
import OverviewPanel from './OverviewPanel'
import EnquiriesPanel from './EnquiriesPanel'
import ContentPanel from './ContentPanel'
import ContactSettingsPanel from './ContactSettingsPanel'
import CalculatorSettingsPanel from './CalculatorSettingsPanel'
import AccountPanel from './AccountPanel'

const navigation = [
  { key: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { key: 'enquiries', label: 'Enquiries', icon: 'Inbox' },
  { key: 'content', label: 'Site content', icon: 'FileText' },
  { key: 'contact', label: 'Contact details', icon: 'Phone' },
  { key: 'calculator', label: 'Calculator', icon: 'SlidersHorizontal' },
  { key: 'account', label: 'Account', icon: 'User' },
]

const pageMeta = {
  overview: {
    title: 'Dashboard overview',
    description: 'Track new leads, pipeline health and recent activity.',
  },
  enquiries: {
    title: 'Enquiries',
    description: 'Review, filter and update every customer enquiry.',
  },
  content: {
    title: 'Site content',
    description: 'Edit service pages and city landing pages.',
  },
  contact: {
    title: 'Contact details',
    description: 'Manage the phone, WhatsApp, email and address shown on the website.',
  },
  calculator: {
    title: 'Calculator settings',
    description: 'Manage the assumptions behind estimated solar savings.',
  },
  account: {
    title: 'Account',
    description: 'Review your account and update your password.',
  },
}

export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [openEnquiryId, setOpenEnquiryId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [dataVersion, setDataVersion] = useState(0)

  const meta = pageMeta[activeTab] || pageMeta.overview

  const goTo = (tab, enquiryId = null) => {
    setActiveTab(tab)
    setOpenEnquiryId(tab === 'enquiries' ? enquiryId : null)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
      navigate('/admin/login', { replace: true })
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <>
      <SEO
        title="Admin Dashboard"
        description="Ramesh Solar Services admin dashboard."
        path="/admin"
        noindex
      />
      <div className="min-h-screen bg-mist lg:grid lg:grid-cols-[272px_minmax(0,1fr)]">
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-forest-950/50 backdrop-blur-sm lg:hidden"
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-forest-950 text-white transition-transform duration-300 lg:static lg:z-auto lg:h-screen lg:w-auto lg:translate-x-0 lg:sticky lg:top-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <Link to="/" aria-label="Ramesh Solar Services website">
              <Logo light />
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/60 lg:hidden"
              aria-label="Close navigation"
            >
              <Icon name="X" size={17} />
            </button>
          </div>

          <div className="mx-5 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5">
            <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.2em] text-solar-400">
              Admin workspace
            </p>
            <p className="mt-0.5 text-[0.68rem] text-white/40">Secure lead and content management</p>
          </div>

          <nav className="mt-5 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
            {navigation.map((item) => {
              const active = activeTab === item.key
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => goTo(item.key)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[0.8rem] font-bold transition ${
                    active
                      ? 'bg-solar-400 text-forest-950'
                      : 'text-white/55 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon
                    name={item.icon}
                    size={17}
                    className={active ? 'text-forest-900' : 'text-white/40'}
                  />
                  {item.label}
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-forest-900/50" />}
                </button>
              )
            })}
          </nav>

          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-3 rounded-2xl px-2 py-2">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-extrabold text-solar-400">
                {(admin?.name || 'A').slice(0, 1).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-extrabold text-white">
                  {admin?.name || 'Admin'}
                </span>
                <span className="block truncate text-[0.62rem] text-white/35">{admin?.email}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[0.78rem] font-bold text-white/45 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
            >
              {loggingOut ? (
                <Icon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <Icon name="LogOut" size={16} />
              )}
              Sign out
            </button>
            <p className="mt-2 px-2 text-[0.55rem] text-white/20">
              © {new Date().getFullYear()} Ramesh Solar Services
            </p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-30 border-b border-forest-900/10 bg-mist/90 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-forest-900/10 bg-white text-forest-800 lg:hidden"
                aria-label="Open navigation"
              >
                <Icon name="Menu" size={19} />
              </button>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-forest-500">
                  Ramesh Solar · Admin
                </p>
                <h1 className="truncate text-lg font-extrabold text-forest-900">{meta.title}</h1>
              </div>
              <Link
                to="/"
                className="hidden items-center gap-2 rounded-xl border border-forest-900/10 bg-white px-3.5 py-2.5 text-xs font-bold text-forest-800 transition hover:border-forest-900/20 sm:inline-flex"
              >
                <Icon name="ArrowUpRight" size={15} />
                View website
              </Link>
              <button
                type="button"
                onClick={() => goTo('account')}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest-900 text-sm font-extrabold text-solar-400 lg:hidden"
                aria-label="Open account settings"
              >
                {(admin?.name || 'A').slice(0, 1).toUpperCase()}
              </button>
            </div>
          </header>

          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            <div className="mx-auto w-full max-w-[1180px]">
              <div className="mb-5 hidden sm:block">
                <p className="text-xs text-ink/40">{meta.description}</p>
              </div>

              {activeTab === 'overview' && (
                <OverviewPanel onNavigate={goTo} refreshKey={dataVersion} />
              )}
              {activeTab === 'enquiries' && (
                <EnquiriesPanel
                  key={openEnquiryId || 'enquiries'}
                  initialOpenId={openEnquiryId}
                  onDataChanged={() => setDataVersion((value) => value + 1)}
                />
              )}
              {activeTab === 'content' && <ContentPanel />}
              {activeTab === 'contact' && <ContactSettingsPanel />}
              {activeTab === 'calculator' && <CalculatorSettingsPanel />}
              {activeTab === 'account' && <AccountPanel />}

              <p className="mt-8 flex items-center justify-center gap-2 text-[0.62rem] text-ink/30">
                <Icon name="ShieldCheck" size={12} />
                Ramesh Solar Services admin · Session protected by a secure HttpOnly cookie
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
