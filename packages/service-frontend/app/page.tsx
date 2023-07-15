import type { JSX } from 'react'

import GameCardList from '@/app/components/marketplace/game/GameCardList'

import GameCardListTitle from './components/marketplace/game/GameCardListTitle'
import LoginHeader from './LoginHeader'

const TEST_GAME_LIST = [
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
]

export default function Home(): JSX.Element {
  return (
    <main>
      <LoginHeader />

      {/* 내가 만든 영역 */}
      <section>
        <GameCardList
          orientation="horizontal"
          games={TEST_GAME_LIST}
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
      <section>
        <GameCardList
          orientation="vertical"
          games={TEST_GAME_LIST}
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
    </main>
  )
}
