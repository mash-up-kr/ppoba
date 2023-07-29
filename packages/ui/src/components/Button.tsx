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
    <>
      <button
        type="button"
        className={`flex justify-center items-center ${buttonSize} h-[60px] text-base  text-white font-bold leading-[150%] tracking-[-0.16px] border border-grey-800 bg-grey-800
        hover:bg-grey-600
        disabled:bg-grey-200 disabled:border-grey-200
        ${disabled ? 'disabled:cursor-not-allowed' : 'cursor-pointer'}
        ${className}`}
        {...props}
        style={{
          clipPath: `url(#squircleClip)`,
        }}
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
      <svg width="151" height="60" viewBox="0 0 151 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
          <path d="M0 30C0 7 7 0 30 0H121C144 0 151 7 151 30C151 53 144 60 121 60H30C7 60 0 53 0 30Z" fill="#242424" />
        </clipPath>
      </svg>
    </>
  );
}

export default Button;
