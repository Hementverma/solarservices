import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '@/components/Icon'
import Logo from '@/components/Logo'
import { useContent } from '@/context/ContentContext'
import { normalizePhoneHref } from '@/lib/utils'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Solutions', to: '/solutions', children: true },
  { label: 'Brands', to: '/brands' },
  { label: 'Calculator', to: '/calculator' },
  { label: 'Subsidy', to: '/pm-surya-ghar-subsidy' },
  { label: 'Locations', to: '/locations' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const { contact, services } = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setSolutionsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className="hidden bg-forest-950 text-white/70 md:block">
        <div className="container-page flex h-9 items-center justify-between text-[0.68rem] font-semibold tracking-wide">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Icon name="MapPin" size={13} className="text-solar-400" />
              Serving Indore · Bhopal · Sehore · Ujjain · Dewas · Rajgarh
            </span>
            <span className="flex items-center gap-1.5 text-white/50">
              <Icon name="Clock" size={13} className="text-solar-400" />
              {contact.hours}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={normalizePhoneHref(contact.phoneRaw || contact.phone)}
              className="flex items-center gap-1.5 transition hover:text-solar-300"
            >
              <Icon name="Phone" size={13} className="text-solar-400" />
              {contact.phone}
            </a>
            {contact.phone2 && (
              <a
                href={normalizePhoneHref(contact.phone2Raw || contact.phone2)}
                className="flex items-center gap-1.5 transition hover:text-solar-300"
              >
                <Icon name="PhoneCall" size={13} className="text-solar-400" />
                {contact.phone2}
              </a>
            )}
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-1.5 transition hover:text-solar-300"
            >
              <Icon name="Mail" size={13} className="text-solar-400" />
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-forest-900/10 bg-cream/95 shadow-[0_12px_40px_-30px_rgba(18,59,42,0.5)] backdrop-blur-xl'
            : 'border-transparent bg-cream/85 backdrop-blur-md'
        }`}
      >
        <div className="container-page flex h-[76px] items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
            {links.map((link) =>
              link.children ? (
                <div key={link.to} className="group relative">
                  <NavLink to={link.to} className="nav-link inline-flex items-center gap-1">
                    {link.label}
                    <Icon name="ChevronDown" size={13} className="transition group-hover:rotate-180" />
                  </NavLink>
                  <div className="invisible absolute left-1/2 top-full z-50 w-[500px] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="rounded-3xl border border-forest-900/10 bg-white p-3 shadow-card">
                      <div className="grid grid-cols-2 gap-1">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            to={`/solutions/${service.slug}`}
                            className="group/item flex items-start gap-3 rounded-2xl p-3.5 transition hover:bg-forest-50"
                          >
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest-700 transition group-hover/item:bg-forest-900 group-hover/item:text-solar-400">
                              <Icon name={service.icon} size={18} />
                            </span>
                            <span>
                              <span className="block text-sm font-bold text-forest-900">
                                {service.title}
                              </span>
                              <span className="mt-0.5 block line-clamp-2 text-xs leading-5 text-ink/55">
                                {service.shortDescription}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        to="/solutions"
                        className="mt-2 flex items-center justify-between rounded-2xl bg-forest-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-forest-800"
                      >
                        Compare all solar solutions
                        <Icon name="ArrowRight" size={17} className="text-solar-400" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink key={link.to} to={link.to} end={link.to === '/'} className="nav-link">
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/contact" className="btn-primary btn-sm">
              Free Consultation
              <Icon name="ArrowUpRight" size={16} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-forest-900/15 bg-white text-forest-900 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <Icon name={open ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-forest-950/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-0 top-[76px] max-h-[calc(100vh-76px)] overflow-y-auto rounded-b-4xl bg-cream px-5 pb-8 pt-4 shadow-card"
              onClick={(event) => event.stopPropagation()}
            >
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {links.map((link) =>
                  link.children ? (
                    <div key={link.to} className="border-b border-forest-900/8">
                      <button
                        type="button"
                        onClick={() => setSolutionsOpen((value) => !value)}
                        className="flex w-full items-center justify-between py-4 text-left text-lg font-bold text-forest-900"
                        aria-expanded={solutionsOpen}
                      >
                        Solar Solutions
                        <Icon
                          name="ChevronDown"
                          size={19}
                          className={`transition-transform ${solutionsOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {solutionsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-2 pb-4">
                              {services.map((service) => (
                                <Link
                                  key={service.slug}
                                  to={`/solutions/${service.slug}`}
                                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-forest-900"
                                >
                                  <Icon name={service.icon} size={18} className="text-forest-600" />
                                  {service.title}
                                </Link>
                              ))}
                              <Link
                                to="/solutions"
                                className="px-4 text-sm font-bold text-forest-600 underline underline-offset-4"
                              >
                                View all solutions
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === '/'}
                      className="border-b border-forest-900/8 py-4 text-lg font-bold text-forest-900"
                    >
                      {link.label}
                    </NavLink>
                  ),
                )}
              </nav>

              <div className="mt-6 grid gap-2">
                <Link to="/contact" className="btn-primary w-full">
                  Get Free Solar Consultation
                  <Icon name="ArrowRight" size={17} />
                </Link>
                <a
                  href={normalizePhoneHref(contact.phoneRaw || contact.phone)}
                  className="btn-secondary w-full"
                >
                  <Icon name="Phone" size={17} />
                  Call {contact.phone}
                </a>
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-semibold text-ink/50">
                <span>{contact.hours}</span>
                <span className="text-solar-500">·</span>
                <span>Indore · Bhopal · Sehore · Ujjain · Dewas · Rajgarh</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
