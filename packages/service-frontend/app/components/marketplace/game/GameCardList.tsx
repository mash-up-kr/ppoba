import { Game } from './Game'
import GameCard from './GameCard'

interface Props {
  orientation: 'vertical' | 'horizontal'
  games: Game[]
  title?: string | JSX.Element
  className?: string
  type?: 'template' | 'deck'
}

export default function GameCardList({
  orientation,
  games,
  title = <></>,
  className = '',
  type,
}: Props): JSX.Element {
  return (
    <div className={className}>
      {/* 헤더 타이틀 영역 - 컴포넌트로 받아서 렌더링 */}
      <div className="px-[24px]">{title}</div>

      {/* 게임 목록 영역 - VERTICAL */}
      {orientation === 'vertical' && (
        <div className="w-full space-y-[10px] px-[24px]">
          {games.map(game => (
            <GameCard key={game.id} game={game} type={type} />
          ))}
        </div>
      )}

      {/* 게임 목록 영역 - HORIZONTAL */}
      {orientation === 'horizontal' && (
        <div className="overflow-x-auto w-full snap-x snap-mandatory flex gap-[10px] scroll-px-[24px] px-[24px] scrollbar-hide touch-pan-x">
          {games.map(game => (
            <GameCard
              key={game.id}
              game={game}
              containerClassName="shrink-0 snap-start my-[30px]"
              type={type}
            />
          ))}
        </div>
      )}
    </div>
  )
}
