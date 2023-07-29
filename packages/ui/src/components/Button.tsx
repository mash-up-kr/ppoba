import type { JSX, PropsWithChildren } from 'react';

import { IconType } from './Icon';
import { Icon } from '../components';

type ButtonSize = 'small' | 'medium' | 'large';

type Props = {
  size?: ButtonSize;
  rightIcon?: IconType;
} & React.ComponentPropsWithoutRef<'button'>;

const sizes = {
  small: 'w-[151px]',
  medium: 'w-[202px]',
  large: 'w-full',
};

function Button({ children, size, rightIcon, className = '', ...props }: PropsWithChildren<Props>): JSX.Element {
  const { disabled } = props;
  const buttonSize = sizes[size ?? 'medium'];
  return (
    <button
      type="button"
      className={`flex justify-center items-center ${buttonSize} h-[60px] text-base  text-white font-bold leading-[150%] tracking-[-0.16px] rounded-[20px] border border-grey-800 bg-grey-800
        hover:bg-grey-600
        disabled:bg-grey-200 disabled:border-grey-200
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
          className={`inline-block align-bottom ml-[2px] ${disabled && 'opacity-40'}`}
        />
      )}
    </button>
  );
}

export default Button;
