import { Icon } from '@ppoba/ui'

import GameCategoryChip from './GameCategoryChip'

interface Props {
  game: Game
  containerClassName?: string
}

export default function GameCard({
  game,
  containerClassName = '',
}: Props): JSX.Element {
  return (
    <div
      className={`flex flex-col justify-between p-[24px] w-full rounded-[24px] bg-green-02 shadow-[4px_4px_20px_0px_rgba(0,0,0,0.1)] min-h-[162px] ${containerClassName}`}
    >
      {/* 게임 상단 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Icon type="cardcount" width={20} height={20} />
          <span className="text-[12px] font-[700] leading-[150%] tracking-[-0.12px] text-grey-800 ml-[2px]">
            {game.cardCount}
          </span>
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
