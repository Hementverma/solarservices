import { Link } from 'react-router-dom'
import Icon from '@/components/Icon'
import Logo from '@/components/Logo'
import { useContent } from '@/context/ContentContext'
import { buildWhatsAppUrl, normalizePhoneHref } from '@/lib/utils'

const companyLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Our process', to: '/about#process' },
  { label: 'Solar solutions', to: '/solutions' },
  { label: 'Brands we work with', to: '/brands' },
  { label: 'Solar calculator', to: '/calculator' },
  { label: 'PM Surya Ghar subsidy', to: '/pm-surya-ghar-subsidy' },
]

const supportLinks = [
  { label: 'Contact us', to: '/contact' },
  { label: 'Service locations', to: '/locations' },
  { label: 'Frequently asked questions', to: '/contact#faq' },
  { label: 'Subsidy eligibility check', to: '/pm-surya-ghar-subsidy#eligibility' },
  { label: 'Privacy policy', to: '/privacy-policy' },
  { label: 'Admin login', to: '/admin/login' },
]

export default function Footer() {
  const { contact, services, locations } = useContent()
  const year = new Date().getFullYear()
  const whatsappUrl = buildWhatsAppUrl(
    contact.whatsapp || contact.phoneRaw,
    'Hello Ramesh Solar Services, I would like to know more about solar installation.',
  )

  return (
    <footer className="relative overflow-hidden bg-forest-950 text-white">
      <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-solar-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-52 left-1/4 h-96 w-96 rounded-full bg-forest-600/30 blur-3xl" />
      <div className="container-page relative py-16 pb-28 sm:py-20 md:pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.7fr_0.8fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              Practical, premium solar solutions for homes, businesses, industries and farms
              across Madhya Pradesh. From the first site visit to long-term support.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Site inspection', 'Transparent quotes', 'After-sales support'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-white/60"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-solar-300">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-solar-300">
              Solutions
            </h3>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/solutions/${service.slug}`}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-solar-300">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={normalizePhoneHref(contact.phoneRaw || contact.phone)}
                  className="flex items-start gap-3 text-white/65 transition hover:text-white"
                >
                  <Icon name="Phone" size={17} className="mt-0.5 shrink-0 text-solar-400" />
                  <span>{contact.phone}</span>
                </a>
              </li>
              {contact.phone2 && (
                <li>
                  <a
                    href={normalizePhoneHref(contact.phone2Raw || contact.phone2)}
                    className="flex items-start gap-3 text-white/65 transition hover:text-white"
                  >
                    <Icon name="PhoneCall" size={17} className="mt-0.5 shrink-0 text-solar-400" />
                    <span>{contact.phone2}</span>
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-3 text-white/65 transition hover:text-white"
                >
                  <Icon name="Mail" size={17} className="mt-0.5 shrink-0 text-solar-400" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/65">
                <Icon name="MapPin" size={17} className="mt-0.5 shrink-0 text-solar-400" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-start gap-3 text-white/65">
                <Icon name="Clock" size={17} className="mt-0.5 shrink-0 text-solar-400" />
                <span>{contact.hours}</span>
              </li>
            </ul>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
            >
              <Icon name="MessageCircle" size={15} className="text-solar-400" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/45">
              <span>Service areas:</span>
              {locations.map((location, index) => (
                <span key={location.slug} className="flex items-center gap-2">
                  <Link to={`/locations/${location.slug}`} className="hover:text-white/80">
                    {location.name}
                  </Link>
                  {index < locations.length - 1 && <span className="text-solar-400/60">·</span>}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/45">
              {supportLinks.map((link) => (
                <Link key={link.to} to={link.to} className="transition hover:text-white/80">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <p className="mt-6 max-w-4xl text-[0.68rem] leading-5 text-white/35">
            Brand names including Tata Power Solar, Waaree, Havells, Luminous and Polycab are used
            only to indicate product categories and brands we may work with. All trademarks belong
            to their respective owners. Ramesh Solar Services does not claim to be an authorised
            dealer or official partner of any brand unless confirmed separately in writing. Product
            availability is subject to project specification. Solar savings and generation figures
            on this website are indicative estimates, not guarantees.
          </p>

          <div className="mt-6 flex flex-col gap-3 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} Ramesh Solar Services. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Power Your Future With Solar.
              <Icon name="Sun" size={13} className="text-solar-400" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
