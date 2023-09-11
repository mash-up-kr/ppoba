import { motion } from 'framer-motion'

function OnboardingSlideOverlay(): JSX.Element {
  return (
    <div className="z-[100] h-[360px] absolute w-full flex justify-center items-center pointer-events-none">
      {/* Bottom Toast */}
      <motion.div
        initial="hidden"
        className="absolute bottom-[-11px] w-full flex justify-center items-end z-[300]"
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
        <p className="z-[100] subtitle-3 text-white px-[20px] py-[10px] bg-[rgba(16,16,16,0.60)] backdrop-blur-sm rounded-[19px]">
          옆으로 넘겨서 다음 카드를 볼 수 있어
        </p>
      </motion.div>
    </div>
  )
}

export default OnboardingSlideOverlay
