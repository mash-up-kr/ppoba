import { motion } from 'framer-motion'
import Image from 'next/image'

function OnboardingFlipOverlay(): JSX.Element {
  return (
    <>
      <div className="absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[300]">
        <span className="animate-ping-red rounded-full w-[40px] border-solid h-[40px] absolute content-[''] bg-alert-red z-[300]" />
        <span className="absolute rounded-full w-[40px] h-[40px] border-solid  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-[''] bg-alert-red z-[300]" />
        <Image
          src="/touch.png"
          alt="touch-image"
          width={20}
          height={20}
          style={{
            zIndex: 2000,
          }}
        />
      </div>
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
          터치하면 내용을 볼 수 있어!
        </p>
      </motion.div>
    </>
  )
}

export default OnboardingFlipOverlay
