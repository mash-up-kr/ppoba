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
    colorSideIcon: 'flowerDot',
    mainIcon: 'swallowColor',
  },
  sprout: {
    normalSideIcon: 'sproutNormal',
    colorSideIcon: 'flowerDot',
    mainIcon: 'sproutColor',
  },
  feather: {
    normalSideIcon: 'featherNormal',
    colorSideIcon: 'flowerDot',
    mainIcon: 'featherColor',
  },
  plug: {
    normalSideIcon: 'plugNormal',
    colorSideIcon: 'flowerDot',
    mainIcon: 'plugColor',
  },
  nail: {
    normalSideIcon: 'nailNormal',
    colorSideIcon: 'flowerDot',
    mainIcon: 'nailColor',
  },
  clover: {
    normalSideIcon: 'cloverNormal',
    colorSideIcon: 'flowerDot',
    mainIcon: 'cloverColor',
  },
  turnip: {
    normalSideIcon: 'turnipNormal',
    colorSideIcon: 'flowerDot',
    mainIcon: 'turnipColor',
  },
}
