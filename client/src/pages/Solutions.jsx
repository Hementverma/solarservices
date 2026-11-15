import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import ServiceCard from '@/components/ServiceCard'
import ProcessSection from '@/components/ProcessSection'
import CTASection from '@/components/CTASection'
import { useContent } from '@/context/ContentContext'
import { SITE_URL, defaultContact, serviceCities } from '@/data/site'

const comparison = [
  {
    feature: 'Grid connection',
    ongrid: 'Connected to DISCOM supply',
    offgrid: 'Independent of the grid',
    hybrid: 'Connected, with battery backup',
  },
  {
    feature: 'Battery storage',
    ongrid: 'Not included',
    offgrid: 'Required',
    hybrid: 'Included',
  },
  {
    feature: 'Power during outage',
    ongrid: 'No',
    offgrid: 'Yes, within battery capacity',
    hybrid: 'Yes, for selected circuits',
  },
  {
    feature: 'Relative upfront cost',
    ongrid: 'Lower',
    offgrid: 'Higher',
    hybrid: 'Moderate to higher',
  },
  {
    feature: 'Typical fit',
    ongrid: 'Reliable grid, bill reduction',
    offgrid: 'Remote sites, no dependable grid',
    hybrid: 'Savings plus backup',
  },
]

export default function Solutions() {
  const { services } = useContent()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Solar solutions by Ramesh Solar Services',
    url: `${SITE_URL}/solutions`,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.shortDescription,
        url: `${SITE_URL}/solutions/${service.slug}`,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Ramesh Solar Services',
          telephone: defaultContact.phoneRaw,
          areaServed: serviceCities,
        },
      },
    })),
  }

  return (
    <>
      <SEO
        title="Solar Solutions"
        description="Explore residential, commercial, industrial, on-grid, off-grid and hybrid solar solutions from Ramesh Solar Services across Madhya Pradesh."
        path="/solutions"
        image="/images/industrial-solar.jpg"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="Solar solutions"
        title="The right system for"
        accent="the way you use power."
        description="Six solution types, one planning process. We start with your site and load, then recommend the system that makes sense for your goals."
        image="/images/industrial-solar.jpg"
        breadcrumbs={[{ label: 'Solar Solutions' }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/calculator" className="btn-primary">
            Estimate your requirement
            <Icon name="SlidersHorizontal" size={17} />
          </Link>
          <Link to="/contact" className="btn-ghost-light">
            Book a site assessment
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </PageHero>

      <section className="section bg-mist">
        <div className="container-page">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.04}>
                <ServiceCard service={service} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Compare grid options"
              title="On-grid, off-grid or hybrid?"
              accent="Here is the difference."
              description="The best choice depends on your grid reliability, backup needs and budget. This comparison is a starting point — your site assessment will confirm the right fit."
              align="center"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-4xl border border-forest-900/10 shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead>
                    <tr className="bg-forest-950 text-white">
                      <th className="px-5 py-5 text-xs font-extrabold uppercase tracking-[0.15em] text-white/45">
                        Consideration
                      </th>
                      <th className="px-5 py-5 text-sm font-extrabold text-white">On-Grid</th>
                      <th className="px-5 py-5 text-sm font-extrabold text-white">Off-Grid</th>
                      <th className="bg-solar-400 px-5 py-5 text-sm font-extrabold text-forest-950">
                        Hybrid
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-forest-900/8 bg-white">
                    {comparison.map((row) => (
                      <tr key={row.feature} className="transition hover:bg-mist/60">
                        <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-forest-900/55">
                          {row.feature}
                        </th>
                        <td className="px-5 py-4 text-sm text-ink/65">{row.ongrid}</td>
                        <td className="px-5 py-4 text-sm text-ink/65">{row.offgrid}</td>
                        <td className="bg-solar-50 px-5 py-4 text-sm font-semibold text-forest-900">
                          {row.hybrid}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-3xl border border-forest-900/10 bg-mist px-6 py-5 sm:flex-row sm:items-center">
            <p className="flex items-start gap-3 text-sm leading-6 text-ink/55">
              <Icon name="ShieldCheck" size={19} className="mt-0.5 shrink-0 text-forest-600" />
              We explain the trade-offs clearly before quoting, including battery replacement and
              maintenance considerations.
            </p>
            <Link to="/contact" className="btn-dark btn-sm shrink-0">
              Get guidance
              <Icon name="ArrowRight" size={15} />
            </Link>
          </div>
        </div>
      </section>

      <ProcessSection />
      <CTASection
        title="Not sure which system fits your property?"
        description="Tell us about your electricity usage and site. We will help you compare the practical options before you commit."
      />
    </>
  )
}
