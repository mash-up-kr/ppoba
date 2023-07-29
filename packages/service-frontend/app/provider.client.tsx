'use client'
import type { PropsWithChildren, JSX } from 'react'
import { useState } from 'react'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'

import { theme } from '@/theme'

function Provider({ children }: PropsWithChildren): JSX.Element {
  const [client] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default Provider
