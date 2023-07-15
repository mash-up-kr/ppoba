'use client'

import { Icon } from '@ppoba/ui'
import { IconType } from '@ppoba/ui/dist/src/components/Icon'

import { GameCardListHeaderType } from './Game'

interface Props {
  headerType: GameCardListHeaderType
  label: string
  className?: string
}

export default function GameCardListTitle({
  headerType,
  label,
  className = '',
}: Props): JSX.Element {
  const getIconType = (headerType: GameCardListHeaderType): IconType => {
    switch (headerType) {
      case 'MY_GAME': {
        return 'go'
      }

      case 'ALL_GAME': {
        return 'deckAdd'
      }
    }
  }

  const handleClickIcon = (headerType: GameCardListHeaderType): void => {
    switch (headerType) {
      case 'MY_GAME': {
        console.log('Clicked My Game')
        return
      }

      case 'ALL_GAME': {
        console.log('Clicked All Game')
        return
      }
    }
  }

  return (
    <div
      className={`w-full flex justify-start items-center px-[8px] ${className}`}
    >
      <h1 className="headline-2 text-grey-800 mr-[4px]">{label}</h1>
      <div role="button" onClick={() => handleClickIcon(headerType)}>
        <Icon type={getIconType(headerType)} width={24} height={24} />
      </div>
    </div>
  )
}
