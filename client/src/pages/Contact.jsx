import { Link, useSearchParams } from 'react-router-dom'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import EnquiryForm from '@/components/EnquiryForm'
import FAQAccordion from '@/components/FAQAccordion'
import { useContent } from '@/context/ContentContext'
import { faqs, requirements, serviceCities, SITE_URL } from '@/data/site'
import { buildWhatsAppUrl, normalizePhoneHref } from '@/lib/utils'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const { contact, locations } = useContent()

  const queryCity = searchParams.get('city')
  const queryRequirement = searchParams.get('requirement')
  const queryBill = searchParams.get('bill')
  const queryCapacity = searchParams.get('capacity')

  const defaultCity = serviceCities.includes(queryCity) ? queryCity : undefined
  const defaultRequirement = requirements.includes(queryRequirement) ? queryRequirement : undefined
  const initialMessage =
    queryCapacity && queryBill
      ? `I used the solar calculator and it suggested approximately ${queryCapacity} kW for a monthly bill of ₹${queryBill}. Please contact me to discuss a site-specific proposal.`
      : ''

  const whatsappUrl = buildWhatsAppUrl(
    contact.whatsapp || contact.phoneRaw,
    'Hello Ramesh Solar Services, I would like to speak about a solar installation.',
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: 'Ramesh Solar Services',
        url: SITE_URL,
        telephone: contact.phoneRaw || contact.phone,
        email: contact.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Indore',
          addressRegion: 'Madhya Pradesh',
          addressCountry: 'IN',
        },
        areaServed: serviceCities.map((city) => ({ '@type': 'City', name: city })),
        openingHours: contact.hours,
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/contact#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get a free solar consultation from Ramesh Solar Services. Call, WhatsApp or submit an enquiry for homes, businesses and industries across Madhya Pradesh."
        path="/contact"
        image="/images/cta-solar.jpg"
        jsonLd={jsonLd}
        contact={contact}
      />
      <PageHero
        eyebrow="Contact us"
        title="Let’s talk about"
        accent="your solar project."
        description="Tell us where you are, what you need and how we can help. Our team will follow up to understand your requirement and suggest the next step."
        image="/images/cta-solar.jpg"
        breadcrumbs={[{ label: 'Contact' }]}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {locations.map((location) => (
            <span
              key={location.slug}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.68rem] font-semibold text-white/55"
            >
              <Icon name="MapPin" size={12} className="text-solar-400" />
              {location.name}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="section bg-mist">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <Reveal>
              <div className="space-y-4 lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Get in touch"
                  title="We are here"
                  accent="to help."
                  description="Reach us directly or send an enquiry. We use your details only to respond to your request."
                />

                <div className="mt-6 grid gap-3">
                  <a
                    href={normalizePhoneHref(contact.phoneRaw || contact.phone)}
                    className="group flex items-center gap-4 rounded-3xl border border-forest-900/10 bg-white p-5 transition hover:border-forest-900/20 hover:shadow-soft"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-forest-900 text-solar-400">
                      <Icon name="Phone" size={21} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-ink/35">
                        Call us
                      </span>
                      <span className="mt-1 block text-sm font-extrabold text-forest-900">
                        {contact.phone}
                      </span>
                      <span className="mt-0.5 block text-[0.68rem] text-ink/40">{contact.hours}</span>
                    </span>
                    <Icon
                      name="ArrowUpRight"
                      size={18}
                      className="ml-auto shrink-0 text-forest-400 transition group-hover:text-forest-800"
                    />
                  </a>

                  {contact.phone2 && (
                    <a
                      href={normalizePhoneHref(contact.phone2Raw || contact.phone2)}
                      className="group flex items-center gap-4 rounded-3xl border border-forest-900/10 bg-white p-5 transition hover:border-forest-900/20 hover:shadow-soft"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-forest-50 text-forest-700">
                        <Icon name="PhoneCall" size={21} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-ink/35">
                          Alternate number
                        </span>
                        <span className="mt-1 block text-sm font-extrabold text-forest-900">
                          {contact.phone2}
                        </span>
                        <span className="mt-0.5 block text-[0.68rem] text-ink/40">
                          {contact.hours}
                        </span>
                      </span>
                      <Icon
                        name="ArrowUpRight"
                        size={18}
                        className="ml-auto shrink-0 text-forest-400 transition group-hover:text-forest-800"
                      />
                    </a>
                  )}

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-3xl border border-forest-900/10 bg-white p-5 transition hover:border-forest-900/20 hover:shadow-soft"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#25D366]/10 text-[#1a9e4d]">
                      <Icon name="MessageCircle" size={21} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-ink/35">
                        WhatsApp
                      </span>
                      <span className="mt-1 block text-sm font-extrabold text-forest-900">
                        Chat with our team
                      </span>
                      <span className="mt-0.5 block text-[0.68rem] text-ink/40">
                        Quick questions and site visit coordination
                      </span>
                    </span>
                    <Icon
                      name="ArrowUpRight"
                      size={18}
                      className="ml-auto shrink-0 text-forest-400 transition group-hover:text-forest-800"
                    />
                  </a>

                  <a
                    href={`mailto:${contact.email}`}
                    className="group flex items-center gap-4 rounded-3xl border border-forest-900/10 bg-white p-5 transition hover:border-forest-900/20 hover:shadow-soft"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-solar-400/15 text-solar-700">
                      <Icon name="Mail" size={21} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-ink/35">
                        Email
                      </span>
                      <span className="mt-1 block break-all text-sm font-extrabold text-forest-900">
                        {contact.email}
                      </span>
                    </span>
                    <Icon
                      name="ArrowUpRight"
                      size={18}
                      className="ml-auto shrink-0 text-forest-400 transition group-hover:text-forest-800"
                    />
                  </a>
                </div>

                <div className="rounded-3xl border border-forest-900/10 bg-forest-900 p-5 text-white">
                  <div className="flex items-center gap-2.5">
                    <Icon name="MapPin" size={18} className="text-solar-400" />
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em]">
                      Service area
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {contact.address}. Site visits are coordinated across our six service cities.
                  </p>
                </div>

                <div className="rounded-3xl border border-forest-900/10 bg-white p-5">
                  <div className="flex items-center gap-2.5">
                    <Icon name="ShieldCheck" size={18} className="text-forest-600" />
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-forest-900">
                      Your privacy
                    </p>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-ink/50">
                    Your name, mobile number and enquiry details are used to respond to your
                    request. We do not sell customer data. Read our{' '}
                    <Link
                      to="/privacy-policy"
                      className="font-bold text-forest-700 underline underline-offset-2"
                    >
                      privacy policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-5xl border border-forest-900/10 bg-white p-6 shadow-card sm:p-8 lg:p-10">
                <div className="flex items-center justify-between gap-4 border-b border-forest-900/8 pb-5">
                  <div>
                    <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-forest-500">
                      Free consultation
                    </p>
                    <h2 className="mt-1 font-display text-3xl text-forest-900">
                      Get Your Free Solar Consultation
                    </h2>
                  </div>
                  <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-solar-400 text-forest-950 sm:grid">
                    <Icon name="Sun" size={24} />
                  </span>
                </div>
                <div className="mt-6">
                  <EnquiryForm
                    source="contact-page"
                    defaultCity={defaultCity}
                    defaultRequirement={defaultRequirement}
                    defaultBill={queryBill}
                    initialMessage={initialMessage}
                    title=""
                    subtitle=""
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-cream" id="faq">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Frequently asked questions"
                  title="Good questions."
                  accent="Straight answers."
                  description="Costs, system types, generation, maintenance and subsidy — here is what customers usually ask us."
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion items={faqs} defaultOpen={0} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
