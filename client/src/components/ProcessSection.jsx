import { Link } from 'react-router-dom'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import Icon from '@/components/Icon'
import { processSteps } from '@/data/site'

export default function ProcessSection({ showHeading = true }) {
  return (
    <section className="section relative overflow-hidden bg-forest-950 text-white" id="process">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-50" />
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-solar-400/10 blur-3xl" />
      <div className="container-page relative">
        {showHeading && (
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="A clear path from"
              accent="enquiry to clean energy."
              description="No jargon, no surprises. Here is how your solar project moves forward with Ramesh Solar Services."
              light
            />
          </Reveal>
        )}

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 transition hover:border-solar-400/40 hover:bg-white/[0.07]">
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-solar-400/10 text-solar-300 ring-1 ring-solar-400/20">
                    <Icon name={step.icon} size={20} />
                  </span>
                  <span className="font-display text-4xl leading-none text-white/10 transition group-hover:text-solar-400/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 text-base font-extrabold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.045] px-6 py-5 sm:flex-row sm:items-center">
            <p className="flex items-center gap-3 text-sm text-white/60">
              <Icon name="ShieldCheck" size={20} className="shrink-0 text-solar-400" />
              Every quotation is based on a site inspection — never a one-size-fits-all estimate.
            </p>
            <Link to="/contact" className="btn-primary btn-sm shrink-0">
              Start with an enquiry
              <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
