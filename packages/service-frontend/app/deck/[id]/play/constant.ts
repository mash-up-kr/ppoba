import { IconType } from '@ppoba/ui/dist/src/components/Icon'

import type { CardType } from './Card'

export const CardIcon: Record<
  CardType,
  Record<
    'mainIcon' | 'colorSideIcon' | 'normalSideIcon' | 'greyDotIcon',
    IconType
  >
> = {
  flower: {
    normalSideIcon: 'flowerNormal',
    colorSideIcon: 'flowerDot',
    mainIcon: 'flowerColor',
    greyDotIcon: 'flowerDotGrey',
  },
  swallow: {
    normalSideIcon: 'swallowNormal',
    colorSideIcon: 'swallowDot',
    mainIcon: 'swallowColor',
    greyDotIcon: 'swallowDotGrey',
  },
  sprout: {
    normalSideIcon: 'sproutNormal',
    colorSideIcon: 'sproutDot',
    mainIcon: 'sproutColor',
    greyDotIcon: 'sproutDotGrey',
  },
  feather: {
    normalSideIcon: 'featherNormal',
    colorSideIcon: 'featherDot',
    mainIcon: 'featherColor',
    greyDotIcon: 'featherDotGrey',
  },
  plug: {
    normalSideIcon: 'plugNormal',
    colorSideIcon: 'plugDot',
    mainIcon: 'plugColor',
    greyDotIcon: 'plugDotGrey',
  },
  nail: {
    normalSideIcon: 'nailNormal',
    colorSideIcon: 'nailDot',
    mainIcon: 'nailColor',
    greyDotIcon: 'nailDotGrey',
  },
  clover: {
    normalSideIcon: 'cloverNormal',
    colorSideIcon: 'cloverDot',
    mainIcon: 'cloverColor',
    greyDotIcon: 'cloverDotGrey',
  },
  turnip: {
    normalSideIcon: 'turnipNormal',
    colorSideIcon: 'turnipDot',
    mainIcon: 'turnipColor',
    greyDotIcon: 'turnipDotGrey',
  },
}

export const CardStyle: Record<
  CardType,
  Record<'color' | 'background' | 'rawHex', string>
> = {
  nail: {
    background: 'bg-purple-02',
    color: 'text-purple-02',
    rawHex: '#B073FF',
  },
  sprout: {
    background: 'bg-teal-02',
    color: 'text-teal-02',
    rawHex: '#81E4BB',
  },
  feather: {
    background: 'bg-yellow-02',
    color: 'text-yellow-02',
    rawHex: '#FEDB61',
  },
  turnip: {
    background: 'bg-orange-02',
    color: 'text-orange-02',
    rawHex: '#FFA63F',
  },
  swallow: {
    background: 'bg-blue-02',
    color: 'text-blue-02',
    rawHex: '#9FA9FF',
  },
  clover: {
    background: 'bg-green-02',
    color: 'text-green-02',
    rawHex: '#81E4BB',
  },
  flower: {
    background: 'bg-pink-02',
    color: 'text-pink-02',
    rawHex: '#F4B9F4',
  },
  plug: {
    background: 'bg-red-02',
    color: 'text-red-02',
    rawHex: '#FD7B8A',
  },
}
