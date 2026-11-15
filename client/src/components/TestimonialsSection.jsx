import { Link } from 'react-router-dom'
import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'

export default function TestimonialsSection() {
  return (
    <section className="section bg-cream">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Customer stories"
              title="Real experiences,"
              accent="never invented."
              description="We only publish reviews from genuine customers who have given us permission to share their experience. As our verified review collection grows, their stories will appear here."
            />
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="btn-dark">
                Talk to our team
                <Icon name="ArrowRight" size={17} />
              </Link>
              <span className="flex items-center gap-2 text-xs font-semibold text-ink/45">
                <Icon name="ShieldCheck" size={15} className="text-forest-600" />
                Verified reviews only
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-5xl border border-forest-900/10 bg-white p-7 shadow-soft sm:p-9">
              <span className="absolute -right-4 -top-6 font-display text-[10rem] leading-none text-forest-900/[0.04]">
                “
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="grid h-8 w-8 place-items-center rounded-full bg-forest-50 text-forest-300"
                  >
                    <Icon name="Sun" size={14} />
                  </span>
                ))}
              </div>
              <h3 className="mt-7 font-display text-3xl leading-tight text-forest-900">
                This space is reserved for verified customer stories.
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink/55">
                We do not use fabricated testimonials, stock reviews or misleading rating claims.
                If you have worked with us, we would be glad to hear about your experience.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {['Homeowner', 'Business owner', 'Industry team'].map((label) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-dashed border-forest-900/15 bg-mist/60 p-4"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-forest-300">
                      <Icon name="Quote" size={14} />
                    </span>
                    <p className="mt-3 text-[0.68rem] font-bold uppercase tracking-wider text-ink/35">
                      {label} review
                    </p>
                    <div className="mt-2 h-1.5 w-16 rounded-full bg-forest-900/10" />
                    <div className="mt-1.5 h-1.5 w-24 rounded-full bg-forest-900/[0.07]" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
