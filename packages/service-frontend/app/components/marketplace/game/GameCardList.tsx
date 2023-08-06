import { Game } from './Game'
import GameCard from './GameCard'

interface Props {
  orientation: 'vertical' | 'horizontal'
  games: Game[]
  title?: string | JSX.Element | false
  className?: string
  type?: 'template' | 'deck'
  customInitialItem?: JSX.Element
  customLastItem?: JSX.Element
}

export default function GameCardList({
  orientation,
  games,
  title = <></>,
  className = '',
  type,
  customInitialItem = <></>,
  customLastItem = <></>,
}: Props): JSX.Element {
  return (
    <div className={className}>
      {/* 헤더 타이틀 영역 - 컴포넌트로 받아서 렌더링 */}
      {title && <div className="px-[24px]">{title}</div>}

      {/* 게임 목록 영역 - VERTICAL */}
      {orientation === 'vertical' && (
        <div className="w-full space-y-[10px] px-[24px]">
          {customInitialItem && customInitialItem}
          {games.map(game => (
            <GameCard key={game.id} game={game} type={type} />
          ))}
          {customLastItem && customLastItem}
        </div>
      )}

      {/* 게임 목록 영역 - HORIZONTAL */}
      {orientation === 'horizontal' && (
        <div className="overflow-x-auto w-full snap-x snap-mandatory flex gap-[10px] scroll-px-[24px] px-[24px] scrollbar-hide touch-pan-x">
          {customInitialItem && customInitialItem}
          {games.map(game => (
            <GameCard
              key={game.id}
              game={game}
              containerClassName="shrink-0 snap-start my-[30px]"
              type={type}
            />
          ))}
          {customLastItem && customLastItem}
        </div>
      )}
    </div>
  )
}
