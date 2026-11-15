import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import CTASection from '@/components/CTASection'
import { brands, SITE_URL } from '@/data/site'

const selectionPoints = [
  {
    title: 'Specification match',
    description:
      'Module technology, inverter type and cable rating must suit your site, load and installation conditions.',
    icon: 'SlidersHorizontal',
  },
  {
    title: 'Warranty clarity',
    description:
      'We explain product warranties, performance guarantees and service terms so you know what is covered.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Serviceability',
    description:
      'Local availability of service support and spare parts matters over the life of your system.',
    icon: 'Wrench',
  },
  {
    title: 'Honest comparison',
    description:
      'We present options with their trade-offs instead of locking you into a single package.',
    icon: 'ReceiptText',
  },
]

const brandCategories = [
  { label: 'Solar modules', icon: 'SunMedium' },
  { label: 'Inverters', icon: 'Zap' },
  { label: 'Batteries & storage', icon: 'BatteryCharging' },
  { label: 'Cables & electricals', icon: 'PlugZap' },
]

export default function Brands() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Solar Brands We Work With',
    url: `${SITE_URL}/brands`,
    description:
      'Information about the solar and electrical brands Ramesh Solar Services may work with, including Tata Power Solar, Waaree, Havells, Luminous and Polycab.',
  }

  return (
    <>
      <SEO
        title="Brands We Work With"
        description="Ramesh Solar Services works with established solar and electrical brands such as Tata Power Solar, Waaree, Havells, Luminous and Polycab, subject to project requirements and availability."
        path="/brands"
        image="/images/ongrid-solar.jpg"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="Brands"
        title="Established brands,"
        accent="chosen for the project."
        description="We specify components from trusted solar and electrical brands based on your project requirements, warranty needs and availability."
        image="/images/ongrid-solar.jpg"
        breadcrumbs={[{ label: 'Brands' }]}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {brandCategories.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/60"
            >
              <Icon name={item.icon} size={14} className="text-solar-400" />
              {item.label}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="section bg-mist">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Brand portfolio"
              title="Components we"
              accent="may work with."
              description="Brand availability varies by project specification. The final bill of materials is confirmed in your quotation."
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {brands.map((brand, index) => (
              <Reveal key={brand.name} delay={index * 0.04}>
                <div className="group relative h-full overflow-hidden rounded-4xl border border-forest-900/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-card">
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-2xl font-display text-2xl ${
                        index === 1
                          ? 'bg-solar-400 text-forest-950'
                          : 'bg-forest-50 text-forest-800'
                      }`}
                    >
                      {brand.name
                        .split(' ')
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                    <Icon name="Sun" size={22} className="text-forest-900/10" />
                  </div>
                  <h2 className="mt-6 text-base font-extrabold leading-snug text-forest-900">
                    {brand.name}
                  </h2>
                  <p className="mt-2 text-xs leading-5 text-ink/45">{brand.note}</p>
                  <div className="mt-6 h-px bg-forest-900/8" />
                  <p className="mt-3 text-[0.6rem] font-extrabold uppercase tracking-[0.15em] text-forest-500">
                    Subject to availability
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-8 rounded-3xl border border-solar-500/20 bg-solar-50 px-5 py-5 sm:px-7">
              <div className="flex items-start gap-3">
                <Icon name="ShieldCheck" size={20} className="mt-0.5 shrink-0 text-solar-700" />
                <p className="text-xs leading-6 text-forest-900/65">
                  <span className="font-extrabold">Important brand disclosure:</span> Brand names and
                  trademarks belong to their respective owners. Ramesh Solar Services does not claim
                  to be an authorised dealer, channel partner or official representative of any brand
                  shown here unless a separate written authorisation exists. Brand logos are not used
                  as official partnership claims. Product availability and pricing are subject to
                  project requirements and market conditions.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow="Our selection process"
                title="A brand name alone"
                accent="is not a system design."
                description="The right components depend on how they work together, how they are installed and how they will be supported. We look at the complete picture."
              />
              <Link to="/solutions" className="btn-dark mt-7">
                Explore solar solutions
                <Icon name="ArrowRight" size={17} />
              </Link>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {selectionPoints.map((point, index) => (
                <Reveal key={point.title} delay={index * 0.05}>
                  <div className="h-full rounded-3xl border border-forest-900/10 bg-mist/60 p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-forest-700 shadow-sm">
                      <Icon name={point.icon} size={20} />
                    </span>
                    <h3 className="mt-5 text-sm font-extrabold text-forest-900">{point.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-ink/50">{point.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Want help choosing the right components?"
        description="Tell us about your project. We will recommend an appropriate system and give you a transparent, itemised proposal."
      />
    </>
  )
}
