'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'
import { redirect, useRouter } from 'next/navigation'
import { api } from '@ppoba/api'
import { Button, SecondaryButton } from '@ppoba/ui'

import Alert from '@/app/Alert'
import { Header } from '@/app/components'
import BottomCta from '@/app/components/common/BottomCta'
import loadingDeckLottie from '@/public/lottie/loadingDeckLottie.json'

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
  const router = useRouter()
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
  const [isExitAnimation, setIsExitAnimation] = useState(false)
  const [isCloseOverlayOpen, setIsCloseOverlayOpen] = useState(false)
  const [triggerShuffle, setTriggerShuffle] = useState(false)

  useEffect(() => {
    if (cardListData?.result) {
      setCard(generateCards(cardListData.result))
    }
  }, [cardListData])

  // 카드를 직접 클릭
  const handleClickPrevCard = useCallback(() => {
    if (isShowBack) {
      setIsExitAnimation(true)
      return
    }
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }, [isShowBack])

  const handleClickNextCard = useCallback(() => {
    if (isShowBack) {
      setIsExitAnimation(true)
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
      })
    }
  }, [cards, currentIndex, isExitAnimation])

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
      <Header
        rightIconType="close"
        className="h-[60px]"
        onClickRightIcon={() => {
          if (cards.length === 0) {
            router.push('')
          } else {
            setIsCloseOverlayOpen(true)
          }
        }}
      />
      <GameLayout title={data?.result?.name ?? ''} length={cards.length}>
        <div className="relative w-[270px] h-full mx-auto z-50">
          {/* 플레이 카드 */}
          {cards.length > 0 ? (
            <motion.div ref={containerRef} className="h-[360px] relative z-50">
              <TaroCardList
                cards={cards}
                isExitAnimation={isExitAnimation}
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

      {/* 버튼 */}
      <BottomCta className="flex justify-center items-center bottom-[40px] gap-x-[10px] px-[24px] z-[50]">
        {cards.length === 0 && (
          <Button size="medium" onClick={() => router.push('/')}>
            리스트로 가기
          </Button>
        )}

        {cards.length !== 0 && (
          <>
            <SecondaryButton
              size="small"
              rightIcon="shuffle"
              onClick={() => setTriggerShuffle(true)}
            >
              섞기
            </SecondaryButton>
            <Button size="medium" onClick={handleClickNextButton}>
              다음 카드 보기
            </Button>
          </>
        )}
      </BottomCta>

      {/* Overlay */}
      {isCloseOverlayOpen && (
        <Alert
          alertPhrase={`아직 게임이 끝나지 않았어.\n정말 그만둘거야?`}
          closePhrase="계속하기"
          confirmPhrase="그만둘래"
          onClickClose={() => setIsCloseOverlayOpen(false)}
          onClickConfirm={() => router.back()}
        />
      )}

      {/* Shuffle Layout */}
      <AnimatePresence>
        {triggerShuffle && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            style={{
              backdropFilter: 'blur(16px)',
            }}
            className="fixed w-full max-w-[420px] top-0 z-[100] bg-[rgba(0,0,0,0.70)] h-full text-light flex justify-center items-center headline-2"
          >
            <Lottie animationData={loadingDeckLottie} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
