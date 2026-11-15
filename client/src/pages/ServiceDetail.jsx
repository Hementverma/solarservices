import { Link, useParams } from 'react-router-dom'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import EnquiryForm from '@/components/EnquiryForm'
import ProcessSection from '@/components/ProcessSection'
import CTASection from '@/components/CTASection'
import { useContent } from '@/context/ContentContext'
import { SITE_URL, defaultContact, serviceCities } from '@/data/site'
import NotFound from '@/pages/NotFound'

const planningNotes = [
  {
    title: 'Usage & load analysis',
    description:
      'We review your recent bills and daytime consumption pattern to estimate a sensible system size.',
    icon: 'TrendingUp',
  },
  {
    title: 'Roof & shade assessment',
    description:
      'Roof condition, orientation, obstruction and cable route are checked before finalising the layout.',
    icon: 'Home',
  },
  {
    title: 'Electrical safety review',
    description:
      'Earthing, protection devices, inverter placement and metering requirements are planned properly.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Documentation support',
    description:
      'For grid-connected systems, we guide you through DISCOM and net-metering paperwork where applicable.',
    icon: 'FileText',
  },
]

export default function ServiceDetail() {
  const { slug } = useParams()
  const { services } = useContent()
  const service = services.find((item) => item.slug === slug)

  if (!service) return <NotFound />

  const related = services.filter((item) => item.slug !== slug).slice(0, 3)
  const requirement = service.title
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: `${SITE_URL}/solutions/${service.slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Ramesh Solar Services',
      telephone: defaultContact.phoneRaw,
      email: defaultContact.email,
      areaServed: serviceCities,
    },
    areaServed: serviceCities.map((city) => ({ '@type': 'City', name: city })),
  }

  return (
    <>
      <SEO
        title={service.title}
        description={service.shortDescription}
        path={`/solutions/${service.slug}`}
        image={service.image}
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="Solar solution"
        title={service.title}
        accent="designed around your site."
        description={service.description}
        image={service.image}
        breadcrumbs={[
          { label: 'Solar Solutions', to: '/solutions' },
          { label: service.title },
        ]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to={`/contact?requirement=${encodeURIComponent(requirement)}`}
            className="btn-primary"
          >
            Enquire about {service.title.replace(' Solar', '')}
            <Icon name="ArrowRight" size={17} />
          </Link>
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/60">
            Best for: {service.bestFor}
          </span>
        </div>
      </PageHero>

      <section className="section bg-mist">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="What this includes"
                  title="A complete,"
                  accent="considered installation."
                  description={service.shortDescription}
                />
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {service.features?.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 rounded-2xl border border-forest-900/10 bg-white p-4"
                    >
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-50 text-forest-700">
                        <Icon name="Check" size={14} />
                      </span>
                      <p className="text-sm font-semibold leading-6 text-forest-900/75">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 overflow-hidden rounded-4xl">
                  <img
                    src={service.image}
                    alt={`${service.title} project reference`}
                    className="aspect-[16/9] w-full object-cover"
                    loading="lazy"
                    width="1200"
                    height="675"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="lg:sticky lg:top-28">
                <div className="rounded-4xl border border-forest-900/10 bg-white p-6 shadow-soft sm:p-7">
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-forest-500">
                    Plan your project
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-forest-900">
                    Request a site assessment
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink/55">
                    We will review your requirement and arrange a conversation before proposing a
                    system.
                  </p>
                  <div className="mt-5 space-y-3">
                    {[
                      'Free initial consultation',
                      'Site-specific system sizing',
                      'Clear, itemised quotation',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-ink/65">
                        <Icon name="CheckCircle2" size={17} className="shrink-0 text-forest-600" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/contact?requirement=${encodeURIComponent(requirement)}`}
                    className="btn-primary mt-6 w-full"
                  >
                    Get free consultation
                    <Icon name="ArrowRight" size={17} />
                  </Link>
                </div>
                <div className="mt-3 rounded-3xl border border-forest-900/10 bg-forest-900 p-5 text-white">
                  <p className="flex items-start gap-3 text-xs leading-5 text-white/60">
                    <Icon name="ShieldCheck" size={17} className="mt-0.5 shrink-0 text-solar-400" />
                    Every quotation follows a site inspection. Estimates on this page are
                    indicative and not a guarantee of generation or savings.
                  </p>
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
              eyebrow="Our planning checks"
              title="Details that make"
              accent="a difference later."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {planningNotes.map((note, index) => (
              <Reveal key={note.title} delay={index * 0.05}>
                <div className="h-full rounded-3xl border border-forest-900/10 bg-mist/60 p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-forest-700 shadow-sm">
                    <Icon name={note.icon} size={20} />
                  </span>
                  <h3 className="mt-5 text-sm font-extrabold text-forest-900">{note.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-ink/50">{note.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Keep exploring"
              title="Other solar"
              accent="solutions."
              description="Compare related options or speak with our team if you are unsure what suits your property."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/solutions/${item.slug}`}
                className="group flex items-center justify-between gap-4 rounded-3xl border border-forest-900/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-forest-50 text-forest-700 transition group-hover:bg-forest-900 group-hover:text-solar-400">
                    <Icon name={item.icon} size={19} />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-forest-900">{item.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-ink/45">{item.bestFor}</p>
                  </div>
                </div>
                <Icon name="ArrowUpRight" size={18} className="shrink-0 text-forest-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-forest-950">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Talk to an advisor"
                title="Get a proposal built"
                accent="around your site."
                description="Share your requirement and we will arrange a consultation. No pressure, no generic packages."
                light
              />
            </div>
            <div className="card p-6 sm:p-8">
              <EnquiryForm
                source={`solution-${service.slug}`}
                title="Request a free consultation"
                subtitle={`Tell us about your ${service.title.toLowerCase()} requirement.`}
              />
            </div>
          </div>
        </div>
      </section>

      <ProcessSection showHeading={false} />
      <CTASection />
    </>
  )
}
