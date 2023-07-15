import type { JSX, MouseEventHandler } from 'react'

import { Icon } from '@ppoba/ui'
import { IconType } from '@ppoba/ui/dist/src/components/Icon'

type Props = {
  title?: string
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
      className={`fixed w-full max-w-[420px] h-[52px] leading-[52px] left-1/2 -translate-x-1/2 flex justify-center items-center ${className}`}
    >
      {leftIconType && (
        <Icon
          type={leftIconType}
          width={24}
          height={24}
          onClick={onClickLeftIcon}
          className="absolute left-6 -x-translate-1/2"
        />
      )}
      <strong className="headline-4 text-black">{title}</strong>
      {rightIconType && (
        <Icon
          type={rightIconType}
          width={24}
          height={24}
          onClick={onClickRightIcon}
          className="absolute right-6 x-translate-1/2"
        />
      )}
    </header>
  )
}

export default Header
