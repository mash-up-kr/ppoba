import {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Variants,
  useMotionValue,
  useTransform,
  motion,
  PanInfo,
} from 'framer-motion'

import TaroCardBack from './TaroCardBack'
import TaroCardFront from './TaroCardFront'
import type { CardType } from '../../play/Card'

export const visibleVariants = {
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 0.35,
      bounce: 0.3,
    },
  },
  hidden: {
    scaleX: 0.5,
    opacity: 0,
    transition: {
      type: 'spring',
      duration: 0.35,
    },
  },
}

const TaroCard = ({
  data,
  type,
  exitX,
  cardLocation,
  cardVariants,
  onDragEnd,
}: {
  data: { id: number; content: string; number: number } | null
  type: CardType
  exitX: number
  canDrag: boolean
  cardLocation: 'front' | 'middle' | 'back'
  cardVariants: Variants
  onDragEnd: (_: unknown, info: PanInfo) => void
}): JSX.Element => {
  const [cardContent, setCardContent] = useState('')
  const [isFlipped, setIsFlipped] = useState(() => cardLocation !== 'front')

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-150, 0, 150], [-15, 0, 15], {
    clamp: false,
  })

  const indexString = useMemo(
    () =>
      Number(data?.number).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
    [data?.number],
  )

  useEffect(() => {
    if (cardLocation === 'front') {
      setIsFlipped(false)
    }
  }, [cardLocation])

  if (data === null) {
    return <></>
  }

  return (
    <motion.div
      layout
      initial="initial"
      animate="animate"
      exit="exit"
      custom={exitX}
      variants={cardVariants}
      style={{
        x,
        rotate,
      }}
      drag={'x'}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      onDragEnd={onDragEnd}
      onClick={() => setIsFlipped(true)}
      onAnimationStart={() => {
        if (cardLocation === 'front' && !isFlipped) setCardContent(data.content)
      }}
      onAnimationComplete={() => {
        // Hide card content unless the card is a front card
        // - set cardContent on animation complete since card exit shortly shows behind content without this logic
        if (cardLocation === 'front') {
          setCardContent(data.content)
        }
      }}
      className={`absolute rounded-[24px] cursor-pointer h-[360px] w-[270px]`}
    >
      <TaroCardFront
        indexString={indexString}
        isFlipped={isFlipped}
        visibleVariants={visibleVariants}
        type={type}
      />
      <TaroCardBack
        indexString={indexString}
        isFlipped={isFlipped}
        visibleVariants={visibleVariants}
        type={type}
        content={cardContent}
      />
    </motion.div>
  )
}

export default memo(TaroCard)
