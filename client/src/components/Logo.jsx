import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function Logo({ light = false, compact = false, className = '' }) {
  return (
    <Link
      to="/"
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label="Ramesh Solar Services home"
    >
      <span
        className={cn(
          'relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl transition-transform duration-300 group-hover:-rotate-3',
          light ? 'bg-white/10 ring-1 ring-white/15' : 'bg-forest-900',
        )}
      >
        <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden="true">
          <circle cx="24" cy="18" r="6.4" fill="#F4B942" />
          <path
            d="M32.8 11.2 34.8 9.2M15.2 11.2 13.2 9.2M12 27h-3.6m31.2 0h-3.6M24 6.8V3.4"
            stroke="#F4B942"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d="M10 32h28l-3.8 8.5H13.8L10 32Z" fill={light ? '#fff' : '#F4B942'} />
          <path d="M16.8 32v8.5m7.2-8.5v8.5m7.2-8.5v8.5M10 36.3h28" stroke="#123B2A" strokeWidth="1.6" />
        </svg>
      </span>
      {!compact && (
        <span className="leading-none">
          <span
            className={cn(
              'block font-display text-[1.55rem] tracking-[-0.01em]',
              light ? 'text-white' : 'text-forest-900',
            )}
          >
            Ramesh Solar
          </span>
          <span
            className={cn(
              'mt-1 block text-[0.55rem] font-bold uppercase tracking-[0.3em]',
              light ? 'text-solar-300' : 'text-forest-500',
            )}
          >
            Services · Madhya Pradesh
          </span>
        </span>
      )}
    </Link>
  )
}
