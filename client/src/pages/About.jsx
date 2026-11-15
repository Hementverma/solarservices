import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import WhyChooseUs from '@/components/WhyChooseUs'
import ProcessSection from '@/components/ProcessSection'
import CTASection from '@/components/CTASection'
import { SITE_URL, company, defaultContact, serviceCities } from '@/data/site'

const values = [
  {
    title: 'Clarity before commitment',
    description:
      'We explain system size, components, assumptions and trade-offs before you make a decision. A solar purchase should feel straightforward.',
    icon: 'Eye',
  },
  {
    title: 'Craft in the details',
    description:
      'Mounting, cable routing, earthing, protection and commissioning all affect how safely and reliably a system performs over time.',
    icon: 'HardHat',
  },
  {
    title: 'Care after handover',
    description:
      'The relationship does not end at commissioning. Maintenance, monitoring guidance and responsive support matter for the life of the system.',
    icon: 'HeartHandshake',
  },
]

const audiences = [
  { label: 'Homeowners', icon: 'Home' },
  { label: 'Shop owners', icon: 'Building2' },
  { label: 'Commercial buildings', icon: 'Factory' },
  { label: 'Factories & industries', icon: 'Wrench' },
  { label: 'Agricultural customers', icon: 'Leaf' },
]

export default function About() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Ramesh Solar Services',
    url: `${SITE_URL}/about`,
    description: company.description,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: company.name,
      telephone: defaultContact.phoneRaw,
      email: defaultContact.email,
      areaServed: serviceCities,
    },
  }

  return (
    <>
      <SEO
        title="About Us"
        description="Learn how Ramesh Solar Services approaches solar consultation, installation and support for homes, businesses, industries and farms across Madhya Pradesh."
        path="/about"
        image="/images/about-solar.jpg"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="About us"
        title="A local solar partner,"
        accent="focused on doing the basics well."
        description="Ramesh Solar Services helps customers across Madhya Pradesh move to solar with practical advice, careful installation and dependable after-sales support."
        image="/images/about-solar.jpg"
        breadcrumbs={[{ label: 'About' }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">
            Talk to our team
            <Icon name="ArrowRight" size={17} />
          </Link>
          <Link to="/solutions" className="btn-ghost-light">
            Explore solutions
            <Icon name="ArrowUpRight" size={16} />
          </Link>
        </div>
      </PageHero>

      <section className="section bg-cream">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Our approach"
                title="Good solar starts with"
                accent="better questions."
                description="How much electricity do you actually use? What condition is your roof in? Where does the shade fall? What happens when the grid goes down? These are the questions that shape a system worth owning."
              />
              <div className="mt-7 space-y-5 text-sm leading-7 text-ink/60">
                <p>
                  We work with homeowners, shop owners, commercial buildings, factories and
                  agricultural customers across six cities in Madhya Pradesh. Our role is to make the
                  process easier to understand — from the first conversation to net metering,
                  commissioning and long-term maintenance.
                </p>
                <p>
                  We do not believe in one-size-fits-all packages. A family home with a modest bill
                  needs a different approach from a factory with a daytime load. Our proposals are
                  built around the site, the usage and the outcome you care about.
                </p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { value: '06', label: 'Service cities' },
                  { value: '06', label: 'Solar solution types' },
                  { value: '01', label: 'Point of contact' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-forest-900/10 bg-white p-4">
                    <p className="font-display text-3xl text-forest-900">{item.value}</p>
                    <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink/40">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative">
                <div className="overflow-hidden rounded-5xl">
                  <img
                    src="/images/installers.jpg"
                    alt="Solar installation team reviewing a project"
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                    width="900"
                    height="1125"
                  />
                </div>
                <div className="absolute -bottom-6 left-5 right-5 rounded-3xl border border-white/60 bg-white/95 p-5 shadow-card backdrop-blur sm:left-8 sm:right-auto sm:max-w-sm">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-solar-400 text-forest-950">
                      <Icon name="Quote" size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-extrabold leading-6 text-forest-900">
                        “The right system is the one that fits your roof, your usage and your
                        budget — not the biggest one we can sell.”
                      </p>
                      <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-wider text-ink/40">
                        Our planning principle
                      </p>
                    </div>
                  </div>
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
              eyebrow="What guides us"
              title="Three values we"
              accent="do not compromise."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.06}>
                <div className="group h-full rounded-4xl border border-forest-900/10 bg-mist/60 p-7 transition hover:border-forest-900/20 hover:bg-white hover:shadow-soft">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-900 text-solar-400">
                    <Icon name={value.icon} size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-forest-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/55">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-forest-900 text-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Who we serve"
                title="Different properties."
                accent="The same care."
                description="Every customer category has a different load profile, tariff structure and decision process. We plan accordingly."
                light
              />
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {audiences.map((audience, index) => (
                <Reveal key={audience.label} delay={index * 0.05}>
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-solar-400/10 text-solar-300">
                      <Icon name={audience.icon} size={19} />
                    </span>
                    <p className="text-sm font-bold text-white/85">{audience.label}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.25}>
                <Link
                  to="/contact"
                  className="flex items-center justify-between gap-3 rounded-2xl bg-solar-400 px-5 py-4 text-sm font-extrabold text-forest-950 transition hover:bg-solar-300"
                >
                  Tell us about your property
                  <Icon name="ArrowRight" size={17} />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <ProcessSection />
      <CTASection />
    </>
  )
}
