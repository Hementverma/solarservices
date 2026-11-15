import { Link } from 'react-router-dom'
import Icon from '@/components/Icon'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import { brands } from '@/data/site'

const accent = [
  'bg-forest-900 text-white',
  'bg-solar-400 text-forest-950',
  'bg-forest-100 text-forest-900',
  'bg-white text-forest-900',
  'bg-forest-50 text-forest-900',
]

export default function BrandsSection({ compact = false }) {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Brands we work with"
              title="Trusted components,"
              accent="carefully selected."
              description="We work with established solar and electrical brands so your system is built on dependable components. Product selection is based on your project specification, warranty needs and availability."
            />
          </Reveal>
          {!compact && (
            <Reveal delay={0.1}>
              <Link to="/brands" className="btn-secondary shrink-0">
                Our brand approach
                <Icon name="ArrowUpRight" size={17} />
              </Link>
            </Reveal>
          )}
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {brands.map((brand, index) => (
            <Reveal key={brand.name} delay={index * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-forest-900/10 bg-cream p-5 transition hover:-translate-y-1 hover:border-forest-900/20 hover:shadow-soft">
                <div
                  className={`grid h-11 w-11 place-items-center rounded-2xl text-sm font-extrabold ${accent[index]}`}
                >
                  {brand.name
                    .split(' ')
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <p className="mt-5 text-[0.95rem] font-extrabold leading-snug text-forest-900">
                  {brand.name}
                </p>
                <p className="mt-1.5 text-[0.7rem] leading-5 text-ink/45">{brand.note}</p>
                <span className="absolute right-3 top-3 text-forest-900/10 transition group-hover:text-solar-400">
                  <Icon name="Sun" size={22} />
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 max-w-4xl text-xs leading-5 text-ink/40">
          Brand names are shown to indicate product categories we may work with. All trademarks
          belong to their respective owners. Ramesh Solar Services does not claim an authorised
          dealership or official partnership with any brand unless confirmed separately in writing.
        </p>
      </div>
    </section>
  )
}
