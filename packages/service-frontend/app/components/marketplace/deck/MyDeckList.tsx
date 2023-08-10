import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { redirect, useRouter } from 'next/navigation'
import { api } from '@ppoba/api'

import { MyDeckTypeOrder } from '@/app/constants'

import { GameCardList, GameCardListTitle } from '../game'

export default function MyDeckList(): JSX.Element {
  const router = useRouter()

  const { data: meData } = useQuery(
    ['getMe'],
    () => api.auth.getMe(),
  )
  const { data: userData, isError: isUserDataError } = useQuery(
    ['getDeckListByUserId'],
    () => api.deck.getDeckListByUserId({ userId: meData?.id ?? '' }),
    {
      suspense: true,
      enabled: !!meData?.id,
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
  )
}
