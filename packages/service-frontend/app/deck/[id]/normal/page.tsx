'use client'

import { useEffect, useMemo, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button, Icon, SecondaryButton } from '@ppoba/ui'

import { Header } from '@/app/components'
import BottomCta from '@/app/components/common/BottomCta'

import NormalCard from './components/NormalCard'
import OnboardingFlipOverlay from './components/OnboardingFlipOverlay'
import OnboardingSlideOverlay from './components/OnboardingSlideOverlay'
import EmptyCard from '../play/EmptyCard'
import { cardTypes } from '../play/generateCard'

enum OnboardingState {
  FLIP,
  SLIDE,
  DONE,
}

export default function NormalPlayPage(): JSX.Element {
  const SAMPLE_DATA = [
    {
      id: 0,
      content: `과연 과연!
      매시업에서 제일
      바쁜 것 같은 사람은 누구인가요?`,
    },
    {
      id: 1,
      content: 'This is the a game card',
    },
    {
      id: 2,
      content: 'This is the a game card',
    },
    {
      id: 3,
      content: 'This is the a game card',
    },
    {
      id: 4,
      content: 'This is the a game card',
    },
    {
      id: 5,
      content: 'This is the a game card',
    },
    {
      id: 6,
      content: 'This is the a game card',
    },
  ]

  const router = useRouter()
  const [types, setTypes] = useState(cardTypes)
  const [curIndex, setCurIndex] = useState(0)
  const [triggerShuffle, setTriggerShuffle] = useState(false)

  const [onboardingState, setOnboardingState] = useState(OnboardingState.FLIP)

  const variantsBackCard = {
    initial: { y: -100, opacity: 0 },
    animate: { y: -32, opacity: 1, transition: { delay: 0.5 } },
  }

  const variantsMiddleCard = {
    initial: { y: 0, opacity: 1 },
    animate: { y: -16, opacity: 1 },
  }

  const variantsFrontCard = {
    animate: { y: 0, opacity: 1 },
    exit: (custom: any) => ({
      x: custom,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  }

  useEffect(() => {
    if (curIndex !== 0) setOnboardingState(OnboardingState.DONE)
  }, [curIndex])

  useEffect(() => {
    if (triggerShuffle) {
      setTimeout(() => {
        setTypes(prev => [...prev.sort(() => 0.5 - Math.random())])
        setTriggerShuffle(false)
      }, 1500)
    }
  }, [triggerShuffle])

  return (
    <div className="text-grey-800">
      <Header rightIconType="close" className="h-[60px]" />

      <main className="min-h-screen flex items-center">
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* Title Section */}
          <div>
            <h1 className="headline-2 text-black text-center">
              매시업 이미지 게임
            </h1>
            <p className="headline-5 mt-[3px] text-grey-600 text-center">
              카드 {SAMPLE_DATA.length - curIndex}장 남았어!
            </p>
          </div>

          {/* Shuffle Layout */}
          <motion.div
            initial={'hidden'}
            animate={triggerShuffle ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0, scaleX: 0, transition: {} },
              visible: { opacity: 1, scaleX: 1, transition: {} },
            }}
            className="fixed z-20 top-0 w-full bg-grey-700 h-screen text-light flex justify-center items-center headline-2"
          >
            덱 셔플중...
          </motion.div>

          {/* Main Deck Layout */}
          <div
            className="relative w-full pt-[63px] text-center flex justify-center h-[481px]"
            onClick={() => {
              setOnboardingState(prev => {
                if (prev === OnboardingState.FLIP) return OnboardingState.SLIDE
                if (prev === OnboardingState.SLIDE) return OnboardingState.DONE
                return OnboardingState.DONE
              })
            }}
          >
            <AnimatePresence initial={false}>
              {/* Onboarding Overlay - Flip */}
              {onboardingState === OnboardingState.FLIP && (
                <OnboardingFlipOverlay />
              )}

              {/* Onboarding Overlay - Slide */}
              {onboardingState === OnboardingState.SLIDE && (
                <OnboardingSlideOverlay />
              )}

              <NormalCard
                key={curIndex + 2}
                index={curIndex + 2}
                setIndex={setCurIndex}
                cardLocation="back"
                cardVariants={variantsBackCard}
                canDrag={false}
                type={types[(curIndex + 2) % types.length]}
                data={SAMPLE_DATA[curIndex + 2] ?? null}
              />
              <NormalCard
                key={curIndex + 1}
                index={curIndex + 1}
                setIndex={setCurIndex}
                cardLocation="middle"
                cardVariants={variantsMiddleCard}
                canDrag={false}
                type={types[(curIndex + 1) % types.length]}
                data={SAMPLE_DATA[curIndex + 1] ?? null}
              />
              <NormalCard
                key={curIndex}
                index={curIndex}
                setIndex={setCurIndex}
                cardLocation="front"
                cardVariants={variantsFrontCard}
                canDrag={onboardingState !== OnboardingState.FLIP}
                type={types[curIndex % types.length]}
                data={SAMPLE_DATA[curIndex] ?? null}
              />

              {curIndex === SAMPLE_DATA.length && (
                <div className="w-full px-[45px]">
                  <EmptyCard />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <BottomCta className="flex justify-center items-center bottom-[40px] gap-x-[10px] px-[24px]">
        {curIndex === SAMPLE_DATA.length && (
          <Button size="medium" onClick={() => router.push('/')}>
            리스트로 가기
          </Button>
        )}

        {curIndex !== SAMPLE_DATA.length && (
          <>
            <SecondaryButton
              size="small"
              rightIcon="shuffle"
              onClick={() => setTriggerShuffle(true)}
            >
              섞기
            </SecondaryButton>
            <Button size="medium" onClick={() => setCurIndex(prev => prev + 1)}>
              다음 카드 보기
            </Button>
          </>
        )}
      </BottomCta>
    </div>
  )
}
