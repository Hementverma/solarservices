import { Link } from 'react-router-dom'
import Icon from '@/components/Icon'

export default function ServiceCard({ service, index = 0 }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-forest-900/10 bg-white shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-card">
      <Link
        to={`/solutions/${service.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-forest-100"
        aria-label={`Learn about ${service.title}`}
      >
        <img
          src={service.image}
          alt={`${service.title} installation by Ramesh Solar Services`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
          width="640"
          height="480"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/55 via-forest-950/5 to-transparent" />
        <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur-md">
          <Icon name={service.icon} size={19} />
        </span>
        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-forest-800 backdrop-blur">
          0{index + 1} · Solar solution
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.65rem] leading-tight text-forest-900">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-ink/60">{service.shortDescription}</p>
        {service.bestFor && (
          <p className="mt-4 text-[0.68rem] font-bold uppercase tracking-wider text-ink/35">
            Best for: <span className="text-forest-700">{service.bestFor}</span>
          </p>
        )}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-forest-900/8 pt-4">
          <Link to={`/solutions/${service.slug}`} className="link-arrow">
            Explore solution
            <Icon name="ArrowRight" size={15} />
          </Link>
          <Link
            to={`/contact?requirement=${encodeURIComponent(service.title)}`}
            className="rounded-full bg-forest-50 px-3.5 py-2 text-xs font-bold text-forest-800 transition hover:bg-forest-900 hover:text-white"
          >
            Enquire
          </Link>
        </div>
      </div>
    </article>
  )
}
