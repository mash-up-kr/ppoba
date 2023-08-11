import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Icon } from '@ppoba/ui'

import useIsLoggedIn from '@/hooks/useIsLoggedIn'

type Props = BaseOverlayProps

export default function CreateDeckOverlay({
  isOpen,
  onClickClose = () => {},
}: Props): JSX.Element {
  const router = useRouter()
  const isLoggedIn = useIsLoggedIn()

  const handleClickCreateNewDeck = () => {
    router.push(isLoggedIn ? '/create-title' : '/login')
  }

  const handleClickCreateByTemplate = () => {
    router.push(isLoggedIn ? '/create-template' : '/login')
  }
 
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed w-full h-[100vh] max-w-[420px] mx-auto bg-black bg-opacity-[0.8] z-[100] top-0"
          style={{ backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col justify-center items-center h-full gap-[10px]">
            <button
              onClick={handleClickCreateNewDeck}
              className="flex justify-center items-center w-[240px] px-[24px] py-[16px] subtitle-2 text-white text-center rounded-[32px] bg-black gap-[10px]"
            >
              <div className="p-[6px] bg-orange-01 rounded-full">
                <Icon type="crop" width={20} height={20} />
              </div>
              <div className="flex-1">처음부터 만들기</div>
            </button>
            <button
              onClick={handleClickCreateByTemplate}
              className="flex justify-center items-center w-[240px] px-[24px] py-[16px] subtitle-2 text-white text-center rounded-[32px] bg-black gap-[10px]"
            >
              <div className="p-[6px] bg-blue-01 rounded-full">
                <Icon type="note" width={20} height={20} />
              </div>
              <div className="flex-1">템플릿으로 만들기</div>
            </button>
            <button
              onClick={onClickClose}
              className="mt-[10px] p-[14px] bg-white bg-opacity-[0.1] rounded-full"
            >
              <Icon type="closeLight" width={24} height={24} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
