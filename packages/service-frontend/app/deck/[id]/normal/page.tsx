'use client'

import { useEffect, useMemo, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { redirect, useRouter } from 'next/navigation'
import { api } from '@ppoba/api'
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

interface Props {
  params: {
    id: string,
  }
}

export default function NormalPlayPage({ params }: Props): JSX.Element {
  const router = useRouter()
  const [types, setTypes] = useState(cardTypes)
  const [curIndex, setCurIndex] = useState(0)
  const [triggerShuffle, setTriggerShuffle] = useState(false)
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

  // Redirect to 404 page if api error occurred
  if (isError || isCardListError) {
    redirect('/404')
  }

  return (
    <div className="text-grey-800">
      <Header
        rightIconType="close"
        className="h-[60px]"
        onClickRightIcon={() => router.back()}
      />

      {cardListData?.result && (
        <>
          <main className="min-h-screen flex items-center">
            <div className="relative w-full flex flex-col items-center justify-center">
              {/* Title Section */}
              {data?.result && (
                <div>
                  <h1 className="headline-2 text-black text-center">
                    {data.result.name}
                  </h1>
                  <p className="headline-5 mt-[3px] text-grey-600 text-center">
                    카드 {cardListData.result.length - curIndex}장 남았어!
                  </p>
                </div>
              )}

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
                    key={cardListData.result[curIndex + 2].id}
                    index={curIndex + 2}
                    setIndex={setCurIndex}
                    cardLocation="back"
                    cardVariants={variantsBackCard}
                    canDrag={false}
                    type={types[(curIndex + 2) % types.length]}
                    data={cardListData.result[curIndex + 2] ?? null}
                  />
                  <NormalCard
                    key={cardListData.result[curIndex + 1].id}
                    index={curIndex + 1}
                    setIndex={setCurIndex}
                    cardLocation="middle"
                    cardVariants={variantsMiddleCard}
                    canDrag={false}
                    type={types[(curIndex + 1) % types.length]}
                    data={cardListData.result[curIndex + 1] ?? null}
                  />
                  <NormalCard
                    key={cardListData.result[curIndex].id}
                    index={curIndex}
                    setIndex={setCurIndex}
                    cardLocation="front"
                    cardVariants={variantsFrontCard}
                    canDrag={onboardingState !== OnboardingState.FLIP}
                    type={types[curIndex % types.length]}
                    data={cardListData.result[curIndex] ?? null}
                  />

                  {curIndex === cardListData.result.length && (
                    <div className="w-full px-[45px]">
                      <EmptyCard />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </main>
          <BottomCta className="flex justify-center items-center bottom-[40px] gap-x-[10px] px-[24px]">
            {curIndex === cardListData.result.length && (
              <Button size="medium" onClick={() => router.push('/')}>
                리스트로 가기
              </Button>
            )}

            {curIndex !== cardListData.result.length && (
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
        </>
      )}
    </div>
  )
}
