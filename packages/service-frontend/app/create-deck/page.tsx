'use client'
import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button, Icon, SecondaryButton } from '@ppoba/ui'

import 'swiper/css'
import 'swiper/css/scrollbar'

import { Header } from '@/app/components'
import { CardStyle } from '@/app/deck/[id]/play/constant'
import { deckFormAtomState } from '@/store/deck'

import Alert from '../Alert'

// DUMMY DATA
const DUMMY_DATA = ['1', '2', '3', '4', '5']

// NOTE(jiyoung.lim): 추후 컬러 업데이트가 되면 수정해야 함
const bgColors: string[] = Object.values(CardStyle).map(
  style => style.background,
)

export default function CreateDeck(): JSX.Element {
  const [isError20, setIsError20] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [deck, setDeck] = useRecoilState(deckFormAtomState)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    const contentCardList = deck.cardList.filter(
      card => typeof card.content === 'string' && card.content !== '',
    )
    if (contentCardList.length < 20) {
      setIsError20(true)
      return
    }
    router.push('/confirm-detail')
  }

  const handleClickDeleteButton = (index: number) => {
    setDeck(prev => ({
      ...prev,
      cardList: [...prev.cardList].filter((_, i) => i !== index),
    }))
  }

  const handleClickAddButton = () => {
    setDeck(prev => ({
      ...prev,
      cardList: [...prev.cardList, { content: '' }],
    }))
  }

  const handleClickPrev = () => {}

  useEffect(() => {
    if (isError20) {
      setTimeout(() => {
        setIsError20(false)
      }, 3000)
    }
  }, [isError20])

  return (
    <div className="min-h-screen flex flex-col pb-[16px] bg-light">
      <Header
        leftIconType="back"
        onClickLeftIcon={() => setIsOpen(true)}
        title="매시업 이미지 게임"
      />
      <div className="flex flex-col h-[calc(100vh-76px)] pt-[52px] justify-center">
        <div className="mx-[-24px]">
          <Swiper
            scrollbar={{
              draggable: true,
              el: '.swiper-scrollbar',
              hide: false,
            }}
            slidesPerView={1.7}
            spaceBetween={16}
            centeredSlides
            modules={[Scrollbar]}
            className="pb-[50px]"
            onActiveIndexChange={event => {
              setActiveIndex(event.activeIndex)
            }}
          >
            {deck.cardList.map((data, idx) => (
              <SwiperSlide key={idx}>
                {({ isActive }) => (
                  <div className="pt-[50px] pb-[50px]">
                    <div
                      className={`flex flex-col items-center justify-between px-[35px] pt-[40px] pb-[16px] rounded-[24px]
                        ${bgColors[idx % bgColors.length]}
                        ${
                          isActive
                            ? 'transition-all -translate-y-10 shadow-[4px_4px_20px_rgba(0,0,0,0.10)]'
                            : 'opacity-30'
                        }`}
                    >
                      <textarea
                        value={data.content}
                        placeholder="새로운 카드 내용을 입력해줘"
                        maxLength={50}
                        onChange={e => {
                          setDeck({
                            ...deck,
                            cardList: deck.cardList.map((card, i) =>
                              i === idx
                                ? {
                                    ...card,
                                    content: e.target.value,
                                  }
                                : card,
                            ),
                          })
                        }}
                        className={`w-full h-[205px] headline-3 placeholder:text-[rgba(36,36,36,0.50)] bg-transparent text-center break-keep resize-none`}
                      />
                      <button
                        className="p-[14px] bg-white/20 rounded-full"
                        onClick={() => handleClickDeleteButton(idx)}
                      >
                        <Icon type="trash" width={24} height={24} />
                      </button>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
            <div className="swiper-scrollbar relative bg-grey-100 !w-[calc(100%-48px)] mx-[24px]"></div>
          </Swiper>
        </div>
        <div className="flex justify-end items-center mt-[4px] subtitle-3 text-grey-800 text-right">
          <Icon type="nail" width="20" height="20" className="mr-[2px]" />
          {activeIndex + 1}
          <span className="text-grey-200">/{deck.cardList.length}장</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {isError20 && (
          <motion.div className="absolute bottom-[90px] left-1/2 -translate-x-1/2 whitespace-nowrap w-fit pl-[16px] pr-[24px] py-[11px] flex items-center gap-[2px] bg-[rgba(10,10,10,0.6)] rounded-[18px]">
            <Icon type="exclamationWhite" width={24} height={24} />
            <span className=" subtitle3 text-white">
              최소 20장은 만들어야 넘어갈 수 있어
            </span>
          </motion.div>
        )}
        <div className="flex justify-between gap-[10px]">
          <SecondaryButton
            size="small"
            className="shrink-0"
            rightIcon="deckAdd"
            onClick={handleClickAddButton}
          >
            카드
          </SecondaryButton>
          <Button size="large" onClick={handleClick}>
            덱을 완성했어
          </Button>
        </div>
      </div>
      {isOpen && (
        <Alert
          alertPhrase={`아직 덱이 다 만들어지지 않았어.\n정말로 그만둘거야?`}
          confirmPhrase="그만둘래"
          closePhrase="계속 만들기"
          onClickClose={() => setIsOpen(false)}
          onClickConfirm={() => router.push('')}
        />
      )}
    </div>
  )
}
