'use client'
import React from 'react'

import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { Button } from '@ppoba/ui'

import { Header } from '@/app/components'
import { deckFormAtomState } from '@/store/deck'

export default function CreateDeck(): JSX.Element {
  const [deck, setDeck] = useRecoilState(deckFormAtomState);
  const router = useRouter()

  const handleClick = () => {
    router.push('/create-deck')
  }

  return (
    <div className="min-h-screen flex flex-col justify-between pb-[16px] bg-light">
      <Header leftIconType="back" onClickLeftIcon={() => router.back()} />
      <div className="flex flex-col h-[calc(100vh-76px)] justify-center items-center">
        <input
          type="text"
          placeholder="덱 이름을 알려줘 (최대 11자)"
          className="headline-2 text-black text-center placeholder:text-grey-200 bg-transparent"
          maxLength={11}
          value={deck.name}
          onChange={(e) => setDeck({ ...deck, name: e.target.value })}
        />
      </div>
      <Button size="large" rightIcon="goLight" onClick={handleClick}>
        이름 정했어
      </Button>
    </div>
  )
}
