'use client'

import { useEffect, useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { redirect } from 'next/navigation'
import { api } from '@ppoba/api'
import { Card } from '@ppoba/types'

import NormalCard from './components/NormalCard'
import { GameLayout } from '../components'
import EmptyCard from '../play/EmptyCard'
import { cardTypes } from '../play/generateCard'

interface Props {
  params: {
    id: string
  }
}

export default function NormalPlayPage({ params }: Props): JSX.Element {
  const queryClient = useQueryClient()
  const [types, setTypes] = useState(cardTypes)
  const [curIndex, setCurIndex] = useState(0)
  const [triggerShuffle, setTriggerShuffle] = useState(false)
  const { data, isError } = useQuery(
    ['getDeck', params.id],
    () => api.deck.getDeck({ deckId: params.id }),
    {
      suspense: true,
      refetchOnWindowFocus: false,
    },
  )
  const { data: cardListData, isError: isCardListError } = useQuery(
    ['getCardList', params.id],
    () => api.card.getCards({ deckId: params.id }),
    {
      suspense: true,
      refetchOnWindowFocus: false,
    },
  )

  const variantsBackCard = {
    initial: { y: -100, opacity: 0 },
    animate: { y: -62, opacity: 1, transition: { delay: 0.5 } },
  }

  const variantsMiddleCard = {
    initial: { y: 0, opacity: 1 },
    animate: { y: -26, opacity: 1 },
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
    if (triggerShuffle) {
      queryClient.setQueryData<{ result: Card[] }>(
        ['getCardList', params.id],
        prevData => {
          if (prevData) {
            return {
              ...prevData,
              result: [...prevData.result.sort(() => 0.5 - Math.random())],
            }
          }
        },
      )

      setTimeout(() => {
        setTypes(prev => [...prev.sort(() => 0.5 - Math.random())])
        setTriggerShuffle(false)
      }, 2000)
    }
  }, [params.id, queryClient, triggerShuffle])

  // Redirect to 404 page if api error occurred
  if (isError || isCardListError) {
    redirect('/404')
  }

  return (
    <div className="text-grey-800">
      {cardListData?.result && (
        <>
          <GameLayout
            title={data?.result?.name ?? ''}
            length={cardListData.result.length - curIndex}
            triggerShuffle={triggerShuffle}
            isFinishGame={curIndex === data?.result?.totalCardCount}
            onClickShuffle={() => setTriggerShuffle(true)}
            onClickNextCard={() => setCurIndex(prev => prev + 1)}
          >
            {/* Main Deck Layout */}
            <AnimatePresence initial={false}>
              {curIndex !== cardListData.result.length && (
                <>
                  <NormalCard
                    key={curIndex + 2}
                    index={curIndex + 2}
                    setIndex={setCurIndex}
                    cardLocation="back"
                    cardVariants={variantsBackCard}
                    canDrag={false}
                    className="z-[30] opacity-50"
                    type={types[(curIndex + 2) % types.length]}
                    data={cardListData.result[curIndex + 2] ?? null}
                  />
                  <NormalCard
                    key={curIndex + 1}
                    index={curIndex + 1}
                    setIndex={setCurIndex}
                    cardLocation="middle"
                    cardVariants={variantsMiddleCard}
                    canDrag={false}
                    className="z-[50]"
                    type={types[(curIndex + 1) % types.length]}
                    data={cardListData.result[curIndex + 1] ?? null}
                  />
                  <NormalCard
                    key={curIndex}
                    index={curIndex}
                    setIndex={setCurIndex}
                    cardLocation="front"
                    cardVariants={variantsFrontCard}
                    canDrag
                    className="z-[100]"
                    type={types[curIndex % types.length]}
                    data={cardListData.result[curIndex] ?? null}
                  />
                </>
              )}

              {curIndex === cardListData.result.length && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  className="w-full px-[45px]"
                >
                  <EmptyCard />
                </motion.div>
              )}
            </AnimatePresence>
          </GameLayout>
        </>
      )}
    </div>
  )
}
