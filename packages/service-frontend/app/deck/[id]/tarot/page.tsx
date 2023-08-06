'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import { motion, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, Icon, SecondaryButton } from '@ppoba/ui'

import Alert from '@/app/Alert'
import { Header } from '@/app/components'

import TaroCardList from './TaroCardList'
import EmptyCard from '../play/EmptyCard'
import { generateCards } from '../play/generateCard'

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

export default function TaroPlayPage(): JSX.Element {
  const router = useRouter()
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isShowBack, setIsShowBack] = useState(false)
  const [cards, setCard] = useState(generateCards(5))
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX)
  const [isExitAnimation, setIsExitAnimation] = useState(false)
  const [isShowNotification, setIsShowNotification] = useState(true)
  const [isCloseOverlayOpen, setIsCloseOverlayOpen] = useState(false)
  const [alertPhrase, setAlertPhrase] = useState<'touch' | 'slide' | 'none'>(
    'touch',
  )

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
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }, [handleNotification, isShowBack])
  const handleClickNextCard = useCallback(() => {
    handleNotification()
    if (isShowBack) {
      setAlertPhrase('none')
      setIsExitAnimation(true)
      return
    }
    setCurrentIndex(prev => Math.min(cards.length - 1, prev + 1))
  }, [cards.length, handleNotification, isShowBack])
  const handleClickCurrentCard = useCallback(() => {
    handleShowingEvent()
    setIsShowBack(true)
  }, [handleShowingEvent])

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

  return (
    <>
      <Header
        rightIconType="close"
        onClickRightIcon={() => setIsCloseOverlayOpen(true)}
      />
      <div className="flex flex-col min-h-screen justify-around">
        {/* 게임 정보 */}
        <div className="flex flex-col gap-[4px] pt-[52px] px-[8px] text-center">
          <strong className="headline-1 text-grey-800">
            뉴 매시업 이미지 게임
          </strong>
          <div className="flex mx-auto gap-[4px]">
            <span className="subtitle-3 text-grey-600">카드</span>
            <strong className="headline-5 text-grey-600">
              {cards.length}장
            </strong>
            <span className="subtitle-3 text-grey-600">남았어!</span>
          </div>
        </div>

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
        <div className="relative flex gap-[10px] justify-center px-[24px] z-50">
          {cards.length === 0 ? (
            // 남은 카드가 없는 경우
            <motion.div
              className="relative"
              variants={animateVariants}
              initial={'initial'}
              animate={'animate'}
            >
              <Button size="medium">리스트로 가기</Button>
            </motion.div>
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
    </>
  )
}
