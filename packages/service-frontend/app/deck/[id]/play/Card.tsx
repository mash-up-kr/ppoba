import type { JSX } from 'react'

import { Icon } from '@ppoba/ui'

import { CardIcon, CardStyle } from './constant'

export type CardType =
  | 'flower'
  | 'leaf'
  | 'sprout'
  | 'duck'
  | 'plug'
  | 'nail'
  | 'bird'
  | 'clover'

export type CardVariantType = 'normal' | 'dark' | 'point'

interface Props {
  type: CardType
  variant: CardVariantType
  text?: string
  isShowBack?: boolean
  className?: string
}

function Card({
  type,
  variant,
  className,
  text,
  isShowBack,
}: Props): JSX.Element {
  return (
    <div className="w-[270px] h-[360px] flex shrink-0 cursor-pointer text-center">
      <div className="relative w-full h-full">
        <div
          className={`absolute w-full h-full box-border rounded-[24px] ${CardStyle[type][variant]} ${className}`}
        >
          <Icon
            type={CardIcon[type][variant].sideIcon}
            width={60}
            height={60}
            className="absolute left-0 top-0"
          />
          <Icon
            type={CardIcon[type][variant].rightUp}
            width={24}
            height={24}
            className="absolute right-[19px] top-[25px]"
          />
          <Icon
            type={CardIcon[type][variant].icon}
            width={252}
            height={252}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <Icon
            type={CardIcon[type][variant].leftDown}
            width={24}
            height={24}
            className="absolute left-[19px] bottom-[15px]"
          />
          <Icon
            type={CardIcon[type][variant].sideIcon}
            width={60}
            height={60}
            className="absolute right-0 bottom-0"
          />
        </div>
        {/* <div
          className={`absolute w-full h-full flex items-center headline-2 rounded-[24px] text-black break-keep ${CardStyle[type]['normal']} ${className}`}
        >
          {text}
        </div> */}
      </div>
    </div>
  )
}

export default Card
