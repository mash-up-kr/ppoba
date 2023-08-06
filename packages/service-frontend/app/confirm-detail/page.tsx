'use client'
import { useState, type JSX, useCallback } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { api } from '@ppoba/api'
import { DeckCategory } from '@ppoba/types/src/dto/createDeckDto'
import { Icon, Button } from '@ppoba/ui'

import { Header } from '@/app/components'
import { deckFormAtomState } from '@/store/deck'

import GameKeywordBox from './GameKeywordBox'

const INITIAL_KEYWORDS = [
  '비밀',
  '가치관',
  '취미',
  '특이취향',
  '연애•결혼',
  '미래',
  '과거',
  '인간관계',
]

export default function ConfirmDetailPage(): JSX.Element {
  const [isAdultGame, setIsAdultGame] = useState<boolean>(false)
  const [deck, setDeck] = useRecoilState(deckFormAtomState)
  const router = useRouter()
  const { mutate } = useMutation(api.deck.createDeck, {
    onSuccess: data => {
      const cardList = deck.cardList.filter(card => card?.content !== undefined)
      createCardMutate({
        createCardDto: {
          deckId: data.result.deck_id,
          cardList: cardList,
        },
      })
    },
    onError: error => {
      console.log('error', error)
    },
  })
  const { mutate: createCardMutate } = useMutation(api.card.createCard, {
    onSuccess: (_, variables) => {
      const deckId = variables.createCardDto.deckId
      router.push(`/complete?deckId=${deckId}`)
    },
    onError: error => {
      console.log('error', error)
    },
  })

  const handleClick = () => {
    mutate({
      createDeckDto: {
        name: deck.name,
        userId: '2931028309', // TODO: 실제 user id 넣기
        category: deck.category as DeckCategory[],
      },
    })
  }

  const handleClickKeyword = useCallback(
    (keyword: string) => {
      const nextSelectedKeywords = [...deck.category]
      const targetIndex = nextSelectedKeywords.findIndex(
        item => item === keyword,
      )

      if (targetIndex !== -1) {
        // 기존에 선택했던 키워드라면 제거한다.
        nextSelectedKeywords.splice(targetIndex, 1)
        setDeck({ ...deck, category: nextSelectedKeywords })
      } else {
        setDeck({ ...deck, category: [...nextSelectedKeywords, keyword] })
      }
    },
    [deck, setDeck],
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        leftIconType="backWhite"
        onClickLeftIcon={() => router.back()}
        className="bg-grey-800"
      />
      {/* 게임 상세 타이틀 */}
      <div className="bg-grey-800 h-[218px] py-[72px]">
        <div className="flex flex-col gap-1 px-[32px] py-[20px]">
          <div className="flex gap-[4.5px]">
            <Icon type="cardcountWhite" width={20} height={20} />
            50
          </div>
          <div className="headline-1 text-white">뉴 매시업 이미지 게임</div>
        </div>
      </div>
      {/* 키워드 선택 */}
      <GameKeywordBox
        keywords={INITIAL_KEYWORDS}
        selectedKeywords={deck.category}
        isAdultGame={isAdultGame}
        onClickKeyword={handleClickKeyword}
        onClickAdult={() => setIsAdultGame(prev => !prev)}
      />
      {/* 게임 업로드 */}
      <div className="w-full px-[24px] pb-4">
        <Button
          size="large"
          rightIcon="goWhite"
          className="transition-all"
          disabled={deck.category.length === 0 && !isAdultGame}
          onClick={handleClick}
        >
          업로드 하자
        </Button>
      </div>
    </div>
  )
}
