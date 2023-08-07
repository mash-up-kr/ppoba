'use client'

import type { JSX } from 'react'
import { useState, useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useRouter, redirect } from 'next/navigation'
import { api } from '@ppoba/api'
import { Icon } from '@ppoba/ui'

import GameCardList from '@/app/components/marketplace/game/GameCardList'

import Footer from './components/common/Footer'
import GameCardListTitle from './components/marketplace/game/GameCardListTitle'
import { CardType } from './deck/[id]/play/Card'
import LoginHeader from './LoginHeader'

const AllDeckCardTypeOrder: CardType[] = [
  'nail',
  'sprout',
  'feather',
  'turnip',
  'swallow',
  'clover',
  'flower',
  'plug',
]

const MyDeckCardTypeOrder: CardType[] = [...AllDeckCardTypeOrder].reverse()

export default function Home(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { data: userData, isError: isUserDataError } = useQuery(
    ['getDeckListByUserId'],
    () => api.deck.getDeckListByUserId({ userId: '2931028309' }),
    {
      // TODO: Change userId
      suspense: true,
    },
  )
  const { data, isError } = useQuery(
    ['getAllDeck'],
    () => api.deck.getAllDeck(),
    {
      suspense: true,
    },
  )

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    // Make sure to clean up after the component unmounts
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  const myDeckList = userData?.result?.map((deck, index) => {
    return {
      ...deck,
      type: MyDeckCardTypeOrder[index % MyDeckCardTypeOrder.length],
    }
  })

  const allDeckList = data?.result.map((deck, index) => {
    return {
      ...deck,
      type: AllDeckCardTypeOrder[index % AllDeckCardTypeOrder.length],
    }
  })

  // Redirect to 404 page if api error occurred
  if (isError || isUserDataError) {
    redirect('/404')
  }

  return (
    <main>
      <LoginHeader />

      {/* 내가 만든 영역 */}
      {/* Red - Pink - Green - Blue - Orange - Yellow - Teal - Purple */}
      <section>
        {myDeckList && (
          <GameCardList
            orientation="horizontal"
            games={myDeckList}
            title={
              <GameCardListTitle
                headerType="MY_GAME"
                label="내가 만든"
                className="mb-[-20px]"
              />
            }
            className="pt-[30px] pb-[12px]"
          />
        )}
      </section>

      {/* 덱 영역 */}
      {/* Purple - Teal - Yellow - Orange - Blue - Green - Pink - Red */}
      <section>
        {allDeckList && (
          <GameCardList
            orientation="vertical"
            games={allDeckList}
            title={
              <GameCardListTitle
                headerType="ALL_GAME"
                label="덱"
                className="mb-[10px]"
                onClick={() => setIsOpen(true)}
              />
            }
            className="pt-[30px]"
          />
        )}
      </section>

      {/* Footer */}
      <Footer />

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-[100vh] max-w-[420px] mx-auto bg-black bg-opacity-[0.8] backdrop-blur-sm">
            <div className="flex flex-col justify-center items-center h-full gap-[10px]">
              <button
                onClick={() => router.push('/create-title')}
                className="flex justify-center items-center w-[240px] px-[24px] py-[16px] subtitle-2 text-white text-center rounded-[32px] bg-black gap-[10px]"
              >
                <div className="p-[6px] bg-orange-01 rounded-full">
                  <Icon type="crop" width={20} height={20} />
                </div>
                <div className="flex-1">처음부터 만들기</div>
              </button>
              <button
                onClick={() => router.push('/create-template')}
                className="flex justify-center items-center w-[240px] px-[24px] py-[16px] subtitle-2 text-white text-center rounded-[32px] bg-black gap-[10px]"
              >
                <div className="p-[6px] bg-blue-01 rounded-full">
                  <Icon type="note" width={20} height={20} />
                </div>
                <div className="flex-1">템플릿으로 만들기</div>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-[10px] p-[14px] bg-white bg-opacity-[0.1] rounded-full"
              >
                <Icon type="closeLight" width={24} height={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
