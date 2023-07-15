'use client'
import { useCallback, useState } from 'react'

import { Button, SecondaryButton } from '@ppoba/ui'

import { Header } from '@/app/components/common'

import Card, { CardType } from './Card'
import { CardStyle } from './constant'

const cardTypes: CardType[] = [
  'flower',
  'feather',
  'sprout',
  'turnip',
  'plug',
  'nail',
  'swallow',
  'clover',
]

const cardVariants = ['normal', 'dark', 'point'] as const

const generateCards = (size: number) => {
  return [...Array(size)].map((_, i) => ({
    id: Math.random().toString() + Math.random().toString(),
    number: i + 1,
    type: cardTypes[Math.floor(Math.random() * cardTypes.length)],
    variant: cardVariants[Math.floor(Math.random() * cardVariants.length)],
    text: '김가나다라마바사아자 김가나다라마바사아자 김가나다라마바사아자 김가나다라마바사아자 김가나다라마바사아자',
  }))
}

export default function DeckPlay(): JSX.Element {
  const [isShowBack, setIsShowBack] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cards, setCard] = useState(generateCards(24))

  const handleClickShuffleButton = useCallback(() => {
    // currentIndex부터 마지막카드까지만 섞는다.
    // 이때
    const nextCards = [...cards]
      .slice(currentIndex)
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
    setCard(nextCards)
  }, [cards, currentIndex])

  const handleClickNextButton = useCallback(() => {
    setCurrentIndex(prev => prev + 1)
  }, [])

  return (
    <>
      <Header rightIconType="close" />
      <div className="flex flex-col min-h-screen justify-around">
        {/* 게임 정보 */}
        <div className="flex flex-col gap-[4px] pt-[52px] px-[8px] text-center">
          <strong className="headline-1 text-grey-800">
            뉴 매시업 이미지 게임
          </strong>
          <p className="subtitle-3 text-grey-600">
            남은 카드 {cards.length - currentIndex}장
          </p>
        </div>

        {/* 플레이 카드 */}
        <div className="relative mt-[76px] mx-auto w-[270px] h-[360px] z-30">
          {cards.slice(currentIndex, currentIndex + 1).map(card => (
            <Card
              key={card.id}
              number={card.number}
              type={card.type}
              text={card.text}
              className="z-30"
              isShowBack={isShowBack}
            />
          ))}
          {currentIndex < cards.length - 1 && (
            <div
              className={`absolute w-[255px] h-[340px] top-[-16px] left-1/2 -translate-x-1/2 z-10 rounded-[24px] ${
                CardStyle[cards[currentIndex + 1].type].background
              }`}
            />
          )}
          {currentIndex < cards.length - 2 && (
            <div
              className={`absolute w-[225px] h-[300px] top-[-32px] left-1/2 -translate-x-1/2 z-0 opacity-60 rounded-[24px] ${
                CardStyle[cards[currentIndex + 2].type].background
              }`}
            />
          )}
        </div>

        {/* 버튼 */}
        <div className="flex gap-[10px] mt-[62px]">
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
        </div>
      </div>
    </>
  )
}
