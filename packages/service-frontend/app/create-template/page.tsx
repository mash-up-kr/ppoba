'use client'
import React from 'react'

import { useRouter } from 'next/navigation'

import 'swiper/css'
import 'swiper/css/scrollbar'

import { Header } from '@/app/components'
import GameCardList from '@/app/components/marketplace/game/GameCardList'
import { CardType } from '@/app/deck/[id]/play/Card'

const TestDeckList = [
  {
    id: 0,
    cardCount: 50,
    title: '테스트 게임 1',
    isAdult: true,
    chipList: ['비밀', '가치관', '취미'],
  },
  {
    id: 1,
    cardCount: 50,
    title: '테스트 게임 1',
    isAdult: true,
    chipList: ['비밀', '가치관', '취미'],
  },
  {
    id: 2,
    cardCount: 50,
    title: '테스트 게임 1',
    isAdult: true,
    chipList: ['비밀', '가치관', '취미'],
  },
  {
    id: 3,
    cardCount: 50,
    title: '테스트 게임 1',
    isAdult: true,
    chipList: ['비밀', '가치관', '취미'],
  },
  {
    id: 4,
    cardCount: 50,
    title: '테스트 게임 1',
    isAdult: true,
    chipList: ['비밀', '가치관', '취미'],
  },
  {
    id: 5,
    cardCount: 50,
    title: '테스트 게임 1',
    isAdult: true,
    chipList: ['비밀', '가치관', '취미'],
  },
  {
    id: 6,
    cardCount: 50,
    title: '테스트 게임 1',
    isAdult: true,
    chipList: ['비밀', '가치관', '취미'],
  },
  {
    id: 7,
    cardCount: 50,
    title: '테스트 게임 1',
    isAdult: true,
    chipList: ['비밀', '가치관', '취미'],
  },
  {
    id: 8,
    cardCount: 50,
    title: '테스트 게임 1',
    isAdult: true,
    chipList: ['비밀', '가치관', '취미'],
  },
]

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

  const allDeckList = TestDeckList.map((deck, index) => {
    return {
      ...deck,
      type: AllDeckCardTypeOrder[index % AllDeckCardTypeOrder.length],
    }
  })

  return (
    <div className="min-h-screen flex flex-col justify-between pb-[16px] bg-light">
      <Header leftIconType="back" onClickLeftIcon={() => router.back()} title="템플릿으로 만들기" />
      <section className="mt-[60px] mx-[-24px]">
        <GameCardList
          orientation="vertical"
          games={allDeckList}
          type='template'
        />
      </section>
    </div>
  )
}
