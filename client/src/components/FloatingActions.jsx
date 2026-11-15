import { Link, useLocation } from 'react-router-dom'
import Icon from '@/components/Icon'
import { useContent } from '@/context/ContentContext'
import { buildWhatsAppUrl, normalizePhoneHref } from '@/lib/utils'

export default function FloatingActions() {
  const { contact } = useContent()
  const location = useLocation()
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
  const whatsappUrl = buildWhatsAppUrl(
    contact.whatsapp || contact.phoneRaw,
    `Hello Ramesh Solar Services, I would like a free solar consultation.${
      pageUrl ? `\n\nPage: ${pageUrl}` : ''
    }`,
  )
  const phoneHref = normalizePhoneHref(contact.phoneRaw || contact.phone)

  if (location.pathname.startsWith('/admin')) return null

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="group fixed bottom-[86px] right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_-12px_rgba(37,211,102,0.65)] transition hover:-translate-y-1 md:bottom-6 md:right-6"
        aria-label="Chat with Ramesh Solar Services on WhatsApp"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/30 [animation-duration:2.8s]" />
        <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.27-1.38a9.87 9.87 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.86 9.86 0 0 0 19.05 4.9 9.86 9.86 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.22 8.22 0 0 1-1.26-4.35c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.26.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.23 8.21Z" />
        </svg>
      </a>

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-forest-900/10 bg-white/95 px-3 py-2 shadow-[0_-12px_40px_-24px_rgba(18,59,42,0.5)] backdrop-blur md:hidden">
        <a
          href={phoneHref}
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-forest-900"
        >
          <Icon name="Phone" size={19} className="text-forest-700" />
          Call now
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-forest-900"
        >
          <Icon name="MessageCircle" size={19} className="text-[#1eaa55]" />
          WhatsApp
        </a>
        <Link
          to="/contact"
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-forest-900 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-white"
        >
          <Icon name="Send" size={18} className="text-solar-400" />
          Get quote
        </Link>
      </div>
    </>
  )
}
