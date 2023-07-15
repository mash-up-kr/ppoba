import type { JSX } from 'react'

import { Icon } from '@ppoba/ui'

import { CardIcon, CardStyle } from './constant'

export type CardType =
  | 'flower'
  | 'feather'
  | 'sprout'
  | 'turnip'
  | 'plug'
  | 'nail'
  | 'swallow'
  | 'clover'

interface Props {
  type: CardType
  number: number
  text?: string
  isShowBack?: boolean
  className?: string
}

function Card({
  type,
  className,
  number,
  text,
  isShowBack,
}: Props): JSX.Element {
  return (
    <div
      className={`relative w-full h-full flex shrink-0 cursor-pointer text-center absolute w-full h-full box-border rounded-[24px] bg-grey-700 shadow-[4px_4px_20px_rgba(0,0,0,0.16)] ${className}`}
    >
      <div
        className={`flex flex-col absolute left-4 top-4 ${CardStyle[type].color}`}
      >
        <Icon type={CardIcon[type].colorSideIcon} width={32} height={32} />
        <span>{String(number).padStart(2, '0')}</span>
      </div>
      <Icon
        type={CardIcon[type].mainIcon}
        width={200}
        height={200}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <div
        className={`flex flex-col absolute right-4 bottom-4 rotate-180 ${CardStyle[type].color}`}
      >
        <Icon type={CardIcon[type].colorSideIcon} width={32} height={32} />
        <span>{String(number).padStart(2, '0')}</span>
      </div>
    </div>
  )
}

export default Card
