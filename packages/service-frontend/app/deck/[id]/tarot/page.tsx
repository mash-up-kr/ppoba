'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import { api } from '@ppoba/api'
import { Button, SecondaryButton } from '@ppoba/ui'

import Alert from '@/app/Alert'
import { Header } from '@/app/components'
import BottomCta from '@/app/components/common/BottomCta'
import loadingDeckLottie from '@/public/lottie/loadingDeckLottie.json'

import TaroCardList from './components/TaroCardList'
import { GameTitle } from '../components'
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
  const [isShowNotification, setIsShowNotification] = useState(true)
  const [isCloseOverlayOpen, setIsCloseOverlayOpen] = useState(false)
  const [alertPhrase, setAlertPhrase] = useState<'touch' | 'slide' | 'none'>(
    'touch',
  )
  const [triggerShuffle, setTriggerShuffle] = useState(false)

  useEffect(() => {
    if (cardListData?.result) {
      setCard(generateCards(cardListData.result))
    }
  }, [cardListData])

  const handleShowingEvent = useCallback(() => {
    setAlertPhrase(prev => {
      if (prev === 'touch') {
        return 'slide'
      }
      if (prev === 'slide') {
        return 'none'
      }
      return 'none'
    })
  }, [])

  const handleNotification = useCallback(() => {
    setIsShowNotification(() => {
      if (alertPhrase === 'touch') {
        return false
      }
      return true
    })
  }, [alertPhrase])

  // 카드를 직접 클릭
  const handleClickPrevCard = useCallback(() => {
    handleNotification()
    if (isShowBack) {
      setAlertPhrase('none')
      setIsExitAnimation(true)
      return
    }
    setIsShowNotification(() => {
      if (alertPhrase === 'touch') {
        return false
      }
      return true
    })
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }, [alertPhrase, handleNotification, isShowBack])
  const handleClickNextCard = useCallback(() => {
    handleNotification()
    if (isShowBack) {
      setAlertPhrase('none')
      setIsExitAnimation(true)
      return
    }
    setIsShowNotification(() => {
      if (alertPhrase === 'touch') {
        return false
      }
      return true
    })
    setCurrentIndex(prev => Math.min(cards.length - 1, prev + 1))
  }, [alertPhrase, cards.length, handleNotification, isShowBack])

  const handleClickCurrentCard = useCallback(() => {
    handleShowingEvent()
    setIsShowBack(true)
  }, [handleShowingEvent])

  // 하단 버튼
  const handleClickNextButton = useCallback(() => {
    if (isShowBack) {
      setAlertPhrase('none')
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
    if (!isShowNotification && alertPhrase === 'touch') {
      setTimeout(() => {
        setIsShowNotification(true)
      }, 800)
    }
  }, [alertPhrase, isShowNotification])

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
        onClickRightIcon={() => {
          if (cards.length === 0) {
            router.push('')
          } else {
            setIsCloseOverlayOpen(true)
          }
        }}
      />
      <div className="flex flex-col gap-[64px] min-h-screen">
        {/* 게임 정보 */}
        <GameTitle title={data?.result?.name ?? ''} length={cards.length} />

        <div className="relative w-[270px] mx-auto z-50">
          {/* 플레이 카드 */}
          {cards.length > 0 ? (
            <motion.div ref={containerRef} className="h-[384px] relative z-50">
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
              {isShowNotification && alertPhrase === 'touch' && (
                <div
                  className="absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[300]"
                  onClick={handleClickCurrentCard}
                >
                  <span className="animate-ping-red rounded-full w-[40px] border-solid h-[40px] absolute content-[''] bg-alert-red z-[300]" />
                  <span className="absolute rounded-full w-[40px] h-[40px] border-solid  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-[''] bg-alert-red z-[300]" />
                  <Image
                    src="/touch.png"
                    alt="touch-image"
                    width={20}
                    height={20}
                    style={{
                      zIndex: 2000,
                    }}
                  />
                </div>
              )}
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

          {isShowNotification && alertPhrase !== 'none' && (
            <motion.div className="animate-top-down-bounce text-white absolute subtitle-3 whitespace-nowrap w-fit bottom-0 left-1/2 -translate-x-1/2 py-[10px] px-[20px] rounded-[19px] bg-[rgba(16,16,16,0.60)] z-[100] backdrop-blur-sm">
              {alertPhrase === 'touch'
                ? '터치하면 내용을 볼 수 있어!'
                : '옆으로 넘겨서 다음 카드를 볼 수 있어'}
            </motion.div>
          )}
        </div>

      {/* 버튼 */}
      <BottomCta className="flex justify-center items-center bottom-[40px] gap-x-[10px] px-[24px] z-[100]">
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
