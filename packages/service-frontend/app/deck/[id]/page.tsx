import { Metadata } from 'next'

import DeckDetail from './DeckDetail'
import { CardType } from './play/Card'
import { CardStyle } from './play/constant'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    type: string
  }
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const type = (searchParams.type as CardType) ?? 'nail'
  const hexVal = CardStyle[type].rawHex

  return {
    themeColor: hexVal,
  }
}

export default function DeckDetailPage({ params }: Props): JSX.Element {
  return <DeckDetail params={params} />
}
