import { Link } from 'react-router-dom'
import Icon from '@/components/Icon'
import { useContent } from '@/context/ContentContext'
import { buildWhatsAppUrl, normalizePhoneHref } from '@/lib/utils'

export default function CTASection({
  title = 'Ready to make your roof work harder?',
  description = 'Get a site-specific solar proposal with clear system sizing, component details and indicative savings.',
  eyebrow = 'Your next step',
}) {
  const { contact } = useContent()
  const waUrl = buildWhatsAppUrl(
    contact.whatsapp || contact.phoneRaw,
    'Hello Ramesh Solar Services, I would like to schedule a free solar consultation.',
  )

  return (
    <section className="relative overflow-hidden bg-solar-400">
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_1px_1px,#123B2A_1px,transparent_0)] [background-size:22px_22px]" />
      <div className="pointer-events-none absolute -right-32 -top-40 h-80 w-80 rounded-full bg-white/30 blur-3xl" />
      <div className="container-page relative py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest-950/15 bg-forest-950/5 px-3.5 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-forest-950/70">
              {eyebrow}
            </span>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.05] text-forest-950 sm:text-5xl lg:text-[3.6rem]">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-forest-950/65 sm:text-base">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <Link to="/contact" className="btn-dark w-full">
              Get Your Free Solar Consultation
              <Icon name="ArrowRight" size={18} />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={normalizePhoneHref(contact.phoneRaw || contact.phone)}
                className="btn-white"
              >
                <Icon name="Phone" size={16} />
                Call us
              </a>
              <a href={waUrl} target="_blank" rel="noreferrer" className="btn-white">
                <Icon name="MessageCircle" size={16} />
                WhatsApp
              </a>
            </div>
            <p className="text-center text-[0.65rem] font-semibold text-forest-950/45 lg:text-left">
              Site inspection first · Transparent itemised quote · No obligation
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
