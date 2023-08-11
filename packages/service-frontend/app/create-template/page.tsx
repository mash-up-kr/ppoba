'use client'
import React, { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
// eslint-disable-next-line import/order
import { useRouter } from 'next/navigation'

import 'swiper/css'
import 'swiper/css/scrollbar'

import { api } from '@ppoba/api'

import { Header } from '@/app/components'
import GameCardList from '@/app/components/marketplace/game/GameCardList'
import { CardType } from '@/app/deck/[id]/play/Card'

const AllDeckCardTypeOrder: CardType[] = [
  'nail',
  'sprout',
  'feather',
  'turnip',
  'swallow',
  'clover',
  'flower',
  'plug',
]

export default function CreateTemplate(): JSX.Element {
  const router = useRouter()

  const { data } = useQuery(['getAllDeck'], api.deck.getAllDeck, {
    suspense: true,
  })

  const allDeckList = useMemo(
    () =>
      data?.result.map((deck, index) => {
        return {
          ...deck,
          type: AllDeckCardTypeOrder[index % AllDeckCardTypeOrder.length],
        }
      }),
    [data?.result],
  )

  return (
    <div className="min-h-screen flex flex-col justify-between pb-[16px] bg-light">
      <Header
        leftIconType="back"
        onClickLeftIcon={() => router.back()}
        title="템플릿으로 만들기"
      />
      <section className="mt-[60px] mx-[-24px]">
        <GameCardList
          orientation="vertical"
          games={allDeckList ?? []}
          type="template"
        />
      </section>
    </div>
  )
}
