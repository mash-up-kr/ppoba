'use client'

import { useRef, useState } from 'react'

import { useConveyer } from '@egjs/react-conveyer'

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
  const [isScrolling, setIsScrolling] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const { onBeginScroll, onFinishScroll } = useConveyer(ref, {
    horizontal: true,
  })

  onBeginScroll(() => {
    setIsScrolling(true)
  })

  onFinishScroll(() => {
    setIsScrolling(false)
  })

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
        <div
          ref={ref}
          className="overflow-x-auto w-full flex gap-[10px] px-[24px] scrollbar-hide"
        >
          {customInitialItem && customInitialItem}
          {games.map(game => (
            <GameCard
              key={game.id}
              game={game}
              containerClassName={`shrink-0 snap-start my-[30px] ${
                isScrolling ? 'pointer-events-none' : ''
              }`}
              type={type}
            />
          ))}
          {customLastItem && customLastItem}
        </div>
      )}
    </div>
  )
}
