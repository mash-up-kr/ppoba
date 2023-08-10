'use client'
import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { redirect, useRouter } from 'next/navigation'
import { api } from '@ppoba/api'

import { GameCardList, Header } from '../components'
import Footer from '../components/common/Footer'
import { MyDeckTypeOrder } from '../constants'

export default function MyDeckPage(): JSX.Element {
  const router = useRouter()

  const { data: userData, isError: isUserDataError } = useQuery(
    ['getDeckListByUserId'],
    () => api.deck.getDeckListByUserId({ userId: '2931028309' }),
    {
      // TODO: Change userId
      suspense: true,
    },
  )

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

  if (isUserDataError) {
    redirect('/404')
  }

  if (userData?.result?.length === 0 || !myDeckList) {
    return <></>
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-light">
      <Header
        className="h-[60px] bg-light"
        leftIconType="back"
        onClickLeftIcon={() => router.back()}
        title="내가 만든 덱"
      />

      <section className="pt-[60px] pb-[50px]">
        <GameCardList
          orientation="vertical"
          games={myDeckList}
          className="pt-[10px]"
        />
      </section>

      <Footer />
    </div>
  )
}
