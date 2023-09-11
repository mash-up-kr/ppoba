'use client'
import React, { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'
import { useRouter } from 'next/navigation'
import { Button, SecondaryButton } from '@ppoba/ui'

import Alert from '@/app/Alert'
import { Header } from '@/app/components'
import BottomCta from '@/app/components/common/BottomCta'
import { OnboardingOverlay } from '@/app/components/overlay'
import loadingDeckLottie from '@/public/lottie/loadingDeckLottie.json'

import GameTitle from './GameTitle'
import OnboardingFlipOverlay from './OnboardingFlipOverlay'
import OnboardingSlideOverlay from './OnboardingSlideOverlay'

enum OnboardingState {
  START,
  FLIP,
  SLIDE,
  DONE,
}

interface Props {
  title: string
  length: number
  triggerShuffle: boolean
  isFinishGame: boolean
  onClickShuffle: VoidFunction
  onClickNextCard: VoidFunction
}

function GameLayout({
  title,
  length,
  triggerShuffle,
  isFinishGame,
  children,
  onClickShuffle,
  onClickNextCard,
}: React.PropsWithChildren<Props>): JSX.Element {
  const router = useRouter()
  const [isCloseOverlayOpen, setIsCloseOverlayOpen] = useState(false)
  const [onboardingState, setOnboardingState] = useState(OnboardingState.START)

  const handleOnboardingState = () => {
    setOnboardingState(prev => Math.min(prev + 1, OnboardingState.DONE))
  }

  return (
    <>
      <Header
        rightIconType="close"
        className="h-[60px]"
        onClickRightIcon={() => {
          if (isFinishGame) {
            router.push('')
          } else {
            setIsCloseOverlayOpen(true)
          }
        }}
      />

      <main className="min-h-screen">
        <div
          className="w-full flex flex-col gap-[63px] justify-center items-center"
          onClick={handleOnboardingState}
        >
          <GameTitle title={title} length={length} />

          <div className="relative w-full h-[360px] flex justify-center items-center z-[50]">
            {children}
            {/* Onboarding Overlay - Flip */}
            {onboardingState === OnboardingState.FLIP && (
              <OnboardingFlipOverlay />
            )}

            {/* Onboarding Overlay - Slide */}
            {onboardingState === OnboardingState.SLIDE && (
              <OnboardingSlideOverlay />
            )}
          </div>
        </div>

        {/* Onboarding Overlay */}
        <OnboardingOverlay
          isOpen={onboardingState === OnboardingState.START}
          onClickClose={() => setOnboardingState(OnboardingState.FLIP)}
        />

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

        <BottomCta className="flex justify-center items-center bottom-[40px] gap-x-[10px] px-[24px] z-[50]">
          {isFinishGame && (
            <Button size="medium" onClick={() => router.push('/')}>
              리스트로 가기
            </Button>
          )}

          {!isFinishGame && (
            <>
              <SecondaryButton
                size="small"
                rightIcon="shuffle"
                onClick={onClickShuffle}
              >
                섞기
              </SecondaryButton>
              <Button size="medium" onClick={onClickNextCard}>
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
      </main>
    </>
  )
}

export default GameLayout
