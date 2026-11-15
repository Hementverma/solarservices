import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import SEO from '@/components/SEO'
import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import ServiceCard from '@/components/ServiceCard'
import LocationCard from '@/components/LocationCard'
import SolarCalculator from '@/components/SolarCalculator'
import EnquiryForm from '@/components/EnquiryForm'
import ProcessSection from '@/components/ProcessSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import BrandsSection from '@/components/BrandsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQAccordion from '@/components/FAQAccordion'
import CTASection from '@/components/CTASection'
import SubsidySpotlight from '@/components/SubsidySpotlight'
import SubsidyPromoBanner from '@/components/SubsidyPromoBanner'
import { faqs, trustPoints } from '@/data/site'
import { subsidySlabs } from '@/data/subsidy'
import { formatCurrency } from '@/lib/utils'
import { useContent } from '@/context/ContentContext'

const maxSubsidy = Math.max(...subsidySlabs.map((slab) => slab.amount))

const homeFaqQuestions = [
  'How much does rooftop solar cost?',
  'Which solar system is best for my home?',
  'How much electricity can a solar panel generate?',
  'Are government subsidies available?',
  'Do you help with net metering and paperwork?',
  'Is maintenance required?',
]

const homeFaqItems = homeFaqQuestions
  .map((question) => faqs.find((faq) => faq.question === question))
  .filter(Boolean)

