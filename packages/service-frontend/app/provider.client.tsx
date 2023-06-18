'use client'
import type { PropsWithChildren, JSX } from 'react'
import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function Provider({ children }: PropsWithChildren): JSX.Element {
  const [client] = useState(() => new QueryClient())

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default Provider
