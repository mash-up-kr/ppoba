'use client'

import { useSearchParams } from 'next/navigation'
import { Icon } from '@ppoba/ui'

import { Header } from '@/app/components/common'
import GameCategoryChip from '@/app/components/marketplace/game/GameCategoryChip'

import { CardType } from './play/Card'
import { CardIcon, CardStyle } from './play/constant'

const DEFAULT_DECK_TYPE: CardType = 'nail'

export default function DeckDetail(): JSX.Element {
  // Search Parameter로 Deck Type 전달 받기 -> 없는 경우 Default Type으로 설정
  const searchParams = useSearchParams()
  const deckType = (searchParams.get('type') as CardType) ?? DEFAULT_DECK_TYPE

  // Style based on type
  const bgColor = CardStyle[deckType].background
  const deckIcon = CardIcon[deckType].normalSideIcon

  const game = {
    isAdult: true,
    chipList: ['비밀', '가치관', '취미'],
    cardList: [
      {
        id: 0,
        content: '',
      },
      {
        id: 1,
        content: '',
      },
      {
        id: 2,
        content: '',
      },
    ],
  }

  return (
    <div>
      <Header title="로그인" className="justify-end" />
      <div className="pt-[52px] text-black">
        {/* --- Deck Detail Top Section --- */}
        <div className={`pt-[20px] px-[34px] pb-[51px] ${bgColor}`}>
          {/* Deck Card Cnt */}
          <div className="flex items-center">
            <Icon type={deckIcon} width={15} height={14} className="" />
            <span className="headline-4 ml-[4px]">50</span>
          </div>

          {/* Deck Title */}
          <h1 className="mt-[6px] headline-1">뉴 매시업 이미지 게임</h1>

          {/* Chip List */}
          <div className="mt-[20px]">
            {game.isAdult && (
              <GameCategoryChip
                label="19+"
                bgColor="bg-grey-800"
                textColor="text-light"
              />
            )}
            {game.chipList.map((chip, index) => (
              <GameCategoryChip key={index} label={chip} />
            ))}
          </div>
        </div>

        {/* --- Deck Detail Card Section --- */}
        <div>{/* Deck Card List */}</div>

        {/* --- Deck Detail Bottom Section --- */}
        <div></div>
      </div>
    </div>
  )
}
