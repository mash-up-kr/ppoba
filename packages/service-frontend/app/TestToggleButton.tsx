'use client'
import { useState, type JSX } from 'react'

import { ToggleButton } from '@ppoba/ui'

function TestToggleButton(): JSX.Element {
  const [value, setValue] = useState<boolean>(false)

  return (
    <ToggleButton
      value={value}
      onClick={() => {
        console.log('hi', value)
        setValue(prev => !prev)
      }}
    />
  )
}

export default TestToggleButton
