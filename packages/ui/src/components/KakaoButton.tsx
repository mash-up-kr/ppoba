import type { JSX, PropsWithChildren } from 'react';

import { Squircle } from 'corner-smoothing';

import { Icon } from '../components';


type Props = {
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;


function KakaoButton({ className = '', ...props }: PropsWithChildren<Props>): JSX.Element {
  const { disabled } = props;

  return (
    <Squircle
      role="button"
      cornerRadius={24}
      className={`flex justify-center items-center w-full h-[60px] text-base text-black font-bold leading-[150%] tracking-[-0.16px] rounded-[20px]
        bg-[#FEE500]
        ${disabled ? 'disabled:cursor-not-allowed' : 'cursor-pointer'}
        ${className}`}
      {...props}
    >
      <Icon
        type="kakao"
        width={24}
        height={24}
        className={`inline-block align-bottom mr-[4px] ${disabled && 'opacity-40'}`}
      />
      카카오로 시작하기
    </Squircle>
  );
}

export default KakaoButton;
