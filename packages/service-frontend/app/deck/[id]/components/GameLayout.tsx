'use client'
import React, { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'

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
}

function GameLayout({
  title,
  length,
  triggerShuffle,
  children,
}: React.PropsWithChildren<Props>): JSX.Element {
  const [onboardingState, setOnboardingState] = useState(OnboardingState.START)

  const handleOnboardingState = () => {
    setOnboardingState(prev => Math.min(prev + 1, OnboardingState.DONE))
  }

  return (
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
    </main>
  )
}

export default GameLayout
