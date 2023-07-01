'use client'

import Lottie from 'lottie-react'

import loginLottie from '@/public/lottie/loginLottie.json'

export default function Login(): JSX.Element {
  return (
    <div className="min-h-screen px-[16px] py-[80px] flex flex-col justify-between">
      <h1 className="text-black headline-1">
        덱을 만들려면
        <br />
        로그인이 필요해!
      </h1>

      <div className="">
        <Lottie animationData={loginLottie} />
      </div>

      <div className="">
        <button className="w-full bg-[#FEE500] headline-4 text-black opacity-85 py-[18px]">
          카카오로 시작하기
        </button>
      </div>
    </div>
  )
}
