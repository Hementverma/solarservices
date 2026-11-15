import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import LocationCard from '@/components/LocationCard'
import ProcessSection from '@/components/ProcessSection'
import CTASection from '@/components/CTASection'
import { useContent } from '@/context/ContentContext'
import { SITE_URL, defaultContact, serviceCities } from '@/data/site'

export default function Locations() {
  const { locations } = useContent()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ramesh Solar Services',
    url: `${SITE_URL}/locations`,
    telephone: defaultContact.phoneRaw,
    email: defaultContact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
    areaServed: serviceCities.map((city) => ({ '@type': 'City', name: city })),
  }

  return (
    <>
      <SEO
        title="Service Locations in Madhya Pradesh"
        description="Ramesh Solar Services provides solar consultation, installation and maintenance in Indore, Bhopal, Sehore, Ujjain, Dewas and Rajgarh."
        path="/locations"
        image="/images/commercial-solar.jpg"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="Service locations"
        title="Local solar support,"
        accent="across Madhya Pradesh."
        description="From site inspection to after-sales service, our teams coordinate locally in six cities. Choose your city to see how we can help."
        image="/images/commercial-solar.jpg"
        breadcrumbs={[{ label: 'Locations' }]}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {locations.map((location) => (
            <Link
              key={location.slug}
              to={`/locations/${location.slug}`}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white/60 transition hover:border-solar-400/40 hover:text-white"
            >
              {location.name}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="section bg-mist">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Where we work"
              title="Find solar services"
              accent="in your city."
              description="Each location page includes local service details, areas covered and a direct way to request a site assessment."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location, index) => (
              <Reveal key={location.slug} delay={index * 0.04}>
                <LocationCard location={location} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Local matters"
                title="A solar system is designed"
                accent="for its location."
                description="Sun hours, dust, roof type, grid conditions and DISCOM processes can differ from one city to another. Local context helps us plan better."
              />
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: 'ClipboardCheck',
                  title: 'Local site inspections',
                  text: 'Roof, shade and electrical conditions are checked on site.',
                },
                {
                  icon: 'Sun',
                  title: 'Location-aware sizing',
                  text: 'Generation assumptions account for city-level sun hours.',
                },
                {
                  icon: 'FileText',
                  title: 'DISCOM guidance',
                  text: 'Support with net-metering and documentation where applicable.',
                },
                {
                  icon: 'Wrench',
                  title: 'After-sales access',
                  text: 'Service coordination and maintenance support close to home.',
                },
              ].map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="h-full rounded-3xl border border-forest-900/10 bg-mist/60 p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-forest-700 shadow-sm">
                      <Icon name={item.icon} size={20} />
                    </span>
                    <h3 className="mt-5 text-sm font-extrabold text-forest-900">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-ink/50">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />
      <CTASection
        title="Ready for a local site assessment?"
        description="Tell us your city and property type. We will coordinate the next step with you."
      />
    </>
  )
}
