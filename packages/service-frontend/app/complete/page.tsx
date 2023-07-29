'use client'

import Lottie from 'lottie-react'
import { useRouter } from 'next/navigation'
import { Button } from '@ppoba/ui'

import addDeckLottie from '@/public/lottie/addDeckLottie.json'

import { Header } from '../components/common'

export default function DeckCreateCompletePage(): JSX.Element {
  const router = useRouter()
  
  const handleClick = () => {
    // TODO: 실제 덱 아이디를 받아서 이동하도록 수정
    router.push('/deck/1')
  }

  return (
    <div className="min-h-screen px-[16px] flex flex-col gap-[20px]">
      <Header rightIconType="home" onClickRightIcon={() => router.push('/')} />
      <h1 className="text-black headline-1 whitespace-pre pt-[72px]">
        {'축하해!\n게임을 완성했어'}
      </h1>

      <Lottie animationData={addDeckLottie} />

      <Button
        size="large"
        className="headline-4 text-white"
        rightIcon="goLight"
        onClick={handleClick}
      >
        플레이하기
      </Button>
    </div>
  )
}
