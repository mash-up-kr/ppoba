import './globals.css'

import { dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'
import { api } from '@ppoba/api'

import DesktopSideContents from './components/common/DesktopSideContents'
import getQueryClient from './getQueryClient'
import HydrateClient from './hydrate.client'
import Provider from './provider.client'

export const metadata: Metadata = {
  title: 'PPOBA - 뽀바',
  description: '뽀바, 너만의 카드게임을 즐겨봐',
  themeColor: '#F7F7F7',
  metadataBase: new URL(
    `https://${
      process.env.NEXT_PUBLIC_STAGE === 'prod' ? '' : 'dev.'
    }ppoba.app`,
  ),
  openGraph: {
    title: 'PPOBA - 뽀바',
    description: '뽀바, 너만의 카드게임을 즐겨봐',
    images: `/opengraph-image.png`,
    url: `https://${
      process.env.NEXT_PUBLIC_STAGE === 'prod' ? '' : 'dev.'
    }ppoba.app`,
    locale: 'ko_KR',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['getAllDeck'],
    queryFn: api.deck.getAllDeck,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <html lang="en">
      <body className="flex justify-center items-start bg-black xl:gap-x-[107px]">
        <DesktopSideContents />

        <Provider>
          <HydrateClient state={dehydratedState}>
            <div className="relative max-w-[420px] w-full min-h-screen bg-light">
              {children}
            </div>
          </HydrateClient>
        </Provider>
      </body>
    </html>
  )
}
