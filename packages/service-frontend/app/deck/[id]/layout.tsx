import { dehydrate } from '@tanstack/react-query'
import { api } from '@ppoba/api'

import { ContentWrapper } from '@/app/components'
import getQueryClient from '@/app/getQueryClient'
import HydrateClient from '@/app/hydrate.client'

interface Props {
  children: React.ReactNode
  params: {
    id: string
  }
}

export default async function Layout({
  children,
  params,
}: Props): Promise<JSX.Element> {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['getDeck', params.id],
    queryFn: () => api.deck.getDeck({ deckId: params.id }),
    cacheTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 10,
  })

  await queryClient.prefetchQuery({
    queryKey: ['getCardList', params.id],
    queryFn: () => api.card.getCards({ deckId: params.id }),
    cacheTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 10,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrateClient state={dehydratedState}>
      <ContentWrapper isFullWidth>{children}</ContentWrapper>
    </HydrateClient>
  )
}
