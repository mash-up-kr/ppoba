import type { JSX } from 'react'

import { Icon } from '@ppoba/ui'

import { CardIcon } from './constant'

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
      className={`relative w-[270px] h-[360px] flex shrink-0 cursor-pointer text-center absolute w-full h-full box-border rounded-[24px] bg-grey-700 ${className}`}
    >
      <Icon
        type={CardIcon[type].colorSideIcon}
        width={32}
        height={32}
        className="absolute left-4 top-4"
      />
      <Icon
        type={CardIcon[type].mainIcon}
        width={200}
        height={200}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Icon
        type={CardIcon[type].colorSideIcon}
        width={32}
        height={32}
        className="absolute right-4 bottom-4"
      />
    </div>
  )
}

export default Card
