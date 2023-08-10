import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { OverlayType } from './constants'

import { CreateDeckOverlay } from '.'

interface Props {
  type: OverlayType
  isOpen: boolean
  onClickClose: () => void
}

export default function DefaultOverlay({
  type,
  isOpen,
  onClickClose,
}: Props): JSX.Element {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-full h-[100vh] max-w-[420px] mx-auto bg-black bg-opacity-[0.8]">
            {type === OverlayType.CreateDeck && (
              <CreateDeckOverlay onClickClose={onClickClose} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
