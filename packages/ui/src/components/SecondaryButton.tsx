import type { JSX, PropsWithChildren } from 'react';

import { IconType } from './Icon';
import { Icon } from '../components';

type ButtonSize = 'small' | 'medium';

type Props = {
  size?: ButtonSize;
  rightIcon?: IconType;
} & React.ComponentPropsWithoutRef<'button'>;

const sizes = {
  small: 'w-[100px]',
  medium: 'w-[151px]',
};

function SecondaryButton({
  children,
  size,
  rightIcon,
  className = '',
  ...props
}: PropsWithChildren<Props>): JSX.Element {
  const { disabled } = props;
  const buttonSize = sizes[size ?? 'small'];

  return (
    <button
      type="button"
      className={`flex justify-center items-center ${buttonSize} h-[60px] text-base text-grey-800 font-bold leading-[150%] tracking-[-0.16px] border border-grey-600 rounded-[20px] bg-white
        hover:text-grey-600 hover:border-grey-400 hover:bg-[#EFEFEF]
        disabled:text-grey-300 disabled:border-grey-200 disabled:bg-white 
        ${disabled ? 'disabled:cursor-not-allowed' : 'cursor-pointer'}
        ${className}`}
      {...props}
    >
      {children}
      {rightIcon && (
        <Icon
          type={rightIcon}
          width={24}
          height={24}
          className={`inline-block align-bottom ml-[2px] ${disabled && 'opacity-40 cursor-not-allowed'}`}
        />
      )}
    </button>
  );
}

export default SecondaryButton;
