'use client'
import React from 'react'

import { Button } from '@ppoba/ui'

import { Header } from '@/app/components'

export default function CreateDeck(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col justify-between pb-[16px] bg-light">
      <Header leftIconType="back" />
      <div className="flex flex-col h-[calc(100vh-76px)] justify-center items-center">
        <input
          type="text"
          placeholder="덱 이름을 알려줘 (최대 11자)"
          className="headline-2 text-black text-center placeholder:text-grey-200 bg-transparent"
          maxLength={11}
        />
      </div>
      <Button size="large" rightIcon="goLight">
        이름 정했어
      </Button>
    </div>
  )
}
