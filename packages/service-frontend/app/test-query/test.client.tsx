'use client'

import type { JSX } from 'react'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import testQuery from '@/src/api'

interface Props {
  test: Awaited<ReturnType<typeof testQuery>>
}

export default function TestClient({ test }: Props): JSX.Element {
  const { data } = useQuery({
    queryKey: ['test-client'],
    queryFn: testQuery,
    initialData: test,
  })

  return (
    <>
      <div>Query: {data.status}</div>
      <Link href="/">Back</Link>
    </>
  )
}
