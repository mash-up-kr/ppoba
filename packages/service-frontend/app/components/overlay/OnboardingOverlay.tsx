import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@ppoba/ui'

type Props = BaseOverlayProps

export default function OnboardingOverlay({
  isOpen,
  onClickClose = () => {},
}: Props): JSX.Element {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed w-full h-[100vh] max-w-[420px] mx-auto bg-black bg-opacity-[0.8] z-100 top-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col justify-center items-center h-full gap-[10px] px-[45px]">
            <div className="px-[24px] py-[16px] rounded-[32px] bg-[rgba(16,16,16,0.60)] backdrop-blur-[20px] w-full flex justify-start items-center gap-x-[10px]">
              <div className="flex justify-center items-center h-[32px] w-[32px] bg-pink-01 rounded-full">
                <Icon type="touch" width={20} height={20} />
              </div>
              <div className="text-white subtitle-2">
                카드를 터치하면 뒤집히면서
                <br />
                질문을 볼 수 있어!
              </div>
            </div>

            <div className="px-[24px] py-[16px] rounded-[32px] bg-[rgba(16,16,16,0.60)] backdrop-blur-[20px] w-full flex justify-start items-center gap-x-[10px]">
              <div className="flex justify-center items-center h-[32px] w-[32px] bg-teal-01 rounded-full">
                <Icon type="welcome" width={20} height={20} />
              </div>
              <div className="text-white subtitle-2">
                뽑은 본인이 대답하거나
                <br />
                누군가를 지목할 수 있어.
              </div>
            </div>

            <div className="px-[24px] py-[16px] rounded-[32px] bg-[rgba(16,16,16,0.60)] backdrop-blur-[20px] w-full flex justify-start items-center gap-x-[10px]">
              <div className="flex justify-center items-center h-[32px] w-[32px] bg-yellow-01 rounded-full">
                <Icon type="order" width={20} height={20} />
              </div>
              <div className="text-white subtitle-2">
                시작 순서는 자유롭게
                <br />
                정하면 돼! 준비됐어?
              </div>
            </div>

            <div className="flex justify-center items-center pt-[10px]">
              <button
                className="rounded-full bg-white h-[52px] w-[52px] flex justify-center items-center"
                onClick={onClickClose}
              >
                <Icon
                  type="back"
                  width={24}
                  height={24}
                  className="rotate-180"
                />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
