import type { JSX } from 'react'

import { AlertMessage } from '@ppoba/ui'

import TextCheckBoxTest from './TextCheckBoxTest'
import TwoOptionButtonTest from './TwoOptionButtonTest'

export default async function ButtonTest(): Promise<JSX.Element> {
  return (
    <div className="min-h-screen bg-white">
      <TwoOptionButtonTest />
      <TextCheckBoxTest />
      <h2 className="text-black text-lg">AlertMessage Test</h2>
      <AlertMessage
        iconWidth={24}
        iconHeight={24}
        iconType={'alert'}
        text={'최대 글자를 넘어서 입력이 안되고 있어 :('}
      />
    </div>
  )
}
