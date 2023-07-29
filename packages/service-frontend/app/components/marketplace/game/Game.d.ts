import { CardType } from '@/app/deck/[id]/play/Card'

type GameCardListHeaderType = 'MY_GAME' | 'ALL_GAME'
interface Game {
  id: number
  cardCount: number
  title: string
  isAdult: boolean
  chipList: string[]
  type: CardType
}
