'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import { PanInfo, animate, motion, useMotionValue } from 'framer-motion'
import { Button, SecondaryButton } from '@ppoba/ui'

import { Header } from '@/components'

import TaroCardList from './TaroCardList'
import { generateCards } from '../play/page'

const INITIAL_INDEX = 0

export default function TaroPlayPage(): JSX.Element {
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isShowBack, setIsShowBack] = useState(false)
  const [cards, setCard] = useState(generateCards(5))
  const [currentIndex, setCurrentIndex] = useState(1)

  const calculateNewX = useCallback(
    () => -currentIndex * (containerRef.current?.clientWidth || 0),
    [currentIndex],
  )

  const handleDragEnd = (e: Event, dragProps: PanInfo) => {
    const clientWidth = containerRef.current?.clientWidth || 0

    const { offset, velocity } = dragProps

    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, calculateNewX(), { type: 'spring', bounce: 0 })
      return
    }

    if (offset.x > clientWidth / 4) {
      setCurrentIndex(prev => Math.max(prev - 1, 0))
    } else if (offset.x < -clientWidth / 4) {
      setCurrentIndex(prev => Math.min(cards.length - 1, prev + 1))
    }
  }

  const handleClickShuffleButton = useCallback(() => {
    const nextCards = [...cards].sort(() => (Math.random() > 0.5 ? 1 : -1))
    setCard(nextCards)
    setIsShowBack(false)
    setCurrentIndex(INITIAL_INDEX)
  }, [cards])

  const handleClickNextButton = useCallback(() => {
    const nextCards = [...cards].filter(
      (_, index) => index !== currentIndex - 1,
    )
    setCard(nextCards)
    setIsShowBack(false)
  }, [cards, currentIndex])

  const handleClickPrevCard = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }, [])
  const handleClickNextCard = useCallback(() => {
    setCurrentIndex(prev => Math.min(cards.length - 1, prev + 1))
  }, [cards.length])

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
        <motion.div
          ref={containerRef}
          className="relative w-[270px] mx-auto h-[384px]"
        >
          <TaroCardList
            cards={cards}
            currentIndex={currentIndex}
            onDragEnd={handleDragEnd}
            onClickPrevCard={handleClickPrevCard}
            onClickNextCard={handleClickNextCard}
          />
        </motion.div>

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
