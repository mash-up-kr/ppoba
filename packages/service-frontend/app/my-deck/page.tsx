'use client'
import { useMemo } from 'react'

import { useRouter } from 'next/navigation'

import { GameCardList, GameCardListTitle, Header } from '../components'
import Footer from '../components/common/Footer'
import { CardType } from '../deck/[id]/play/Card'

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

const MyDeckCardTypeOrder: CardType[] = [...AllDeckCardTypeOrder].reverse()

export default function MyDeckPage(): JSX.Element {
  const router = useRouter()

  const myDeckList = useMemo(
    () =>
      TestDeckList.map((deck, index) => {
        return {
          ...deck,
          type: MyDeckCardTypeOrder[index % MyDeckCardTypeOrder.length],
        }
      }),
    [],
  )

  return (
    <div className="min-h-screen flex flex-col justify-between bg-light">
      <Header
        className="h-[60px] bg-light"
        leftIconType="back"
        onClickLeftIcon={() => router.back()}
        title="내가 만든 덱"
      />

      <section className="pt-[60px] pb-[50px]">
        <GameCardList
          orientation="vertical"
          games={myDeckList}
          className="pt-[10px]"
        />
      </section>

      <Footer />
    </div>
  )
}
