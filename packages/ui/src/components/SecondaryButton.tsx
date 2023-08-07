import type { JSX, PropsWithChildren } from 'react';

import { Squircle } from 'corner-smoothing';

import { IconType } from './Icon';
import { Icon } from '../components';

type ButtonSize = 'small' | 'medium';

type Props = {
  size?: ButtonSize;
  rightIcon?: IconType;
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

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
    <Squircle
      role="button"
      cornerRadius={24}
      borderWidth={1}
      className={`relative flex justify-center items-center ${buttonSize} h-[60px] text-base text-grey-800 font-bold leading-[150%] tracking-[-0.16px] transition-all bg-grey-600
        text-grey-800
        hover:bg-grey-400 hover:text-grey-600
        disabled:bg-grey-200 disabled:text-grey-300
        before:absolute before:w-full before:h-full before:bg-white before:transition-all
        before:disabled:bg-white 
        before:hover:bg-[#EFEFEF]
        ${disabled ? 'before:cursor-not-allowed cursor-not-allowed' : 'cursor-pointer'}
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
    </Squircle>
  );
}

export default SecondaryButton;
