import {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { Variants, useMotionValue, useTransform, motion } from 'framer-motion'

import NormalCardBack from './NormalCardBack'
import NormalCardFront from './NormalCardFront'
import { CardType } from '../../play/Card'

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

const NormalCard = ({
  data,
  type,
  index,
  canDrag,
  cardLocation,
  cardVariants,
  setIndex,
}: {
  data: { id: number; content: string } | null
  type: CardType
  index: number
  canDrag: boolean
  cardLocation: 'front' | 'middle' | 'back'
  cardVariants: Variants
  setIndex: Dispatch<SetStateAction<number>>
}): JSX.Element => {
  const [cardContent, setCardContent] = useState('')
  const [exitX, setExitX] = useState(0)
  const [isFlipped, setIsFlipped] = useState(() => cardLocation !== 'front')

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-150, 0, 150], [-15, 0, 15], {
    clamp: false,
  })

  const indexString = useMemo(
    () =>
      (index + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
    [index],
  )

  const getCardSize = (cardLocation: 'front' | 'middle' | 'back') => {
    switch (cardLocation) {
      case 'front': {
        return 'h-[360px] w-[270px]'
      }
      case 'middle': {
        return 'h-[340px] w-[255px]'
      }
      case 'back': {
        return 'h-[300px] w-[225px]'
      }
    }
  }

  function handleDragEnd(_: any, info: { offset: { x: number } }) {
    if (info.offset.x < -40) {
      setExitX(-500)
      setIndex(index + 1)
    }

    if (info.offset.x > 40) {
      setExitX(500)
      setIndex(index + 1)
    }
  }

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
      drag={canDrag ? 'x' : false}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      onDragEnd={handleDragEnd}
      onClick={() => setIsFlipped(prev => !prev)}
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
      whileHover={{ cursor: 'grab' }}
      whileTap={{ cursor: 'grabbing' }}
      whileDrag={{ cursor: 'grabbing' }}
      className={`absolute rounded-[24px] ${getCardSize(cardLocation)}`}
    >
      <NormalCardFront
        indexString={indexString}
        isFlipped={isFlipped}
        visibleVariants={visibleVariants}
        cardSize={getCardSize(cardLocation)}
        type={type}
      />
      <NormalCardBack
        indexString={indexString}
        isFlipped={isFlipped}
        visibleVariants={visibleVariants}
        cardSize={getCardSize(cardLocation)}
        type={type}
        content={cardContent}
      />
    </motion.div>
  )
}

export default memo(NormalCard)
