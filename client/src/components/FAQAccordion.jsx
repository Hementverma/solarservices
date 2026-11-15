import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '@/components/Icon'
import { faqs as defaultFaqs } from '@/data/site'

export default function FAQAccordion({ items = defaultFaqs, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  return (
    <div className="divide-y divide-forest-900/10 rounded-4xl border border-forest-900/10 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                className="flex w-full items-start justify-between gap-5 px-5 py-5 text-left sm:px-7 sm:py-6"
              >
                <span className="flex items-start gap-3.5">
                  <span className="mt-0.5 font-display text-lg text-solar-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-extrabold leading-6 text-forest-900 sm:text-base">
                    {item.question}
                  </span>
                </span>
                <span
                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${
                    isOpen
                      ? 'rotate-180 border-forest-900 bg-forest-900 text-white'
                      : 'border-forest-900/15 text-forest-800'
                  }`}
                >
                  <Icon name="ChevronDown" size={16} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 pl-[4.05rem] pr-8 text-sm leading-7 text-ink/60 sm:px-7 sm:pb-7 sm:pl-[4.55rem]">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
