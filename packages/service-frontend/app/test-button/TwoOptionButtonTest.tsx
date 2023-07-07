'use client'
import { type JSX } from 'react'
import { useState } from 'react'

import { TwoOptionRadioButton } from '@ppoba/ui'

type AnimationType = '일반 뽑기' | '타로 뽑기'

const animationList: [AnimationType, AnimationType] = ['일반 뽑기', '타로 뽑기']

function TwoOptionButtonTest(): JSX.Element {
  const [selectedValue, setSelectedValue] = useState<AnimationType>('일반 뽑기')

  return (
    <>
      <h2 className="text-black text-lg">Two Option Test</h2>
      <div className="max-w-[310px]">
        <TwoOptionRadioButton
          value={selectedValue}
          options={animationList}
          onClickItem={(animation: AnimationType) =>
            setSelectedValue(animation)
          }
        />
      </div>
    </>
  )
}

export default TwoOptionButtonTest
