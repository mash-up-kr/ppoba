'use client'
import React, { useState } from 'react'

import { OnboardingOverlay } from '@/app/components/overlay'

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
}

function GameLayout({
  title,
  length,
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
    </main>
  )
}

export default GameLayout
