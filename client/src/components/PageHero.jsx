import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Icon from '@/components/Icon'

export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  image = '/images/hero-solar.jpg',
  breadcrumbs = [],
  children,
  align = 'left',
}) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-forest-950 text-white">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        width="1600"
        height="900"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/88 to-forest-950/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/20" />
      <div className="absolute inset-0 hero-grid opacity-30" />
      <div className="container-page relative py-14 sm:py-20 lg:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}
        >
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol
              className={`flex flex-wrap items-center gap-1.5 text-[0.68rem] font-semibold text-white/40 ${
                align === 'center' ? 'justify-center' : ''
              }`}
            >
              <li>
                <Link to="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <Icon name="ChevronRight" size={12} className="text-white/25" />
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-solar-300">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-solar-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-solar-400" />
              {eyebrow}
            </span>
          )}

          <h1 className="mt-6 font-display text-[2.9rem] leading-[0.99] tracking-[-0.025em] sm:text-6xl lg:text-[4.5rem]">
            {title} {accent && <span className="italic text-solar-400">{accent}</span>}
          </h1>

          {description && (
            <p
              className={`mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8 ${
                align === 'center' ? 'mx-auto' : ''
              }`}
            >
              {description}
            </p>
          )}

          {children}
        </motion.div>
      </div>
    </section>
  )
}
