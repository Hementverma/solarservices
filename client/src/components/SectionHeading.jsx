import { cn } from '@/lib/utils'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className = '',
  accent,
}) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <div className={cn('flex max-w-3xl flex-col', alignment, className)}>
      {eyebrow && (
        <span className={cn('eyebrow mb-4', light && 'border-white/15 bg-white/5 text-solar-300')}>
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]',
          light ? 'text-white' : 'text-forest-900',
        )}
      >
        {title} {accent && <span className="italic text-solar-400">{accent}</span>}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 max-w-2xl text-base leading-7 sm:text-[1.05rem]',
            light ? 'text-white/70' : 'text-ink/65',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
