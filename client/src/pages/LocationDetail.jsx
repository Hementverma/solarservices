import { Link, useParams } from 'react-router-dom'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import EnquiryForm from '@/components/EnquiryForm'
import FAQAccordion from '@/components/FAQAccordion'
import CTASection from '@/components/CTASection'
import { useContent } from '@/context/ContentContext'
import { faqs, SITE_URL } from '@/data/site'
import NotFound from '@/pages/NotFound'

const localFaqQuestions = [
  'How much does rooftop solar cost?',
  'What is the installation process?',
  'Are government subsidies available?',
  'Is maintenance required?',
]

export default function LocationDetail() {
  const { slug } = useParams()
  const { locations, services, contact } = useContent()
  const location = locations.find((item) => item.slug === slug)

  if (!location) return <NotFound />

  const otherLocations = locations.filter((item) => item.slug !== slug).slice(0, 5)
  const locationFaqs = faqs.filter((faq) => localFaqQuestions.includes(faq.question))
  const pageTitle = location.metaTitle
    ? location.metaTitle.replace(' | Ramesh Solar Services', '')
    : location.title

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: location.title,
    serviceType: 'Solar panel installation and maintenance',
    description: location.metaDescription,
    url: `${SITE_URL}/locations/${location.slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Ramesh Solar Services',
      telephone: contact.phoneRaw || contact.phone,
      email: contact.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Indore',
        addressRegion: 'Madhya Pradesh',
        addressCountry: 'IN',
      },
    },
    areaServed: {
      '@type': 'City',
      name: location.name,
      containedInPlace: { '@type': 'State', name: 'Madhya Pradesh' },
    },
  }

  return (
    <>
      <SEO
        title={pageTitle}
        description={location.metaDescription}
        path={`/locations/${location.slug}`}
        image={location.image}
        jsonLd={jsonLd}
        contact={contact}
      />
      <PageHero
        eyebrow={`${location.name} · Madhya Pradesh`}
        title={location.title}
        accent="with a local team."
        description={location.description}
        image={location.image}
        breadcrumbs={[
          { label: 'Locations', to: '/locations' },
          { label: location.name },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {location.areas?.map((area) => (
            <span
              key={area}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.68rem] font-semibold text-white/60"
            >
              <Icon name="MapPin" size={12} className="text-solar-400" />
              {area}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="section bg-mist">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow={`Solar in ${location.name}`}
                title="Practical solar advice,"
                accent="grounded in your site."
                description={location.intro}
              />
              <div className="mt-6 space-y-5 text-sm leading-7 text-ink/60">
                <p>
                  We help {location.name} customers compare solar options based on real usage, roof
                  space and budget. Our team explains the difference between on-grid, off-grid and
                  hybrid systems, then recommends the option that best matches your property.
                </p>
                <p>
                  Every proposal starts with a site inspection. We check roof condition, shading,
                  electrical setup and cable routing before confirming system size and pricing.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {location.highlights?.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 rounded-2xl border border-forest-900/10 bg-white p-4"
                  >
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-50 text-forest-700">
                      <Icon name="Check" size={14} />
                    </span>
                    <p className="text-sm font-semibold leading-6 text-forest-900/75">{highlight}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-forest-900/10 bg-white p-5">
                  <div className="flex items-center gap-2.5">
                    <Icon name="MapPin" size={18} className="text-forest-600" />
                    <h3 className="text-sm font-extrabold text-forest-900">Areas we cover</h3>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {location.areas?.map((area) => (
                      <span
                        key={area}
                        className="rounded-full bg-forest-50 px-2.5 py-1 text-[0.65rem] font-semibold text-forest-800"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-forest-900/10 bg-forest-900 p-5 text-white">
                  <div className="flex items-center gap-2.5">
                    <Icon name="Clock" size={18} className="text-solar-400" />
                    <h3 className="text-sm font-extrabold">Talk to us</h3>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-white/55">{contact.hours}</p>
                  <a
                    href={`tel:${(contact.phoneRaw || contact.phone).replace(/\s/g, '')}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-extrabold text-solar-300"
                  >
                    {contact.phone}
                    <Icon name="ArrowUpRight" size={14} />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card p-6 sm:p-8">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-forest-500">
                  {location.name} enquiry
                </p>
                <h2 className="mt-2 font-display text-3xl text-forest-900">
                  Get a free site assessment
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink/55">
                  Tell us about your property and we will coordinate a consultation in{' '}
                  {location.name}.
                </p>
                <div className="mt-6">
                  <EnquiryForm
                    source={`location-${location.slug}`}
                    defaultCity={location.name}
                    title=""
                    subtitle=""
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={`Solutions in ${location.name}`}
              title="Solar options for"
              accent="every property."
              description="Explore our core solutions. The right fit depends on your load, roof and backup needs."
            />
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/solutions/${service.slug}`}
                className="group flex items-center justify-between gap-4 rounded-3xl border border-forest-900/10 bg-mist/50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-forest-700 shadow-sm transition group-hover:bg-forest-900 group-hover:text-solar-400">
                    <Icon name={service.icon} size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-forest-900">{service.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-[0.68rem] text-ink/45">{service.bestFor}</p>
                  </div>
                </div>
                <Icon name="ArrowUpRight" size={17} className="shrink-0 text-forest-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow="Common questions"
                title={`Solar in ${location.name},`}
                accent="answered."
                description="A few practical answers before you request a consultation."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion items={locationFaqs} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Nearby service areas"
              title="Also serving"
              accent="these cities."
            />
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {otherLocations.map((item) => (
              <Link
                key={item.slug}
                to={`/locations/${item.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-forest-900/10 bg-mist px-4 py-2.5 text-sm font-bold text-forest-800 transition hover:border-forest-900/25 hover:bg-white"
              >
                <Icon name="MapPin" size={14} className="text-forest-500" />
                Solar in {item.name}
                <Icon name="ArrowUpRight" size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Plan your solar system in ${location.name}.`}
        description="Book a consultation with our local team and get a site-specific proposal."
      />
    </>
  )
}
