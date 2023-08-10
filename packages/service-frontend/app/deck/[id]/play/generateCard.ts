import { Card } from '@ppoba/types';

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

export type PlayCard = {
  id: string;
  number: number;
  type: CardType;
  text: string;
}

export const generateCards = (
  data: Card[],
): PlayCard[] => {
  return data.map((v, i) => ({
    id: v.id,
    number: i + 1,
    type: cardTypes[i % cardTypes.length],
    text: v.content,
  }))
}
