'use client'
import type { JSX } from 'react'

import { useRouter } from 'next/navigation'

function LoginHeader(): JSX.Element {
  const router = useRouter()

  return (
    <>
      <header
        className={`fixed w-full max-w-[420px] h-[52px] leading-[52px] left-1/2 -translate-x-1/2 flex justify-end items-center pr-[26px] bg-light`}
      >
        <strong
          className="headline-5 text-black cursor"
          role="button"
          onClick={() => router.push('/login')}
        >
          로그인
        </strong>
      </header>

      {/* Spacing Div */}
      <div className="w-full max-w-[420px] h-[52px]" />
    </>
  )
}

export default LoginHeader
