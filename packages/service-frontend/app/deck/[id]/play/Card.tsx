'use client'
import type { JSX, MouseEventHandler } from 'react'

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
  onClick?: MouseEventHandler<HTMLDivElement>
}

function Card({
  type,
  className,
  number,
  text,
  isShowBack,
  onClick,
}: Props): JSX.Element {
  return (
    <div
      role="button"
      className={`relative w-full h-full flex shrink-0 cursor-pointer text-center box-border rounded-[24px] shadow-[4px_4px_20px_rgba(0,0,0,0.16)] ${
        isShowBack ? CardStyle[type].background : 'bg-grey-700'
      } ${className}`}
      onClick={onClick}
    >
      {isShowBack ? (
        <>
          <div
            className={`flex flex-col gap-[2px] absolute right-5 top-5 text-grey-700`}
          >
            <Icon type={CardIcon[type].normalSideIcon} width={20} height={20} />
            <span className="headline-4">
              {String(number).padStart(2, '0')}
            </span>
          </div>
          <div className="absolute w-full px-[41px] break-keep top-1/2 -translate-y-1/2 headline-2 text-center text-black">
            {text}
          </div>
          <div
            className={`flex flex-col gap-[2px] absolute left-5 bottom-5 text-grey-700 rotate-180`}
          >
            <Icon type={CardIcon[type].normalSideIcon} width={20} height={20} />
            <span className="headline-4">
              {String(number).padStart(2, '0')}
            </span>
          </div>
        </>
      ) : (
        <>
          <div
            className={`flex flex-col absolute left-4 top-4 ${CardStyle[type].color}`}
          >
            <Icon type={CardIcon[type].colorSideIcon} width={20} height={20} />
            <span className="headline-4">
              {String(number).padStart(2, '0')}
            </span>
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
            <Icon type={CardIcon[type].colorSideIcon} width={20} height={20} />
            <span className="headline-4">
              {String(number).padStart(2, '0')}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default Card
