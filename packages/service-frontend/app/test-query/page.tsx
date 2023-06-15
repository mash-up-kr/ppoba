import type { JSX } from 'react'

import testQuery from '@/src/api'
import TestClient from './test.client'

export default async function TestQuery(): Promise<JSX.Element> {
  const test = await testQuery()

  return (
    <div>
      <TestClient test={test} />
    </div>
  )
}
