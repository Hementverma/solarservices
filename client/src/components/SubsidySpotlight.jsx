import { Link } from 'react-router-dom'
import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import { useContent } from '@/context/ContentContext'
import { subsidySlabs } from '@/data/subsidy'
import { buildWhatsAppUrl, formatCurrency } from '@/lib/utils'

const maxSubsidy = Math.max(...subsidySlabs.map((slab) => slab.amount))

const eligibilityPoints = [
  'Available for eligible residential rooftop solar consumers.',
  'Final subsidy depends on applicable government guidelines and official verification.',
  `Maximum central subsidy is ${formatCurrency(maxSubsidy)} for systems of 3 kW or above.`,
  'Commercial and industrial connections are not eligible for this residential subsidy.',
]

const cardDetails = [
  { icon: 'Home', note: 'For smaller homes' },
  { icon: 'Zap', note: 'For higher daytime use' },
  { icon: 'Sun', note: 'Maximum support tier' },
]

export default function SubsidySpotlight() {
  const { contact } = useContent()
  const whatsappUrl = buildWhatsAppUrl(
    contact.whatsapp,
    'Hello Ramesh Solar Services, I want to check my PM Surya Ghar subsidy eligibility and get a free solar consultation.',
  )

  return (
    <section className="relative overflow-hidden bg-cream py-14 sm:py-20">
      <div className="pointer-events-none absolute -left-28 top-8 h-80 w-80 rounded-full bg-solar-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-forest-500/10 blur-3xl" />
      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <Reveal>
            <span className="eyebrow">
              <Icon name="BadgeIndianRupee" size={14} className="text-forest-600" />
              PM Surya Ghar subsidy
            </span>
            <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.16em] text-forest-700">
              Ab Solar Lagwana Hua Aur Bhi Aasaan!
            </p>
            <h2 className="mt-3 max-w-xl font-display text-4xl leading-[1.03] tracking-[-0.02em] text-forest-950 sm:text-5xl">
              PM Surya Ghar Yojana ke tahat{' '}
              <span className="text-forest-700">{formatCurrency(maxSubsidy)} tak</span> ki Central
              Government Subsidy
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink/60">
              Apne ghar par rooftop solar install karwayein aur eligible residential consumers ke
              liye available government subsidy ka benefit samjhein.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/pm-surya-ghar-subsidy#subsidy-estimator" className="btn-primary">
                Calculate My Subsidy
                <Icon name="ArrowRight" size={18} />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <Icon name="MessageCircle" size={17} className="text-forest-600" />
                Get Free Solar Consultation
              </a>
            </div>

            <p className="mt-5 flex items-start gap-2 text-[0.68rem] leading-5 text-ink/45">
              <Icon name="ShieldCheck" size={15} className="mt-0.5 shrink-0 text-forest-600" />
              <span>
                <strong className="font-extrabold text-ink/65">
                  Ramesh Solar Services is a private solar service provider.
                </strong>{' '}
                This is not a government website and subsidy approval is not guaranteed.
              </span>
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {subsidySlabs.map((slab, index) => {
              const featured = index === subsidySlabs.length - 1
              const detail = cardDetails[index]
              return (
                <Reveal key={slab.capacity} delay={0.08 + index * 0.06}>
                  <div
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-5 transition duration-300 hover:-translate-y-1 ${
                      featured
                        ? 'border-forest-900 bg-forest-950 text-white shadow-[0_24px_60px_-28px_rgba(18,59,42,0.75)]'
                        : 'border-forest-900/10 bg-white text-forest-950 shadow-soft hover:border-forest-900/20'
                    }`}
                  >
                    <div
                      className={`absolute inset-x-0 top-0 h-1 ${
                        featured ? 'bg-solar-400' : 'bg-gradient-to-r from-forest-600 to-solar-400'
                      }`}
                    />
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-2xl ${
                          featured
                            ? 'bg-solar-400 text-forest-950'
                            : 'bg-forest-50 text-forest-700'
                        }`}
                      >
                        <Icon name={detail.icon} size={19} />
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[0.55rem] font-extrabold uppercase tracking-[0.14em] ${
                          featured
                            ? 'bg-white/10 text-solar-300'
                            : 'bg-forest-50 text-forest-600'
                        }`}
                      >
                        {featured ? 'Maximum' : 'Indicative'}
                      </span>
                    </div>

                    <p
                      className={`mt-5 text-xs font-extrabold uppercase tracking-[0.14em] ${
                        featured ? 'text-white/55' : 'text-ink/40'
                      }`}
                    >
                      {slab.label}
                    </p>
                    <p
                      className={`mt-2 font-display text-3xl leading-none tracking-tight ${
                        featured ? 'text-solar-400' : 'text-forest-900'
                      }`}
                    >
                      {formatCurrency(slab.amount)}
                    </p>
                    <p
                      className={`mt-3 text-[0.68rem] leading-5 ${
                        featured ? 'text-white/55' : 'text-ink/45'
                      }`}
                    >
                      {detail.note}. Central financial assistance for eligible residential systems.
                    </p>
                    <div
                      className={`mt-auto pt-5 text-[0.6rem] font-bold uppercase tracking-[0.14em] ${
                        featured ? 'text-solar-300/80' : 'text-forest-600/70'
                      }`}
                    >
                      {featured ? '3 kW and above' : 'Eligible homes'}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 grid gap-6 rounded-4xl border border-forest-900/10 bg-white p-6 shadow-soft sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest-50 text-forest-700">
                  <Icon name="CircleHelp" size={18} />
                </span>
                <h3 className="text-sm font-extrabold text-forest-900">Eligibility at a glance</h3>
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {eligibilityPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-xs leading-5 text-ink/55">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-forest-50 text-forest-700">
                      <Icon name="Check" size={11} strokeWidth={2.4} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/pm-surya-ghar-subsidy"
              className="btn-secondary w-full justify-center text-center lg:w-auto lg:max-w-[15rem]"
            >
              View Complete PM Surya Ghar Subsidy Details
              <Icon name="ArrowUpRight" size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
