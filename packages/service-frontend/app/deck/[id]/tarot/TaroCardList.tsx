'use client'

import { Fragment, useEffect, useState } from 'react'

import { AnimatePresence, PanInfo, motion } from 'framer-motion'

import type { CardType } from '../play/Card'
import Card from '../play/Card'

const animateVariants = {
  leftOutSideToCenter: {
    rotate: '-30deg',
    top: 60,
    left: -280,
    zIndex: 100,
  },
  leftOutSide: {
    rotate: '-30deg',
    top: 100,
    left: -340,
    zIndex: 1,
  },
  leftSide: {
    rotate: '-15deg',
    top: 45,
    left: -230,
    zIndex: 80,
  },
  center: {
    rotate: 0,
    top: 0,
    left: 0,
    zIndex: 30,
  },
  rightSide: {
    rotate: '15deg',
    top: 45,
    left: 245,
    zIndex: 10,
  },
  rightOutSide: {
    rotate: '30deg',
    top: 100,
    left: 340,
    zIndex: 1,
  },
  exit: {
    top: 0,
    left: 0,
    rotate: 0,
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
  isExitAnimation: boolean
  onClickPrevCard: VoidFunction
  onClickNextCard: VoidFunction
  onClickCurrentCard: VoidFunction
}

function TaroCardList({
  cards,
  isShowBack,
  currentIndex,
  isExitAnimation,
  onClickPrevCard,
  onClickNextCard,
  onClickCurrentCard,
}: Props): JSX.Element {
  const currentCard = cards[currentIndex]
  const isRightAnimation = currentIndex !== cards.length - 1
  const [isShowMain, setIsShowMain] = useState(true)

  useEffect(() => {
    if (isExitAnimation && isRightAnimation) {
      setIsShowMain(false)

      setTimeout(() => {
        setIsShowMain(true)
      }, 50)
    }
  }, [isExitAnimation, isRightAnimation])

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
                  className={`flex w-[255px] h-[340px] absolute transition-all ease-out duration-150 z-[100] ${
                    isShowBack ? 'opacity-30' : 'opacity-50'
                  }`}
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
              {isShowMain && currentIndex === index && (
                <motion.div
                  key={index}
                  className={`flex w-[270px] h-[360px] absolute duration-150 z-[50] ${
                    isShowBack ? 'opacity-100' : 'opacity-[0.98]'
                  }`}
                  variants={animateVariants}
                  initial={'rightSide'}
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
                  className={`flex w-[255px] h-[340px] absolute transition-all ease-out duration-150 z-[30] ${
                    isShowBack ? 'opacity-30' : 'opacity-80'
                  }`}
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

      {/* 카드 넘길때 센터에서 슬라이드 업 */}
      <AnimatePresence>
        {isExitAnimation && (
          <motion.div
            className={`flex w-[270px] h-[360px] absolute z-30 duration-150 opacity-100`}
            exit={{
              top: -300,
              opacity: 0,
            }}
          >
            <Card
              type={currentCard.type}
              number={currentCard.number}
              text={currentCard.text}
              isShowBack={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default TaroCardList
