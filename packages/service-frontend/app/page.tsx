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
import MyDeckList from './components/marketplace/deck/MyDeckList'
import GameCardListTitle from './components/marketplace/game/GameCardListTitle'
import { CreateDeckOverlay } from './components/overlay'
import { DeckTypeOrder } from './constants'
import LoginHeader from './LoginHeader'

export default function Home(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  const { data, isError } = useQuery(['getAllDeck'], api.deck.getAllDeck, {
    suspense: true,
  })

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
  if (isError) {
    redirect('/404')
  }

  // TODO: 로그인 여부 임시 세팅
  const isLoggedIn = true

  return (
    <main className="relative">
      <LoginHeader onClickCreateDeck={() => setIsOpen(true)} />

      {/* 내가 만든 영역 */}
      {/* TODO: 로그인 안 한 경우 안보여짐 */}
      {/* Red - Pink - Green - Blue - Orange - Yellow - Teal - Purple */}
      <section>{isLoggedIn && <MyDeckList />}</section>

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
      <div className="relative">
        <CreateDeckOverlay
          isOpen={isOpen}
          onClickClose={() => setIsOpen(false)}
        />
      </div>
    </main>
  )
}
