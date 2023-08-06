'use client'

import { useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Icon, TwoOptionRadioButton } from '@ppoba/ui'

import { Header } from '@/app/components/common'
import BottomCta from '@/app/components/common/BottomCta'
import GameCategoryChip from '@/app/components/marketplace/game/GameCategoryChip'

import { CardType } from './play/Card'
import { CardIcon, CardStyle } from './play/constant'

const DEFAULT_DECK_TYPE: CardType = 'nail'
const DEFAULT_TITLE = '이미지게임가나다라마바사아자차'

const TEST_GAME_DATA = {
  isAdult: true,
  chipList: [
    '비밀',
    '가치관',
    '취미',
    '비밀',
    '가치관',
    '취미',
    '비밀',
    '가치관',
    '취미',
    '비밀',
    '가치관',
    '취미',
  ],
  cardList: [
    {
      id: 0,
      type: 'nail' as CardType,
      content:
        '김가나다라마바사아자 김가나다라마바사아자 김가나다라마바사아자 김가나다라마바사아자 김가나다라마',
    },
    {
      id: 1,
      type: 'nail' as CardType,
      content: '김가나다라마바사아자 김가나다라마바사아자 ',
    },
    {
      id: 2,
      type: 'nail' as CardType,
      content: '김가나다라마바사아자 김가나다라마바사아자 ',
    },
  ],
}

enum PLAY_TYPE {
  NORMAL = '일반 뽑기',
  TAROT = '타로 뽑기',
}

interface Props {
  params: {
    id: string
  }
}

export default function DeckDetail({ params }: Props): JSX.Element {
  const router = useRouter()

  // Search Parameter로 Deck Type 전달 받기 -> 없는 경우 Default Type으로 설정
  const searchParams = useSearchParams()
  const deckType = (searchParams.get('type') as CardType) ?? DEFAULT_DECK_TYPE

  const mainTitleRef = useRef<HTMLHeadingElement>(null)
  const isMainTitleInView = useInView(mainTitleRef)

  const [playType, setPlayType] = useState<PLAY_TYPE | string>('')

  // Style based on type
  const bgColor = CardStyle[deckType].background
  const deckIcon = CardIcon[deckType].normalSideIcon

  const handleClickPlayButton = () => {
    switch (playType) {
      case PLAY_TYPE.NORMAL:
        router.push(`/deck/${params.id}/normal`)
        return
      case PLAY_TYPE.TAROT:
        router.push(`/deck/${params.id}/tarot`)
        return
    }
  }

  return (
    <div className="bg-light">
      <Header
        title={
          <AnimatePresence>
            {!isMainTitleInView && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {DEFAULT_TITLE}
              </motion.span>
            )}
          </AnimatePresence>
        }
        className={`justify-end ${bgColor} !h-[60px] py-[10px] px-[16px]`}
        leftIconType="back"
        onClickLeftIcon={() => router.push('/')}
        rightIconType="share"
      />

      {/* Main Content Section */}
      <main>
        {/* --- Deck Detail Top Section --- */}
        <div
          className={`pt-[72px] px-[32px] pb-[56px] text-grey-800 ${bgColor}`}
        >
          {/* Deck Card Cnt */}
          <div className="flex items-center">
            <Icon type={deckIcon} width={15} height={14} className="" />
            <span className="headline-4 ml-[4px]">50</span>
          </div>

          {/* Deck Title */}
          <h1 className="mt-[6px] headline-1" ref={mainTitleRef}>
            {DEFAULT_TITLE}
          </h1>

          {/* Chip List */}
          <div className="mt-[20px] gap-x-[4px] flex flex-wrap gap-y-[8px]">
            {TEST_GAME_DATA.isAdult && (
              <div className="shrink-0">
                <GameCategoryChip
                  label="19+"
                  bgColor="bg-grey-800"
                  textColor="text-light"
                />
              </div>
            )}
            {TEST_GAME_DATA.chipList.map((chip, index) => (
              <div key={index} className="shrink-0">
                <GameCategoryChip label={chip} />
              </div>
            ))}
          </div>
        </div>

        {/* --- Deck Detail Card Section --- */}
        <div className="pb-[40px]">
          {/* Deck Card List */}
          <div className="flex gap-x-[8px] px-[24px] -mt-[26px] overflow-x-hidden snap-x pb-[24px]">
            {TEST_GAME_DATA.cardList.map(card => {
              return (
                <div
                  key={card.id}
                  className="relative px-[20px] py-[30px] rounded-[18px] shadow-[4px_4px_20px_0px_rgba(0,0,0,0.10)] w-[150px] h-[200px] shrink-0 bg-white flex items-center justify-center"
                >
                  <p className="z-10 headline-5 text-grey-700 relative w-full text-center select-none">
                    {card.content}
                  </p>

                  {/* Background Dot Icon */}
                  <Icon
                    type={CardIcon[card.type].greyDotIcon}
                    height={120}
                    width={120}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-grey-700 opacity-[0.1]"
                  />
                </div>
              )
            })}
          </div>

          <div className="flex justify-center items-center">
            <Icon type="top" width={20} height={20} className="opacity-[0.3]" />
            <p className="text-grey-400 subtitle-3">이런 카드들이 담겨있어!</p>
          </div>
        </div>

        <div className="h-[10px] bg-[#EFEFEF] w-full" />

        {/* --- Deck Detail Bottom Section --- */}
        <div className="px-[24px] pt-[30px] pb-[137px]">
          <div className="flex justify-start items-center px-[8px]">
            <h2 className="headline-3 text-grey-800">뽑기 방법을 선택해줘</h2>
            <Icon type="question" width={24} height={24} className="ml-[4px]" />
          </div>

          <div className="mt-[20px]">
            <TwoOptionRadioButton<PLAY_TYPE | string>
              value={playType}
              options={[PLAY_TYPE.NORMAL, PLAY_TYPE.TAROT]}
              onClickItem={option => setPlayType(option)}
            />
          </div>
        </div>
      </main>

      {/* Bottom Button Section */}
      <BottomCta className="px-[24px] bottom-[16px]">
        <Button
          size="large"
          rightIcon="goWhite"
          disabled={playType === ''}
          onClick={handleClickPlayButton}
        >
          플레이하기
        </Button>
      </BottomCta>
    </div>
  )
}
