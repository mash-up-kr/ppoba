'use client'
import type { JSX } from 'react'

function LoginHeader(): JSX.Element {
  return (
    <header
      className={`fixed w-full max-w-[420px] h-[52px] leading-[52px] left-1/2 -translate-x-1/2 flex justify-end items-center pr-[26px]`}
    >
      <strong
        className="headline-5 text-black cursor"
        role="button"
        onClick={() => console.log('login')}
      >
        로그인
      </strong>
    </header>
  )
}

export default LoginHeader
