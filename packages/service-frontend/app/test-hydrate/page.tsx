import type { JSX } from 'react'
import { dehydrate } from '@tanstack/react-query'

import Test from './test.client'
import testQuery from '@/src/api'
import Hydrate from '../hydrate.client'
import getQueryClient from '../getQueryClient'

export default async function HydrateTest(): Promise<JSX.Element> {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['test-hydrate'], testQuery)
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <Test />
    </Hydrate>
  )
}
