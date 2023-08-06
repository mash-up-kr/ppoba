'use client'
import React from 'react'

import { useRouter } from 'next/navigation'

import 'swiper/css'
import 'swiper/css/scrollbar'

import { Header } from '@/app/components'
import GameCardList from '@/app/components/marketplace/game/GameCardList'
import { CardType } from '@/app/deck/[id]/play/Card'

import { Game } from '../components/marketplace/game/Game'

const TestDeckList: Game[] = [
  {
    id: '0',
    totalCardCount: 50,
    name: '테스트 게임 0',
    cardIds: [],
    category: ['비밀', '가치관', '취미'],
    userId: '123',
    type: 'clover',
  },
  {
    id: '1',
    totalCardCount: 50,
    name: '테스트 게임 1',
    cardIds: [],
    category: ['비밀', '가치관', '취미'],
    userId: '123',
    type: 'clover',
  },
  {
    id: '2',
    totalCardCount: 50,
    name: '테스트 게임 2',
    cardIds: [],
    category: ['비밀', '가치관', '취미'],
    userId: '123',
    type: 'clover',
  },
  {
    id: '3',
    totalCardCount: 50,
    name: '테스트 게임 3',
    cardIds: [],
    category: ['비밀', '가치관', '취미'],
    userId: '123',
    type: 'clover',
  },
  {
    id: '4',
    totalCardCount: 50,
    name: '테스트 게임 4',
    cardIds: [],
    category: ['비밀', '가치관', '취미'],
    userId: '123',
    type: 'clover',
  },
  {
    id: '5',
    totalCardCount: 50,
    name: '테스트 게임 5',
    cardIds: [],
    category: ['비밀', '가치관', '취미'],
    userId: '123',
    type: 'clover',
  },
  {
    id: '6',
    totalCardCount: 50,
    name: '테스트 게임 6',
    cardIds: [],
    category: ['비밀', '가치관', '취미'],
    userId: '123',
    type: 'clover',
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
      <Header
        leftIconType="back"
        onClickLeftIcon={() => router.back()}
        title="템플릿으로 만들기"
      />
      <section className="mt-[60px] mx-[-24px]">
        <GameCardList
          orientation="vertical"
          games={allDeckList}
          type="template"
        />
      </section>
    </div>
  )
}
