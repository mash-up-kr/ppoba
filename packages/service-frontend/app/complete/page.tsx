'use client'

import Lottie from 'lottie-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@ppoba/ui'

import addDeckLottie from '@/public/lottie/addDeckLottie.json'

import { Header } from '../components/common'

export default function DeckCreateCompletePage(): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const deckId = searchParams.get('deckId')

  const handleClick = () => {
    router.push(`/deck/${deckId}`)
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
