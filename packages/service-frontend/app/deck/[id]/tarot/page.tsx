'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { redirect } from 'next/navigation'
import { api } from '@ppoba/api'

import TaroCardList from './components/TaroCardList'
import { GameLayout } from '../components'
import EmptyCard from '../play/EmptyCard'
import { PlayCard, generateCards } from '../play/generateCard'

const INITIAL_INDEX = 0

const animateVariants = {
  initial: {
    bottom: -30,
    opacity: 0.8,
  },
  animate: {
    bottom: 0,
    opacity: 1,
  },
}

interface Props {
  params: {
    id: string
  }
}

export default function TaroPlayPage({ params }: Props): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isShowBack, setIsShowBack] = useState(false)
  const { data, isError } = useQuery(
    ['getDeck', params.id],
    () => api.deck.getDeck({ deckId: params.id }),
    {
      suspense: true,
    },
  )
  const { data: cardListData, isError: isCardListError } = useQuery(
    ['getCardList', params.id],
    () => api.card.getCards({ deckId: params.id }),
    {
      suspense: true,
    },
  )
  const [cards, setCard] = useState<PlayCard[]>([])
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX)
  const [isRightExitAnimation, setIsRightExitAnimation] = useState(false)
  const [isLeftExitAnimation, setIsLeftExitAnimation] = useState(false)
  const [triggerShuffle, setTriggerShuffle] = useState(false)

  useEffect(() => {
    if (cardListData?.result) {
      setCard(generateCards(cardListData.result))
    }
  }, [cardListData])

  // 카드를 직접 클릭
  const handleClickPrevCard = useCallback(() => {
    if (isShowBack) {
      setIsLeftExitAnimation(true)
      return
    }
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }, [isShowBack])

  const handleClickNextCard = useCallback(() => {
    if (isShowBack) {
      setIsRightExitAnimation(true)
      return
    }
    setCurrentIndex(prev => Math.min(cards.length - 1, prev + 1))
  }, [cards.length, isShowBack])

  const handleClickCurrentCard = useCallback(() => {
    setIsShowBack(true)
  }, [])

  // 하단 버튼
  const handleClickNextButton = useCallback(() => {
    if (isShowBack) {
      handleClickNextCard()
      setIsRightExitAnimation(true)
    } else {
      handleClickNextCard()
    }
  }, [handleClickNextCard, isShowBack])

  useEffect(() => {
    // exit용 애니메이션
    if (isRightExitAnimation) {
      setTimeout(() => {
        setIsShowBack(false)
        setIsRightExitAnimation(false)
        const nextCards = [...cards].filter(
          (_, index) => index !== currentIndex,
        )
        setCard(nextCards)

        if (nextCards.length <= currentIndex) {
          // 카드가 맨 마지막이였던 경우 인덱스를 재설정한다
          setCurrentIndex(nextCards.length - 1)
        }
      })
    }
  }, [cards, currentIndex, isRightExitAnimation])

  useEffect(() => {
    if (isLeftExitAnimation) {
      // prev를 설정한 경우는 왼쪽으로 애니메이션을 준다
      const targetIndex = currentIndex
      setIsShowBack(false)
      setIsLeftExitAnimation(false)
      setCurrentIndex(prev => Math.max(prev - 1, 0))

      setTimeout(() => {
        const nextCards = [...cards].filter((_, index) => index !== targetIndex)
        setCard(nextCards)
      })
    }
  }, [cards, currentIndex, isLeftExitAnimation])

  useEffect(() => {
    if (triggerShuffle) {
      if (isShowBack) {
        setTriggerShuffle(false)
        return
      }

      setTimeout(() => {
        const nextCards = [...cards].sort(() => (Math.random() > 0.5 ? 1 : -1))
        setCard(nextCards)
        setCurrentIndex(INITIAL_INDEX)
        setTriggerShuffle(false)
      }, 2000)
    }
  }, [cards, isShowBack, triggerShuffle])

  if (isError || isCardListError) {
    redirect('/404')
  }

  return (
    <>
      <GameLayout
        title={data?.result?.name ?? ''}
        length={cards.length}
        triggerShuffle={triggerShuffle}
        isFinishGame={cards.length === 0}
        onClickShuffle={() => setTriggerShuffle(true)}
        onClickNextCard={handleClickNextButton}
      >
        <div className="relative w-[270px] h-full mx-auto z-50">
          {/* 플레이 카드 */}
          {cards.length > 0 ? (
            <motion.div ref={containerRef} className="h-[360px] relative z-50">
              <TaroCardList
                cards={cards}
                isRightExitAnimation={isRightExitAnimation}
                isLeftExitAnimation={isLeftExitAnimation}
                isShowBack={isShowBack}
                currentIndex={currentIndex}
                onClickPrevCard={handleClickPrevCard}
                onClickNextCard={handleClickNextCard}
                onClickCurrentCard={handleClickCurrentCard}
                setCurrentIndex={setCurrentIndex}
                setIsShowBack={setIsShowBack}
              />
            </motion.div>
          ) : (
            <motion.div
              className="h-[360px] z-30"
              variants={animateVariants}
              initial={'initial'}
              animate={'animate'}
            >
              <EmptyCard />
            </motion.div>
          )}
        </div>
      </GameLayout>
    </>
  )
}
