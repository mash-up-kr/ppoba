import { Fragment } from 'react'

import { PanInfo, motion } from 'framer-motion'

import type { CardType } from '../play/Card'
import Card from '../play/Card'

const animateVariants = {
  leftOutSide: {
    top: 100,
    left: -340,
    opacity: '0',
    zIndex: 1,
  },
  leftSide: {
    rotate: '-15deg',
    top: 45,
    left: -230,
    opacity: '0.6',
    zIndex: 10,
  },
  center: {
    rotate: 0,
    top: 0,
    left: 0,
    zIndex: 30,
    opacity: '0.95',
  },
  rightSide: {
    rotate: '15deg',
    top: 45,
    left: 245,
    opacity: '0.6',
    zIndex: 10,
  },
  rightOutSide: {
    top: 100,
    left: 340,
    opacity: '0',
    zIndex: 1,
  },
  exit: {
    top: 0,
    left: 70,
    rotate: 0,
    opacity: 1,
  },
}

interface Props {
  cards: {
    id: string
    number: number
    type: CardType
    text: string
  }[]
  isShowBack: boolean
  currentIndex: number
  onDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void
  onClickPrevCard: VoidFunction
  onClickNextCard: VoidFunction
  onClickCurrentCard: VoidFunction
}

function TaroCardList({
  cards,
  isShowBack,
  currentIndex,
  onDragEnd,
  onClickPrevCard,
  onClickNextCard,
  onClickCurrentCard,
}: Props): JSX.Element {
  return (
    <>
      {cards.map((card, index) => {
        const inShow = currentIndex - 1 <= index && index <= currentIndex + 1
        return (
          inShow && (
            <Fragment key={index}>
              {/* prev */}
              {currentIndex - 1 === index && (
                <motion.div
                  key={index}
                  className="flex w-[255px] h-[340px] absolute transition-all ease-out duration-300"
                  variants={animateVariants}
                  initial="leftOutSide"
                  animate="leftSide"
                  exit={'exit'}
                >
                  <Card
                    type={card?.type}
                    number={card?.number}
                    text={card?.text}
                    onClick={onClickPrevCard}
                  />
                </motion.div>
              )}
              {/* main */}
              {currentIndex === index && (
                <motion.div
                  key={index}
                  className="flex w-[270px] h-[360px] absolute z-30 duration-150"
                  drag="x"
                  dragListener={false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={onDragEnd}
                  variants={animateVariants}
                  initial={'center'}
                  animate={'center'}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                >
                  <Card
                    type={card?.type}
                    text={card?.text}
                    number={card?.number}
                    isShowBack={isShowBack}
                    onClick={onClickCurrentCard}
                  />
                </motion.div>
              )}
              {/* next */}
              {currentIndex + 1 === index && (
                <motion.div
                  key={index}
                  className="flex w-[255px] h-[340px] absolute transition-all ease-out duration-300"
                  variants={animateVariants}
                  initial="rightOutSide"
                  animate="rightSide"
                  exit={'exit'}
                >
                  <Card
                    type={card?.type}
                    number={card?.number}
                    text={card?.text}
                    onClick={onClickNextCard}
                  />
                </motion.div>
              )}
            </Fragment>
          )
        )
      })}
    </>
  )
}

export default TaroCardList
