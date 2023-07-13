'use client'
import { useCallback, useState } from 'react'

import { Button, SecondaryButton } from '@ppoba/ui'

import { Header } from '@/components'

import Card from './Card'
import { CardStyle } from './constant'

const cardTypes = [
  'flower',
  'leaf',
  'sprout',
  'duck',
  'plug',
  'nail',
  'bird',
  'clover',
] as const

const cardVariants = ['normal', 'dark', 'point'] as const

const generateCards = (size: number) => {
  return [...Array(size)].map((_, i) => ({
    id: Math.random().toString() + Math.random().toString(),
    type: cardTypes[Math.floor(Math.random() * cardTypes.length)],
    variant: cardVariants[Math.floor(Math.random() * cardVariants.length)],
    text: '김가나다라마바사아자 김가나다라마바사아자 김가나다라마바사아자 김가나다라마바사아자 김가나다라마바사아자',
  }))
}

export default function DeckPlay(): JSX.Element {
  const [isShowBack, setIsShowBack] = useState(false)
  const [cards, setCard] = useState(generateCards(24))

  const handleClickShuffleButton = useCallback(() => {
    const nextCards = [...cards].sort(() => (Math.random() > 0.5 ? 1 : -1))
    setCard(nextCards)
  }, [cards])

  const handleClickNextButton = useCallback(() => {
    const nextCards = [...cards].slice(1)
    setCard(nextCards)
  }, [cards])

  return (
    <div className="flex flex-col">
      <Header rightIconType="close" />
      {/* 게임 정보 */}
      <div className="flex flex-col gap-[4px] pt-[52px] px-[8px]">
        <strong className="headline-1 text-grey-800">
          뉴 매시업 이미지 게임
        </strong>
        <p className="subtitle-3 text-grey-600">남은 카드 49장</p>
      </div>

      {/* 플레이 카드 */}
      <div className="relative mt-[50px] mx-auto transition-all z-30">
        <div className="relative z-20">
          {cards.slice(0, 1).map(card => (
            <Card
              key={card.id}
              type={card.type}
              text={card.text}
              variant={card.variant}
              isShowBack={isShowBack}
            />
          ))}
        </div>
        {cards.length > 2 && (
          <div className="absolute top-[-42px] scale-[0.83] opacity-60 z-0">
            <div
              className={`w-[270px] h-[360px] content-[''] rounded-[24px] ${
                CardStyle[cards[1].type][cards[1].variant]
              }`}
            />
          </div>
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
  )
}
