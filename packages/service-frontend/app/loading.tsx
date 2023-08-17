'use client'

import Lottie from 'lottie-react'

import { ContentWrapper } from '@/app/components'
import loginLottie from '@/public/lottie/loginLottie.json'

// TODO: Change loading animation
export default function Loading(): JSX.Element {
  return (
    <ContentWrapper>
      <div className="min-h-screen px-[16px] flex flex-col gap-[20px] justify-center items-center">
        <Lottie animationData={loginLottie} />
      </div>
    </ContentWrapper>
  )
}
