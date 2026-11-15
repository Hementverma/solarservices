import { Link } from 'react-router-dom'
import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import { subsidySlabs } from '@/data/subsidy'
import { formatCurrency } from '@/lib/utils'

const maxSubsidy = Math.max(...subsidySlabs.map((slab) => slab.amount))

export default function SubsidyPromoBanner() {
  return (
    <section className="bg-mist pb-10 sm:pb-14">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl border border-forest-900/10 bg-forest-950 px-6 py-6 text-white shadow-card sm:px-8 sm:py-7">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-solar-400/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 hero-grid opacity-30" />
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-solar-400 text-forest-950 shadow-glow">
                  <Icon name="HandCoins" size={22} />
                </span>
                <div>
                  <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-solar-300">
                    PM Surya Ghar · Residential rooftop solar
                  </p>
                  <p className="mt-1.5 font-display text-2xl leading-tight text-white sm:text-[1.7rem]">
                    Up to {formatCurrency(maxSubsidy)} central subsidy for eligible homes.
                  </p>
                  <p className="mt-2 max-w-xl text-xs leading-5 text-white/50">
                    Understand the indicative benefit, check your eligibility and plan with a local
                    solar team. Private service provider — not a government portal.
                  </p>
                </div>
              </div>
              <Link to="/pm-surya-ghar-subsidy" className="btn-primary btn-sm shrink-0">
                View subsidy details
                <Icon name="ArrowRight" size={15} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
