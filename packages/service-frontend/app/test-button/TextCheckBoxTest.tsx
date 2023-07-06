'use client'
import { type JSX } from 'react'
import { useState } from 'react'

import { TextCheckBox } from '@ppoba/ui'

function TextCheckBoxTest(): JSX.Element {
  const [selected, setSelected] = useState<boolean>(false)

  return (
    <>
      <h2 className="text-black text-lg">Text Checkbox Test</h2>
      <TextCheckBox
        text="Title"
        selected={selected}
        onClick={() => setSelected(prev => !prev)}
      />
    </>
  )
}

export default TextCheckBoxTest
