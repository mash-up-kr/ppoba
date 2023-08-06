'use client'

import type { JSX } from 'react'
import { useState, useEffect, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useRouter, redirect } from 'next/navigation'
import { api } from '@ppoba/api'
import { Icon } from '@ppoba/ui'

import GameCardList from '@/app/components/marketplace/game/GameCardList'

import Footer from './components/common/Footer'
import AllDeckInitialItem from './components/marketplace/deck/AllDeckInitialItem'
import AllDeckLastItem from './components/marketplace/deck/AllDeckLastItem'
import GameCardListTitle from './components/marketplace/game/GameCardListTitle'
import { DeckTypeOrder, MyDeckTypeOrder } from './constants'
import LoginHeader from './LoginHeader'

export default function Home(): JSX.Element {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const { data: userData, isError: isUserDataError } = useQuery(
    ['getDeckListByUserId'],
    () => api.deck.getDeckListByUserId({ userId: '2931028309' }),
    {
      // TODO: Change userId
      suspense: true,
    },
  )

  const { data, isError } = useQuery(['getAllDeck'], api.deck.getAllDeck, {
    suspense: true,
  })

  const myDeckList = useMemo(
    () =>
      userData?.result?.map((deck, index) => {
        return {
          ...deck,
          type: MyDeckTypeOrder[index % MyDeckTypeOrder.length],
        }
      }),
    [userData?.result],
  )

  const allDeckList = useMemo(
    () =>
      data?.result.map((deck, index) => {
        return {
          ...deck,
          type: DeckTypeOrder[index % DeckTypeOrder.length],
        }
      }),
    [data?.result],
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

  // Redirect to 404 page if api error occurred
  if (isError || isUserDataError) {
    redirect('/404')
  }

  const isLoggedIn = true

  return (
    <main className="relative">
      <LoginHeader onClickCreateDeck={() => setIsOpen(true)} />

      {/* 내가 만든 영역 */}
      {/* TODO: 로그인 안 한 경우 안보여짐 */}
      {/* Red - Pink - Green - Blue - Orange - Yellow - Teal - Purple */}
      <section>
        {isLoggedIn && myDeckList && (
          <GameCardList
            orientation="horizontal"
            games={myDeckList}
            title={
              <GameCardListTitle
                headerType="MY_GAME"
                label="내가 만든"
                className="mb-[-20px]"
                onClick={() => router.push('/my-deck')}
              />
            }
            className="pt-[30px]"
          />
        )}
      </section>

      {/* 회색 로고 - 비로그인 경우 보여짐 */}
      {!isLoggedIn && (
        <div className="w-full flex justify-center items-center">
          <Icon type="logoGrey" width={270} height={90} />
        </div>
      )}

      {/* 덱 영역 */}
      {/* Purple - Teal - Yellow - Orange - Blue - Green - Pink - Red */}
      <section className={isLoggedIn ? 'pt-[20px]' : ''}>
        {allDeckList && (
          <GameCardList
            title={
              isLoggedIn && (
                <GameCardListTitle
                  headerType="ALL_GAME"
                  label="전체 덱"
                  className="pb-[10px]"
                />
              )
            }
            orientation="vertical"
            games={allDeckList}
            className="pb-[40px]"
            customInitialItem={
              <AllDeckInitialItem onClick={() => setIsOpen(true)} />
            }
            customLastItem={<AllDeckLastItem onClick={() => setIsOpen(true)} />}
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
