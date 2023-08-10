import { CardType } from './deck/[id]/play/Card'

export const DeckTypeOrder: CardType[] = [
  'nail',
  'sprout',
  'feather',
  'turnip',
  'swallow',
  'clover',
  'flower',
  'plug',
]

export const MyDeckTypeOrder: CardType[] = [...DeckTypeOrder].reverse()
