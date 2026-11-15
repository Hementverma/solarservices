import { AnimatePresence, motion } from 'framer-motion'
import Icon from '@/components/Icon'

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Delete',
  onCancel,
  onConfirm,
  loading = false,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] grid place-items-center bg-forest-950/60 p-4 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
            aria-label={title}
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-600">
              <Icon name="Trash2" size={22} />
            </span>
            <h3 className="mt-5 text-lg font-extrabold text-forest-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/55">{description}</p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="admin-btn border border-forest-900/15 bg-white text-forest-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="admin-btn bg-red-600 text-white hover:bg-red-700"
              >
                {loading ? <Icon name="Loader2" size={16} className="animate-spin" /> : <Icon name="Trash2" size={16} />}
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
