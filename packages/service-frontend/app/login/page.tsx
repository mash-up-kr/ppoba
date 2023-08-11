'use client'

import Lottie from 'lottie-react'
import { useRouter } from 'next/navigation'
import { KakaoButton } from '@ppoba/ui'

import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import loginLottie from '@/public/lottie/loginLottie.json'

import { useLogin } from './hooks'

export default function Login(): JSX.Element {
  const { handleLoginClick } = useLogin()
  const isLoggedIn = useIsLoggedIn()
  const router = useRouter()

  if (isLoggedIn) {
    router.back()
  }

  return (
    <div className="min-h-screen px-[16px] py-[80px] flex flex-col justify-between">
      <h1 className="text-black headline-1">
        덱을 만들려면
        <br />
        로그인이 필요해!
      </h1>

      <Lottie animationData={loginLottie} />

      <KakaoButton onClick={handleLoginClick} />
    </div>
  )
}