function Hero() {
  const reduceMotion = useReducedMotion()
  const { services } = useContent()

  return (
    <section className="relative overflow-hidden bg-forest-950 text-white">
      <img
        src="/images/hero-solar.jpg"
        alt="Rooftop solar panel installation under a clear sky"
        className="absolute inset-0 h-full w-full object-cover"
        width="2000"
        height="1333"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/88 to-forest-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/25" />
      <div className="absolute inset-0 hero-grid opacity-40" />
      <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-solar-400/15 blur-3xl" />

      <div className="container-page relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-solar-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-solar-400" />
              Power Your Future With Solar
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-white/50">
              <Icon name="MapPin" size={13} className="text-solar-400" />
              Madhya Pradesh
            </span>
          </div>

          <h1 className="mt-7 max-w-2xl font-display text-[3.35rem] leading-[0.97] tracking-[-0.025em] sm:text-6xl lg:text-[4.8rem] xl:text-[5.3rem]">
            Switch to Solar.
            <span className="block italic text-solar-400">Save More.</span>
            Live Smarter.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
            Reliable solar solutions for homes, businesses and industries across Madhya Pradesh.
            Plan with a local team that starts with your site — not a sales target.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="btn-primary">
              Get Free Solar Consultation
              <Icon name="ArrowRight" size={18} />
            </Link>
            <Link to="/solutions" className="btn-ghost-light">
              Explore Solar Solutions
              <Icon name="ArrowUpRight" size={17} />
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
            {trustPoints.slice(0, 3).map((point) => (
              <span
                key={point.label}
                className="flex items-center gap-2 text-[0.7rem] font-semibold text-white/55"
              >
                <Icon name={point.icon} size={14} className="text-solar-400" />
                {point.label}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {services.slice(0, 4).map((service) => (
              <Link
                key={service.slug}
                to={`/solutions/${service.slug}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.65rem] font-semibold text-white/55 transition hover:border-solar-400/40 hover:text-white"
              >
                {service.title.replace(' Solar', '')}
              </Link>
            ))}
            <span className="rounded-full px-2 py-1.5 text-[0.65rem] font-semibold text-white/35">
              6 cities served
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-[2.4rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm" />
          <div className="relative rounded-4xl bg-cream p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] sm:p-7">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-forest-50 px-3 py-1.5 text-[0.6rem] font-extrabold uppercase tracking-[0.15em] text-forest-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-forest-500" />
                Free site assessment
              </span>
              <span className="text-[0.62rem] font-bold text-ink/35">No obligation</span>
            </div>
            <EnquiryForm
              compact
              source="home-hero"
              title="Get a free solar consultation"
              subtitle="Share a few details. Our advisor will call you to understand your requirement."
            />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-2xl border border-white/15 bg-forest-900/85 px-4 py-3 text-white shadow-card backdrop-blur-md sm:flex">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-solar-400 text-forest-950">
              <Icon name="ShieldCheck" size={20} />
            </span>
            <div>
              <p className="text-xs font-extrabold">Site-first, honest advice</p>
              <p className="text-[0.62rem] text-white/50">Quotes only after inspection</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="relative z-10 border-b border-forest-900/8 bg-cream">
      <div className="container-page">
        <div className="grid divide-y divide-forest-900/8 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {trustPoints.map((point, index) => (
            <div
              key={point.label}
              className={`flex items-center gap-3 py-5 sm:px-4 ${
                index > 0 ? 'lg:border-l lg:border-forest-900/8' : ''
              }`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest-700">
                <Icon name={point.icon} size={17} />
              </span>
              <span className="text-xs font-bold leading-5 text-forest-900/70">{point.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SolutionsSection() {
  const { services } = useContent()
  return (
    <section className="section bg-mist">
      <div className="container-page">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Solar solutions"
              title="One roof. Many ways"
              accent="to go solar."
              description="From a compact home installation to a large industrial project, every system is planned around your site, load and long-term goals."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/solutions" className="btn-secondary shrink-0">
              View all solutions
              <Icon name="ArrowRight" size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.04}>
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CalculatorSection() {
  return (
    <section className="section bg-mist pb-8 sm:pb-10">
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Solar savings calculator"
              title="See what your bill could"
              accent="look like with solar."
              description="A quick, transparent estimate based on your usage. Adjust the inputs to compare scenarios — then get a site-specific proposal."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/calculator" className="btn-secondary shrink-0">
              Open full calculator
              <Icon name="ArrowUpRight" size={16} />
            </Link>
          </Reveal>
        </div>
        <Reveal>
          <SolarCalculator />
        </Reveal>
      </div>
    </section>
  )
}

function LocationsSection() {
  const { locations } = useContent()
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Service locations"
              title="Local solar support across"
              accent="Madhya Pradesh."
              description="We provide solar consultation, installation and after-sales support in six cities, with site visits coordinated locally."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/locations" className="btn-secondary shrink-0">
              Explore service areas
              <Icon name="MapPin" size={16} />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => (
            <Reveal key={location.slug} delay={index * 0.04}>
              <LocationCard location={location} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomeFaq() {
  return (
    <section className="section bg-mist">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Questions, answered"
                title="Before you"
                accent="go solar."
                description="Straight answers about costs, system types, generation, maintenance and subsidies."
              />
              <Link to="/contact#faq" className="btn-dark mt-7">
                Ask us your question
                <Icon name="MessageCircle" size={17} />
              </Link>
              <div className="mt-7 rounded-2xl border border-forest-900/10 bg-white p-5">
                <p className="flex items-start gap-3 text-xs leading-5 text-ink/55">
                  <Icon name="ShieldCheck" size={17} className="mt-0.5 shrink-0 text-forest-600" />
                  Subsidy information is updated periodically. Always confirm the latest eligibility
                  and rates on the official PM Surya Ghar portal and with your DISCOM.
                </p>
                <Link
                  to="/pm-surya-ghar-subsidy"
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.68rem] font-extrabold text-forest-700 transition hover:text-forest-900"
                >
                  Read the complete subsidy guide
                  <Icon name="ArrowRight" size={13} />
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={homeFaqItems} defaultOpen={0} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function HomeContact() {
  return (
    <section className="section bg-forest-50/60">
      <div className="container-page">
        <div className="overflow-hidden rounded-5xl border border-forest-900/10 bg-white shadow-card">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[340px] overflow-hidden bg-forest-950 p-7 text-white sm:p-10">
              <img
                src="/images/cta-solar.jpg"
                alt="Solar panels generating clean energy"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
                loading="lazy"
                width="1600"
                height="1067"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/75 to-forest-950/30" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-solar-300">
                    Free consultation
                  </span>
                  <h2 className="mt-6 max-w-md font-display text-4xl leading-[1.04] sm:text-5xl">
                    Let’s plan a solar system that fits your life.
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
                    Tell us where you are and what you need. We will arrange a conversation and,
                    if it makes sense, a site inspection.
                  </p>
                </div>
                <div className="mt-10 space-y-4">
                  {[
                    'Free initial consultation',
                    'Site inspection before quotation',
                    'Clear, itemised proposal',
                  ].map((item) => (
                    <span key={item} className="flex items-center gap-3 text-sm text-white/70">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-solar-400/15 text-solar-300">
                        <Icon name="Check" size={13} />
                      </span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-9 lg:p-10">
              <div className="mb-6 rounded-2xl border border-solar-400/50 bg-solar-400/10 p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-solar-400 text-forest-950">
                    <Icon name="BadgeIndianRupee" size={17} />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-forest-900">PM Surya Ghar subsidy</p>
                    <p className="mt-1 text-[0.68rem] leading-5 text-ink/55">
                      Eligible residential homes may get up to {formatCurrency(maxSubsidy)} central
                      subsidy. Ask us how the process works.
                    </p>
                    <Link
                      to="/pm-surya-ghar-subsidy#subsidy-estimator"
                      className="mt-2 inline-flex items-center gap-1 text-[0.68rem] font-extrabold text-forest-700 transition hover:text-forest-900"
                    >
                      Calculate indicative subsidy
                      <Icon name="ArrowRight" size={12} />
                    </Link>
                  </div>
                </div>
              </div>
              <EnquiryForm
                source="home-contact"
                title="Get Your Free Solar Consultation"
                subtitle="Fill in your details and our team will get in touch. Fields marked are used only to respond to your enquiry."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <SEO
        title="Solar Panel Installation in Indore, Bhopal & Madhya Pradesh"
        description="Ramesh Solar Services delivers rooftop solar consultation, installation and maintenance for homes, businesses and industries across Indore, Bhopal, Sehore, Ujjain, Dewas and Rajgarh, with PM Surya Ghar subsidy guidance for eligible homes."
        path="/"
      />
      <Hero />
      <SubsidySpotlight />
      <TrustStrip />
      <SolutionsSection />
      <SubsidyPromoBanner />
      <WhyChooseUs />
      <CalculatorSection />
      <ProcessSection />
      <LocationsSection />
      <BrandsSection />
      <TestimonialsSection />
      <HomeFaq />
      <HomeContact />
      <CTASection />
    </>
  )
}
