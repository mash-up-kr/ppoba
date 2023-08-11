import { motion } from 'framer-motion'
import { Icon } from '@ppoba/ui'

function OnboardingFlipOverlay(): JSX.Element {
  return (
    <div className="z-[100] h-[360px] w-full flex justify-center items-center relative pointer-events-none">
      <motion.div
        className="w-[60px] h-[60px] flex justify-center items-center bg-alert-red bg-opacity-[0.4] rounded-full"
        animate={{
          scale: [1, 0.8, 1],
          opacity: [1, 0.2, 1],
          transition: { duration: 1, repeat: Infinity },
        }}
      >
        <motion.div className="w-[40px] h-[40px] flex justify-center items-center bg-alert-red bg-opacity-[0.4] rounded-full" />
      </motion.div>
      <Icon
        type="touchWhite"
        height={20}
        width={20}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Bottom Toast */}
      <motion.div
        initial="hidden"
        className="absolute bottom-[-31px] w-full flex justify-center items-end"
        animate={{
          y: [20, 0],
          opacity: [0, 1],
        }}
        exit={{
          y: 20,
          opacity: 0,
        }}
        transition={{ type: 'ease', duration: 0.8 }}
      >
        <p className="subtitle-3 text-white px-[20px] py-[10px] bg-[rgba(16,16,16,0.60)] backdrop-blur-sm rounded-[19px]">
          터치하면 내용을 볼 수 있어!
        </p>
      </motion.div>
    </div>
  )
}

export default OnboardingFlipOverlay
