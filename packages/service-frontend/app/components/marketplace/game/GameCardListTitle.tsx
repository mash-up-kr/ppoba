'use client'

import { useMemo } from 'react'

import { Icon } from '@ppoba/ui'
import { IconType } from '@ppoba/ui/dist/src/components/Icon'

import { GameCardListHeaderType } from './Game'

interface Props {
  headerType: GameCardListHeaderType
  label: string
  className?: string
  onClick?: () => void
}

export default function GameCardListTitle({
  headerType,
  label,
  className = '',
  onClick,
}: Props): JSX.Element {
  const getIconType = (headerType: GameCardListHeaderType): IconType | null => {
    switch (headerType) {
      case 'MY_GAME': {
        return 'go'
      }

      case 'ALL_GAME': {
        return null
      }
    }
  }

  const iconType = useMemo(() => getIconType(headerType), [headerType])

  return (
    <div
      className={`w-full flex justify-start items-center px-[8px] ${className}`}
    >
      <h1 className="headline-2 text-grey-800 mr-[4px]">{label}</h1>

      {iconType && (
        <div role="button" onClick={onClick}>
          <Icon type={iconType} width={24} height={24} />
        </div>
      )}
    </div>
  )
}
