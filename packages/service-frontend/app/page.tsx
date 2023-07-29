import type { JSX } from 'react'

import GameCardList from '@/app/components/marketplace/game/GameCardList'

import Footer from './components/common/Footer'
import GameCardListTitle from './components/marketplace/game/GameCardListTitle'
import { CardType } from './deck/[id]/play/Card'
import LoginHeader from './LoginHeader'

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

export default function Home(): JSX.Element {
  const myDeckList = TestDeckList.map((deck, index) => {
    return {
      ...deck,
      type: MyDeckCardTypeOrder[index % MyDeckCardTypeOrder.length],
    }
  })

  const allDeckList = TestDeckList.map((deck, index) => {
    return {
      ...deck,
      type: AllDeckCardTypeOrder[index % AllDeckCardTypeOrder.length],
    }
  })

  return (
    <main>
      <LoginHeader />

      {/* 내가 만든 영역 */}
      {/* Red - Pink - Green - Blue - Orange - Yellow - Teal - Purple */}
      <section>
        <GameCardList
          orientation="horizontal"
          games={myDeckList}
          title={
            <GameCardListTitle
              headerType="MY_GAME"
              label="내가 만든"
              className="mb-[-20px]"
            />
          }
          className="pt-[30px] pb-[12px]"
        />
      </section>

      {/* 덱 영역 */}
      {/* Purple - Teal - Yellow - Orange - Blue - Green - Pink - Red */}
      <section>
        <GameCardList
          orientation="vertical"
          games={allDeckList}
          title={
            <GameCardListTitle
              headerType="ALL_GAME"
              label="덱"
              className="mb-[10px]"
            />
          }
          className="pt-[30px]"
        />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
