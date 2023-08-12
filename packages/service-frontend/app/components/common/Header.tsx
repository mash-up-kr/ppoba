'use client'
import type { JSX, MouseEventHandler } from 'react'

import { Icon } from '@ppoba/ui'
import { IconType } from '@ppoba/ui/dist/src/components/Icon'

type Props = {
  title?: string | JSX.Element
  className?: string
  leftIconType?: IconType
  rightIconType?: IconType
  onClickLeftIcon?: MouseEventHandler<SVGSVGElement>
  onClickRightIcon?: MouseEventHandler<SVGSVGElement>
}

function Header({
  title,
  className,
  leftIconType,
  rightIconType,
  onClickLeftIcon,
  onClickRightIcon,
}: Props): JSX.Element {
  return (
    <header
      className={`fixed w-full max-w-[396px] h-[52px] z-[500] leading-[52px] top-0 flex justify-center items-center ${className}`}
    >
      {leftIconType && (
        <Icon
          type={leftIconType}
          width={24}
          height={24}
          onClick={onClickLeftIcon}
          className="absolute left-6 -x-translate-1/2 cursor-pointer"
        />
      )}
      <strong className="headline-4 text-black">{title}</strong>
      {rightIconType && (
        <Icon
          type={rightIconType}
          width={24}
          height={24}
          onClick={onClickRightIcon}
          className="absolute right-6 x-translate-1/2 cursor-pointer"
        />
      )}
    </header>
  )
}

export default Header
