'use client'
import Link from 'next/link'
import type { JSX } from 'react'
import { useQuery } from '@tanstack/react-query'

import testQuery from '@/src/api'

export default function Test(): JSX.Element {
  // Hydrated fetch
  const { data: hydrateData } = useQuery({
    queryKey: ['test-hydrate'],
    queryFn: testQuery,
    refetchOnMount: false,
  })

  // client side fetch
  const { data: clientData } = useQuery({
    queryKey: ['test-client'],
    queryFn: testQuery,
  })

  return (
    <>
      <div>Hydrate Posts: {hydrateData?.status}</div>
      <div>Client Posts: {clientData?.status}</div>

      <Link href="/">Back</Link>
    </>
  )
}
