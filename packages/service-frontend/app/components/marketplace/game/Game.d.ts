import { Deck } from '@ppoba/types'

import { CardType } from '@/app/deck/[id]/play/Card'

type GameCardListHeaderType = 'MY_GAME' | 'ALL_GAME'

type Game = Deck & { type: CardType };
