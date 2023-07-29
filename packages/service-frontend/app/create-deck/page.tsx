'use client'
import React, { useState, useRef } from 'react'

import { useRouter } from 'next/navigation'
import { Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button, Icon, SecondaryButton } from '@ppoba/ui'

import 'swiper/css'
import 'swiper/css/scrollbar'

import { Header } from '@/app/components'
import { CardStyle } from '@/app/deck/[id]/play/constant'

// DUMMY DATA
const DUMMY_DATA = ['1', '2', '3', '4', '5']

// NOTE(jiyoung.lim): 추후 컬러 업데이트가 되면 수정해야 함
const bgColors: string[] = Object.values(CardStyle).map(
  style => style.background,
)

export default function CreateDeck(): JSX.Element {
  const [text, setText] = useState('')
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/confirm-detail')
  }

  return (
    <div className="min-h-screen flex flex-col justify-between pb-[16px] bg-light">
      <Header leftIconType="back" onClickLeftIcon={() => router.back()} title="매시업 이미지 게임" />
      <div className="flex flex-col h-[calc(100vh-76px)] pt-[52px] justify-center">
        <div className="mt-[60px] mx-[-24px]">
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
          >
            {DUMMY_DATA.map((data, idx) => (
              <SwiperSlide key={data}>
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
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="새로운 카드 내용을 입력해줘"
                        maxLength={50}
                        className={`w-full h-[205px] headline-3 placeholder:text-[rgba(36,36,36,0.50)] bg-transparent text-center break-keep resize-none`}
                      />
                      <button className="p-[14px] bg-white/20 rounded-full">
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
          <Icon type="nail" width="20" height="20" className="mr-[2px]" />1
          <span className="text-grey-200">/20장</span>
        </div>
      </div>
      <div className="flex justify-between gap-[10px]">
        <SecondaryButton size="small" className="shrink-0" rightIcon="deckAdd">
          카드
        </SecondaryButton>
        <Button size="large" onClick={handleClick}>덱을 완성했어</Button>
      </div>
    </div>
  )
}
