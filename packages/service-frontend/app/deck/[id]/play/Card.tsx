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
  className?: string
}

function Card({ type, variant, className }: Props): JSX.Element {
  return (
    <div
      className={`flex justify-center items-center relative w-[270px] h-[360px] px-[9px] rounded-[24px] ${CardStyle[type][variant]} ${className}`}
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
        className="absolute"
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
  )
}

export default Card
