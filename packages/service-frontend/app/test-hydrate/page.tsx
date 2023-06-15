import type { JSX } from 'react'

import { dehydrate } from '@tanstack/react-query'

import getQueryClient from '@/app/getQueryClient'
import Hydrate from '@/app/hydrate.client'
import testQuery from '@/src/api'

import Test from './test.client'

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
