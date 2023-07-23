'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import { PanInfo, animate, motion, useMotionValue } from 'framer-motion'
import { Button, SecondaryButton } from '@ppoba/ui'

import { Header } from '@/components'

import TaroCardList from './TaroCardList'
import EmptyCard from '../play/EmptyCard'
import { generateCards } from '../play/generateCard'

const INITIAL_INDEX = 0

export default function TaroPlayPage(): JSX.Element {
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isShowBack, setIsShowBack] = useState(false)
  const [cards, setCard] = useState(generateCards(24))
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX)
  const [isExitAnimation, setIsExitAnimation] = useState(false)

  // 카드를 직접 클릭
  const handleClickPrevCard = useCallback(() => {
    if (isShowBack) {
      return
    }
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }, [isShowBack])
  const handleClickNextCard = useCallback(() => {
    if (isShowBack) {
      return
    }
    setCurrentIndex(prev => Math.min(cards.length - 1, prev + 1))
  }, [cards.length, isShowBack])
  const handleClickCurrentCard = useCallback(() => {
    setIsShowBack(true)
  }, [])

  // 드래그
  const calculateNewX = useCallback(
    () => -currentIndex * (containerRef.current?.clientWidth || 0),
    [currentIndex],
  )

  const handleDragEnd = useCallback(
    (e: Event, dragProps: PanInfo) => {
      const clientWidth = containerRef.current?.clientWidth || 0

      const { offset, velocity } = dragProps

      if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
        animate(x, calculateNewX(), { type: 'spring', bounce: 0 })
        return
      }

      if (offset.x > clientWidth / 4) {
        handleClickPrevCard()
      } else if (offset.x < -clientWidth / 4) {
        handleClickNextCard()
      }
    },
    [calculateNewX, handleClickNextCard, handleClickPrevCard, x],
  )

  // 하단 버튼
  const handleClickShuffleButton = useCallback(() => {
    if (isShowBack) {
      return
    }
    const nextCards = [...cards].sort(() => (Math.random() > 0.5 ? 1 : -1))
    setCard(nextCards)
    setCurrentIndex(INITIAL_INDEX)
  }, [cards, isShowBack])

  const handleClickNextButton = useCallback(() => {
    if (isShowBack) {
      handleClickNextCard()
      setIsExitAnimation(true)
    } else {
      handleClickNextCard()
    }
  }, [handleClickNextCard, isShowBack])

  useEffect(() => {
    // exit용 애니메이션
    if (isExitAnimation) {
      setTimeout(() => {
        setIsShowBack(false)
        setIsExitAnimation(false)
        const nextCards = [...cards].filter(
          (_, index) => index !== currentIndex,
        )
        setCard(nextCards)
        if (nextCards.length <= currentIndex) {
          // 카드가 맨 마지막이였던 경우 인덱스를 재설정한다
          setCurrentIndex(nextCards.length - 1)
        }
      }, 300)
    }
  }, [cards, currentIndex, isExitAnimation])

  return (
    <>
      <Header rightIconType="close" />
      <div className="flex flex-col min-h-screen justify-around">
        {/* 게임 정보 */}
        <div className="flex flex-col gap-[4px] pt-[52px] px-[8px] text-center">
          <strong className="headline-1 text-grey-800">
            뉴 매시업 이미지 게임
          </strong>
          <p className="subtitle-3 text-grey-600">남은 카드 {cards.length}장</p>
        </div>

        {/* 플레이 카드 */}
        {cards.length > 0 ? (
          <motion.div
            ref={containerRef}
            className="relative w-[270px] mx-auto h-[384px]"
          >
            <TaroCardList
              cards={cards}
              isExitAnimation={isExitAnimation}
              isShowBack={isShowBack}
              currentIndex={currentIndex}
              onDragEnd={handleDragEnd}
              onClickPrevCard={handleClickPrevCard}
              onClickNextCard={handleClickNextCard}
              onClickCurrentCard={handleClickCurrentCard}
            />
          </motion.div>
        ) : (
          <div className="relative mx-auto w-[270px] h-[360px] z-30">
            <EmptyCard />
          </div>
        )}

        {/* 버튼 */}
        <div className="relative flex gap-[10px] justify-center px-[24px] z-50">
          {cards.length === 0 ? (
            // 남은 카드가 없는 경우
            <Button size="medium">리스트로 가기</Button>
          ) : (
            <>
              {/* 카드가 남은 경우 */}
              <SecondaryButton
                size="small"
                rightIcon="shuffle"
                onClick={handleClickShuffleButton}
              >
                섞기
              </SecondaryButton>
              <Button size="large" onClick={handleClickNextButton}>
                다음 카드 보기
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
