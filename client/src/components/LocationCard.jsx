import { Link } from 'react-router-dom'
import Icon from '@/components/Icon'

export default function LocationCard({ location, index = 0 }) {
  return (
    <article className="group relative overflow-hidden rounded-4xl bg-forest-950 text-white">
      <img
        src={location.image || '/images/hero-solar.jpg'}
        alt={`Solar installation service in ${location.name}`}
        className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-45"
        loading="lazy"
        width="800"
        height="600"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/10" />
      <div className="relative flex min-h-[340px] flex-col justify-between p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-white/80 backdrop-blur">
            <Icon name="MapPin" size={12} className="text-solar-400" />
            Madhya Pradesh
          </span>
          <span className="font-display text-4xl text-white/20">0{index + 1}</span>
        </div>
        <div>
          <h3 className="font-display text-3xl text-white">{location.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/65">{location.intro}</p>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/15 pt-4">
            <div className="flex flex-wrap gap-1.5">
              {location.areas?.slice(0, 2).map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-white/10 px-2.5 py-1 text-[0.6rem] font-semibold text-white/65"
                >
                  {area}
                </span>
              ))}
            </div>
            <Link
              to={`/locations/${location.slug}`}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-forest-900 transition hover:bg-solar-400"
              aria-label={`View solar services in ${location.name}`}
            >
              <Icon name="ArrowUpRight" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
