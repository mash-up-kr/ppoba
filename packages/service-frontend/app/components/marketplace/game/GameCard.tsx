'use client'

import { useRouter } from 'next/navigation'
import { Icon } from '@ppoba/ui'

import { CardIcon, CardStyle } from '@/app/deck/[id]/play/constant'

import { Game } from './Game'
import GameCategoryChip from './GameCategoryChip'

interface Props {
  game: Game
  containerClassName?: string
}

export default function GameCard({
  game,
  containerClassName = '',
}: Props): JSX.Element {
  const bgColor = CardStyle[game.type].background
  const cardIcon = CardIcon[game.type].normalSideIcon

  const router = useRouter()

  const handleClickCard = () => {
    router.push(`/deck/${game.id}`)
  }

  return (
    <div
      className={`flex flex-col justify-between p-[24px] w-full rounded-[24px] shadow-[4px_4px_20px_0px_rgba(0,0,0,0.1)] min-h-[162px] ${bgColor} ${containerClassName}`}
      onClick={handleClickCard}
    >
      {/* 게임 상단 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex justify-center items-center">
            <Icon type={cardIcon} width={16} height={16} className="py-[1px]" />
          </div>
          <div className="justify-center items-center flex ml-[3px]">
            <span className="text-grey-800 caption-bold">{game.cardCount}</span>
          </div>
        </div>
        <div>
          <Icon type="arrow" width={24} height={24} />
        </div>
      </div>

      {/* 게임 하단 */}
      <div>
        {/* 게임 제목 */}
        <h2 className="headline-3 text-grey-800">{game.title}</h2>

        {/* 게임 하단 칩 리스트 */}
        <div className="space-x-[4px] mt-[10px]">
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
    </div>
  )
}
