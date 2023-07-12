'use client'
import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/scrollbar'

import { Scrollbar } from 'swiper/modules'

const COUNT = [
  '1',
  '2',
  '3',
  '4',
  '5',
]

export default function CreateDeck(): JSX.Element {
  return (
    <div className="pt-[52px] bg-light">
      <input type="text" placeholder="덱 이름을 알려줘 (최대 11자)" className="headline-2 text-black bg-transparent" />
      <div className='mx-[-24px]'>
        <Swiper scrollbar slidesPerView={1.7} spaceBetween={16} centeredSlides={true} modules={[Scrollbar]}>
          {COUNT.map((count) => (
            <SwiperSlide key={count}>
              {({ isActive }) => (
                <div className={`flex justify-center items-center min-w-[240px] h-[320px] px-[35px] pt-[40px] pb-[16px] rounded-xl bg-[#81E4BB] translate-y-[${isActive ? 50 : 0}]`}>
                  <textarea placeholder="새로운 카드 내용을 입력해줘" className="grow w-full h-[120px] headline-3 bg-transparent text-center break-keep"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
