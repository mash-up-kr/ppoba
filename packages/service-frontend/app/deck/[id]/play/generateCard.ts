import type { CardType } from './Card'

export const cardTypes: CardType[] = [
  'flower',
  'feather',
  'sprout',
  'turnip',
  'plug',
  'nail',
  'swallow',
  'clover',
]

export const generateCards = (
  size: number,
): { id: string; number: number; type: CardType; text: string }[] => {
  return [...Array(size)].map((_, i) => ({
    id: Math.random().toString() + Math.random().toString(),
    number: i + 1,
    type: cardTypes[i % cardTypes.length],
    text: '김가나다라마바사아자 김가나다라마바사아자 김가나다라마바사아자 김가나다라마바사아자 김가나다라마바사아자',
  }))
}
