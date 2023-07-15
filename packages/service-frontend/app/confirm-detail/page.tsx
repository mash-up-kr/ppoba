'use client'
import { useState, type JSX, useCallback } from 'react'

import { Icon, Button } from '@ppoba/ui'

import { Header } from '@/components'

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
  const [keywords, setKeywords] = useState<string[]>(INITIAL_KEYWORDS)
  const [isAdultGame, setIsAdultGame] = useState<boolean>(false)
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])

  const handleClickKeyword = useCallback(
    (keyword: string) => {
      const nextSelectedKeywords = [...selectedKeywords]
      const targetIndex = nextSelectedKeywords.findIndex(
        item => item === keyword,
      )

      if (targetIndex !== -1) {
        // 기존에 선택했던 키워드라면 제거한다.
        nextSelectedKeywords.splice(targetIndex, 1)
        setSelectedKeywords(nextSelectedKeywords)
      } else {
        setSelectedKeywords([...nextSelectedKeywords, keyword])
      }
    },
    [selectedKeywords],
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header leftIconType="backWhite" className="bg-grey-800" />
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
        keywords={keywords}
        selectedKeywords={selectedKeywords}
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
          disabled={selectedKeywords.length === 0 && !isAdultGame}
        >
          업로드 하자
        </Button>
      </div>
    </div>
  )
}
