import { useState } from 'react'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import FAQAccordion from '@/components/FAQAccordion'
import SubsidyCalculator from '@/components/subsidy/SubsidyCalculator'
import EligibilityChecker from '@/components/subsidy/EligibilityChecker'
import SubsidyEnquiryForm from '@/components/subsidy/SubsidyEnquiryForm'
import { useContent } from '@/context/ContentContext'
import { SITE_URL, serviceCities } from '@/data/site'
import {
  OFFICIAL_PORTAL_URL,
  SUBSIDY_DISCLAIMER,
  applicationSteps,
  subsidyFaqs,
  subsidySlabs,
} from '@/data/subsidy'
import {
  buildWhatsAppUrl,
  formatCurrency,
  normalizePhoneHref,
  scrollToId,
} from '@/lib/utils'

const requirements = [
  'Residential electricity connection in your name or family’s name',
  'Suitable rooftop area with structural and shading assessment',
  'Application through the official national portal',
  'Installation through a vendor registered on the portal',
  'Net-metering and DISCOM commissioning as applicable',
  'Valid identity, electricity bill, bank and commissioning documents',
]

export default function Subsidy() {
  const { contact } = useContent()
  const [selectedCapacity, setSelectedCapacity] = useState(3)

  const primaryPhone = contact.phoneRaw || contact.phone
  const secondaryPhone = contact.phone2Raw || contact.phone2
  const whatsappUrl = buildWhatsAppUrl(
    contact.whatsapp || contact.phoneRaw,
    `Hello Ramesh Solar Services, I would like to understand PM Surya Ghar subsidy for a ${selectedCapacity} kW residential rooftop system.`,
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/pm-surya-ghar-subsidy#faq`,
        mainEntity: subsidyFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/pm-surya-ghar-subsidy`,
        name: 'PM Surya Ghar Subsidy in Madhya Pradesh',
        url: `${SITE_URL}/pm-surya-ghar-subsidy`,
        description:
          'Understand PM Surya Ghar rooftop solar subsidy, calculate an indicative subsidy and request a solar consultation in Madhya Pradesh.',
        isPartOf: { '@id': `${SITE_URL}/#business` },
      },
    ],
  }

  return (
    <>
      <SEO
        title="PM Surya Ghar Subsidy in Madhya Pradesh"
        description="Understand PM Surya Ghar rooftop solar subsidy, calculate indicative subsidy and get solar installation consultation in Indore, Bhopal, Sehore, Ujjain, Dewas and Rajgarh."
        path="/pm-surya-ghar-subsidy"
        image="/images/residential-solar.jpg"
        jsonLd={jsonLd}
        contact={contact}
      />

      <PageHero
        eyebrow="PM Surya Ghar: Muft Bijli Yojana"
        title="Rooftop solar subsidy,"
        accent="clearly explained."
        description="Understand the central subsidy structure, check your indicative eligibility and plan a residential rooftop system for your home. We help with guidance and installation — not official government approval."
        image="/images/residential-solar.jpg"
        breadcrumbs={[{ label: 'PM Surya Ghar Subsidy' }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={() => scrollToId('subsidy-estimator')} className="btn-primary">
            Check My Subsidy
            <Icon name="ArrowRight" size={17} />
          </button>
          <a
            href={OFFICIAL_PORTAL_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            Apply on Official Government Portal
            <Icon name="ExternalLink" size={16} />
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.68rem] font-semibold text-white/45">
          <span className="flex items-center gap-1.5">
            <Icon name="ShieldCheck" size={13} className="text-solar-400" />
            Independent information page — not a government website
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="BadgeIndianRupee" size={13} className="text-solar-400" />
            Maximum central subsidy ₹78,000
          </span>
        </div>
      </PageHero>

      <section className="border-b border-forest-900/10 bg-forest-900 py-4 text-white">
        <div className="container-page flex flex-col gap-3 text-xs leading-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2">
            <Icon name="Landmark" size={16} className="mt-0.5 shrink-0 text-solar-400" />
            Always verify current scheme rules and application status on the official national
            portal.
          </p>
          <a
            href={OFFICIAL_PORTAL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 font-extrabold text-solar-300 transition hover:text-solar-200"
          >
            pmsuryaghar.gov.in
            <Icon name="ExternalLink" size={13} />
          </a>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Subsidy at a glance"
              title="Central support for"
              accent="eligible homes."
              description="PM Surya Ghar provides central financial assistance for eligible residential rooftop solar systems. The table below is an indicative summary, not an approval or guarantee."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {subsidySlabs.map((slab, index) => (
              <Reveal key={slab.label} delay={index * 0.05}>
                <div
                  className={`h-full rounded-4xl border p-6 ${
                    slab.capacity === 3
                      ? 'border-forest-900 bg-forest-900 text-white shadow-card'
                      : 'border-forest-900/10 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className={`text-[0.62rem] font-extrabold uppercase tracking-[0.18em] ${
                          slab.capacity === 3 ? 'text-solar-300' : 'text-forest-500'
                        }`}
                      >
                        Residential capacity
                      </p>
                      <p className="mt-1 font-display text-4xl">{slab.label}</p>
                    </div>
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-2xl ${
                        slab.capacity === 3
                          ? 'bg-white/10 text-solar-400'
                          : 'bg-forest-50 text-forest-700'
                      }`}
                    >
                      <Icon name="Sun" size={20} />
                    </span>
                  </div>
                  <p className="mt-5 font-display text-4xl text-solar-400">
                    {formatCurrency(slab.amount)}
                  </p>
                  <p
                    className={`mt-2 text-xs leading-6 ${
                      slab.capacity === 3 ? 'text-white/55' : 'text-ink/50'
                    }`}
                  >
                    {slab.description}
                  </p>
                  {slab.capacity === 3 && (
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-solar-400 px-3 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-wider text-forest-950">
                      <Icon name="BadgeCheck" size={13} />
                      Maximum central cap
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-6 flex items-start gap-3 rounded-3xl border border-solar-500/20 bg-solar-50 px-5 py-5 sm:px-7">
              <Icon name="ShieldCheck" size={20} className="mt-0.5 shrink-0 text-solar-700" />
              <p className="text-xs leading-6 text-forest-900/65">
                <span className="font-extrabold">Important:</span> 3 kW and above are capped at
                ₹78,000 central financial assistance for eligible residential systems. No general
                state cash top-up for Madhya Pradesh homes was confirmed in official sources at the
                time of writing. Commercial and industrial connections are generally not eligible
                for this residential subsidy. {SUBSIDY_DISCLAIMER}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white" id="subsidy-estimator">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Subsidy calculator"
                  title="See what the"
                  accent="numbers look like."
                  description="Choose your connection type and capacity. Add your own project cost if you have a quote. The estimate is a planning aid only."
                />
                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl bg-mist p-4">
                    <Icon name="BadgeIndianRupee" size={18} className="mt-0.5 shrink-0 text-forest-700" />
                    <p className="text-xs leading-5 text-ink/55">
                      Central subsidy is capped at ₹78,000 for eligible 3 kW and higher residential
                      systems.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-mist p-4">
                    <Icon name="Home" size={18} className="mt-0.5 shrink-0 text-forest-700" />
                    <p className="text-xs leading-5 text-ink/55">
                      The calculator does not confirm eligibility. Roof condition, DISCOM approval
                      and scheme rules still apply.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <SubsidyCalculator
                initialCapacity={selectedCapacity}
                onEstimateChange={(estimate) => setSelectedCapacity(estimate.capacity)}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-cream" id="eligibility">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Eligibility check"
                  title="A few questions,"
                  accent="a clearer picture."
                  description="This step-by-step check is indicative. It helps you prepare the right questions before you apply or speak with our team."
                />
                <div className="mt-6 rounded-3xl border border-forest-900/10 bg-white p-5">
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/40">
                    Typically checked
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {requirements.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs leading-5 text-ink/60">
                        <Icon name="CheckCircle2" size={16} className="mt-0.5 shrink-0 text-forest-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <EligibilityChecker onCapacitySelect={setSelectedCapacity} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Application process"
              title="From portal application"
              accent="to commissioning."
              description="The exact sequence and documents can vary by DISCOM and project. These are the usual stages for an eligible residential rooftop system."
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-5">
            {applicationSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <div className="relative h-full rounded-4xl border border-forest-900/10 bg-mist/60 p-5">
                  <span className="text-[0.62rem] font-extrabold tracking-[0.18em] text-forest-400">
                    STEP {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-4 grid h-11 w-11 place-items-center rounded-2xl bg-white text-forest-700 shadow-sm">
                    <Icon name={step.icon} size={20} />
                  </span>
                  <h3 className="mt-4 text-sm font-extrabold leading-5 text-forest-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-ink/50">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl bg-forest-900 px-5 py-5 text-white sm:flex-row sm:items-center sm:px-7">
              <div className="flex items-start gap-3">
                <Icon name="ShieldCheck" size={21} className="mt-0.5 shrink-0 text-solar-400" />
                <div>
                  <p className="text-sm font-extrabold">Use the official portal for applications</p>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Ramesh Solar Services can guide you, but the government portal and your DISCOM
                    remain the decision-making authorities.
                  </p>
                </div>
              </div>
              <a
                href={OFFICIAL_PORTAL_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-white shrink-0"
              >
                Official portal
                <Icon name="ExternalLink" size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-mist" id="subsidy-lead-form">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Talk to our team"
                  title="Need help with"
                  accent="the next step?"
                  description="Share your details and we will help you understand the documents, site requirements and practical installation process for your home."
                />

                <div className="mt-6 space-y-3">
                  <a
                    href={normalizePhoneHref(primaryPhone)}
                    className="group flex items-center gap-3 rounded-2xl border border-forest-900/10 bg-white p-4 transition hover:border-forest-900/25 hover:shadow-soft"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-900 text-solar-400">
                      <Icon name="Phone" size={17} />
                    </span>
                    <span>
                      <span className="block text-[0.6rem] font-extrabold uppercase tracking-[0.15em] text-ink/35">
                        Call us
                      </span>
                      <span className="mt-0.5 block text-sm font-extrabold text-forest-900">
                        {contact.phone}
                      </span>
                    </span>
                    <Icon name="ArrowUpRight" size={16} className="ml-auto text-forest-400" />
                  </a>

                  {secondaryPhone && (
                    <a
                      href={normalizePhoneHref(secondaryPhone)}
                      className="group flex items-center gap-3 rounded-2xl border border-forest-900/10 bg-white p-4 transition hover:border-forest-900/25 hover:shadow-soft"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest-700">
                        <Icon name="PhoneCall" size={17} />
                      </span>
                      <span>
                        <span className="block text-[0.6rem] font-extrabold uppercase tracking-[0.15em] text-ink/35">
                          Alternate number
                        </span>
                        <span className="mt-0.5 block text-sm font-extrabold text-forest-900">
                          {contact.phone2}
                        </span>
                      </span>
                      <Icon name="ArrowUpRight" size={16} className="ml-auto text-forest-400" />
                    </a>
                  )}

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-forest-900/10 bg-white p-4 transition hover:border-forest-900/25 hover:shadow-soft"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#25D366]/10 text-[#1a9e4d]">
                      <Icon name="MessageCircle" size={17} />
                    </span>
                    <span>
                      <span className="block text-[0.6rem] font-extrabold uppercase tracking-[0.15em] text-ink/35">
                        WhatsApp
                      </span>
                      <span className="mt-0.5 block text-sm font-extrabold text-forest-900">
                        Ask about your subsidy
                      </span>
                    </span>
                    <Icon name="ArrowUpRight" size={16} className="ml-auto text-forest-400" />
                  </a>
                </div>

                <p className="mt-5 flex items-start gap-2 text-[0.68rem] leading-5 text-ink/40">
                  <Icon name="MapPin" size={14} className="mt-0.5 shrink-0 text-forest-500" />
                  Serving {serviceCities.join(' · ')} and nearby areas.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-5xl border border-forest-900/10 bg-white p-6 shadow-card sm:p-8">
                <SubsidyEnquiryForm initialCapacity={selectedCapacity} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-cream" id="faq">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Subsidy questions"
                  title="What homeowners"
                  accent="usually ask."
                  description="Clear answers about the scheme, the cap, eligibility and the difference between guidance and official approval."
                />
                <a
                  href={OFFICIAL_PORTAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-dark mt-7"
                >
                  Verify on the official portal
                  <Icon name="ExternalLink" size={16} />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <FAQAccordion items={subsidyFaqs} defaultOpen={0} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-forest-900/10 bg-white py-10">
        <div className="container-page">
          <div className="flex items-start gap-3 rounded-3xl border border-forest-900/10 bg-mist p-5 sm:p-6">
            <Icon name="ShieldCheck" size={21} className="mt-0.5 shrink-0 text-forest-600" />
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h2 className="text-sm font-extrabold text-forest-900">Subsidy disclaimer</h2>
                <span className="rounded-full bg-white px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-wider text-ink/40">
                  Information reviewed November 2026
                </span>
              </div>
              <p className="mt-2 text-xs leading-6 text-ink/50">
                {SUBSIDY_DISCLAIMER} This page is independent information from Ramesh Solar
                Services. It is not an official government website or application portal. We do not
                claim to be an empanelled vendor, authorised dealer or official scheme partner
                unless confirmed separately in writing. Commercial and industrial systems are
                generally outside the residential PM Surya Ghar subsidy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
