import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import SolarCalculator from '@/components/SolarCalculator'
import FAQAccordion from '@/components/FAQAccordion'
import CTASection from '@/components/CTASection'
import { useContent } from '@/context/ContentContext'
import { faqs, SITE_URL } from '@/data/site'
import { formatNumber } from '@/lib/utils'

const calcFaqs = faqs.filter((faq) =>
  [
    'How much electricity can a solar panel generate?',
    'Which solar system is best for my home?',
    'Are government subsidies available?',
    'How much does rooftop solar cost?',
  ].includes(faq.question),
)

export default function Calculator() {
  const { calculator } = useContent()
  const performance = Math.round((calculator.performanceRatio ?? 0.8) * 100)
  const sunHours = Object.entries(calculator.peakSunHoursByCity || {})
  const tariffs = Object.entries(calculator.tariffDefaults || {})

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `${SITE_URL}/calculator`,
    mainEntity: calcFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <SEO
        title="Solar Savings Calculator"
        description="Estimate solar capacity, monthly generation and indicative savings based on your electricity bill, city and property type. Results are indicative, not guaranteed."
        path="/calculator"
        image="/images/ongrid-solar.jpg"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="Solar calculator"
        title="Understand your"
        accent="solar potential."
        description="Start with your electricity bill. Our calculator gives you a transparent, assumption-based estimate of solar capacity, generation and possible savings."
        image="/images/ongrid-solar.jpg"
        breadcrumbs={[{ label: 'Solar Calculator' }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">
            Get an exact proposal
            <Icon name="ArrowRight" size={17} />
          </Link>
          <Link to="/pm-surya-ghar-subsidy" className="btn-secondary">
            Check PM Surya Ghar subsidy
            <Icon name="BadgeIndianRupee" size={17} />
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/55">
            <Icon name="ShieldCheck" size={14} className="text-solar-400" />
            Indicative estimates only
          </span>
        </div>
      </PageHero>

      <section className="section bg-mist">
        <div className="container-page">
          <Reveal>
            <SolarCalculator />
          </Reveal>
          <div className="mt-4 flex flex-col gap-2 text-xs text-ink/40 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Calculations use configurable assumptions. Your final proposal is based on a site
              inspection.
            </p>
            <p>Updated assumptions: {calculator.updatedAt ? new Date(calculator.updatedAt).toLocaleDateString('en-IN') : 'Standard indicative values'}</p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="How we estimate"
              title="Transparent assumptions,"
              accent="clearly labelled."
              description="These are the planning values currently used by the calculator. Our team can explain how they are applied to your specific site."
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-4xl border border-forest-900/10 bg-mist/60 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-forest-700 shadow-sm">
                  <Icon name="Sun" size={20} />
                </span>
                <h3 className="mt-5 text-base font-extrabold text-forest-900">Peak sun hours</h3>
                <p className="mt-2 text-xs leading-5 text-ink/50">
                  Average daily generation potential used for each service city.
                </p>
                <div className="mt-4 space-y-2">
                  {sunHours.map(([city, hours]) => (
                    <div key={city} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink/55">{city}</span>
                      <span className="font-extrabold text-forest-900">{hours} kWh/m²/day</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="h-full rounded-4xl border border-forest-900/10 bg-mist/60 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-forest-700 shadow-sm">
                  <Icon name="SlidersHorizontal" size={20} />
                </span>
                <h3 className="mt-5 text-base font-extrabold text-forest-900">
                  System performance
                </h3>
                <p className="mt-2 text-xs leading-5 text-ink/50">
                  A performance ratio accounts for temperature, wiring, inverter and soiling losses.
                </p>
                <div className="mt-5 rounded-2xl bg-white p-4">
                  <p className="text-[0.62rem] font-extrabold uppercase tracking-wider text-ink/40">
                    Performance ratio
                  </p>
                  <p className="mt-1 font-display text-4xl text-forest-900">{performance}%</p>
                  <p className="mt-1 text-[0.65rem] text-ink/40">
                    Actual performance varies through the year.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-4xl border border-forest-900/10 bg-mist/60 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-forest-700 shadow-sm">
                  <Icon name="IndianRupee" size={20} />
                </span>
                <h3 className="mt-5 text-base font-extrabold text-forest-900">Default tariffs</h3>
                <p className="mt-2 text-xs leading-5 text-ink/50">
                  Indicative ₹/unit values by property type. You can override the tariff in the
                  calculator.
                </p>
                <div className="mt-4 space-y-2">
                  {tariffs.map(([type, value]) => (
                    <div key={type} className="flex items-center justify-between gap-3 text-xs">
                      <span className="font-semibold text-ink/55">{type}</span>
                      <span className="font-extrabold text-forest-900">₹{formatNumber(value, 2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-6 rounded-3xl border border-solar-500/20 bg-solar-50 px-5 py-5 sm:px-7">
            <div className="flex items-start gap-3">
              <Icon name="ShieldCheck" size={20} className="mt-0.5 shrink-0 text-solar-700" />
              <p className="text-xs leading-6 text-forest-900/65">
                <span className="font-extrabold">Important:</span> this calculator provides
                indicative estimates only. It does not account for shading, roof constraints,
                DISCOM charges, tariff slabs, taxes, financing or system degradation. Actual
                generation, savings and project cost will vary. We do not guarantee savings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-cream" id="faq">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Calculator FAQ"
                  title="A few things"
                  accent="to keep in mind."
                  description="Solar estimates are a starting point. These answers explain the context behind the numbers."
                />
                <Link to="/contact" className="btn-dark mt-7">
                  Speak with our team
                  <Icon name="MessageCircle" size={17} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion items={calcFaqs} defaultOpen={0} />
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        title="Turn an estimate into a real proposal."
        description="Share your bill, city and property details. We will inspect your site and prepare a system-specific quotation."
      />
    </>
  )
}
