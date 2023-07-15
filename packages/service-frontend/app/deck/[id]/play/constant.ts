import { IconType } from '@ppoba/ui/dist/src/components/Icon'

import type { CardType } from './Card'

export const CardIcon: Record<
  CardType,
  Record<'mainIcon' | 'colorSideIcon' | 'normalSideIcon', IconType>
> = {
  flower: {
    normalSideIcon: 'flowerNormal',
    colorSideIcon: 'flowerDot',
    mainIcon: 'flowerColor',
  },
  swallow: {
    normalSideIcon: 'swallowNormal',
    colorSideIcon: 'swallowDot',
    mainIcon: 'swallowColor',
  },
  sprout: {
    normalSideIcon: 'sproutNormal',
    colorSideIcon: 'sproutDot',
    mainIcon: 'sproutColor',
  },
  feather: {
    normalSideIcon: 'featherNormal',
    colorSideIcon: 'featherDot',
    mainIcon: 'featherColor',
  },
  plug: {
    normalSideIcon: 'plugNormal',
    colorSideIcon: 'plugDot',
    mainIcon: 'plugColor',
  },
  nail: {
    normalSideIcon: 'nailNormal',
    colorSideIcon: 'nailDot',
    mainIcon: 'nailColor',
  },
  clover: {
    normalSideIcon: 'cloverNormal',
    colorSideIcon: 'cloverDot',
    mainIcon: 'cloverColor',
  },
  turnip: {
    normalSideIcon: 'turnipNormal',
    colorSideIcon: 'turnipDot',
    mainIcon: 'turnipColor',
  },
}

export const CardStyle: Record<
  CardType,
  Record<'color' | 'background', string>
> = {
  nail: {
    background: 'bg-purple-02',
    color: 'text-purple-02',
  },
  sprout: {
    background: 'bg-teal-02',
    color: 'text-teal-02',
  },
  feather: {
    background: 'bg-yellow-02',
    color: 'text-yellow-02',
  },
  turnip: {
    background: 'bg-orange-02',
    color: 'text-orange-02',
  },
  swallow: {
    background: 'bg-blue-02',
    color: 'text-blue-02',
  },
  clover: {
    background: 'bg-green-02',
    color: 'text-green-02',
  },
  flower: {
    background: 'bg-pink-02',
    color: 'text-pink-02',
  },
  plug: {
    background: 'bg-red-02',
    color: 'text-red-02',
  },
}
