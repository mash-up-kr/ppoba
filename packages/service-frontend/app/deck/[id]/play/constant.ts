import type { IconType } from '@ppoba/ui/dist/src/components/Icon'

import type { CardType, CardVariantType } from './Card'

export const CardStyle: Record<CardType, Record<CardVariantType, string>> = {
  flower: {
    normal: 'bg-pink-02',
    dark: 'bg-grey-800',
    point: 'bg-pink-02',
  },
  leaf: {
    normal: 'bg-blue-02',
    dark: 'bg-grey-800',
    point: 'bg-blue-02',
  },
  sprout: {
    normal: 'bg-teal-02',
    dark: 'bg-grey-800',
    point: 'bg-teal-02',
  },
  duck: {
    normal: 'bg-yellow-02',
    dark: 'bg-grey-800',
    point: 'bg-yellow-02',
  },
  plug: {
    normal: 'bg-orange-02',
    dark: 'bg-grey-800',
    point: 'bg-orange-02',
  },
  nail: {
    normal: 'bg-purple-02',
    dark: 'bg-grey-800',
    point: 'bg-purple-02',
  },
  bird: {
    normal: 'bg-red-02',
    dark: 'bg-grey-800',
    point: 'bg-red-02',
  },
  clover: {
    normal: 'bg-green-02',
    dark: 'bg-grey-800',
    point: 'bg-green-02',
  },
} as const

export const CardIcon: Record<
  CardType,
  Record<
    CardVariantType,
    Record<'rightUp' | 'leftDown' | 'icon' | 'sideIcon', IconType>
  >
> = {
  flower: {
    normal: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'flowerNormal',
      sideIcon: 'flowerDot',
    },
    dark: {
      rightUp: 'leftDownPink',
      leftDown: 'rightUpPink',
      icon: 'flowerColor',
      sideIcon: 'flowerDotColor',
    },
    point: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'flowerPoint',
      sideIcon: 'flowerDot',
    },
  },
  leaf: {
    normal: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'leafNormal',
      sideIcon: 'leafDot',
    },
    dark: {
      rightUp: 'leftDownBlue',
      leftDown: 'rightUpBlue',
      icon: 'leafColor',
      sideIcon: 'leafDotColor',
    },
    point: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'leafPoint',
      sideIcon: 'leafDot',
    },
  },
  sprout: {
    normal: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'sproutNormal',
      sideIcon: 'sproutDot',
    },
    dark: {
      rightUp: 'leftDownTeal',
      leftDown: 'rightUpTeal',
      icon: 'sproutColor',
      sideIcon: 'sproutDotColor',
    },
    point: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'sproutPoint',
      sideIcon: 'sproutDot',
    },
  },
  duck: {
    normal: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'duckNormal',
      sideIcon: 'duckDot',
    },
    dark: {
      rightUp: 'leftDownYellow',
      leftDown: 'rightUpYellow',
      icon: 'duckColor',
      sideIcon: 'duckDotColor',
    },
    point: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'duckPoint',
      sideIcon: 'duckDot',
    },
  },
  plug: {
    normal: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'plugNormal',
      sideIcon: 'plugDot',
    },
    dark: {
      rightUp: 'leftDownOrange',
      leftDown: 'rightUpOrange',
      icon: 'plugColor',
      sideIcon: 'plugDotColor',
    },
    point: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'plugPoint',
      sideIcon: 'plugDot',
    },
  },
  nail: {
    normal: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'nailNormal',
      sideIcon: 'nailDot',
    },
    dark: {
      rightUp: 'leftDownPurple',
      leftDown: 'rightUpPurple',
      icon: 'nailColor',
      sideIcon: 'nailDotColor',
    },
    point: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'nailPoint',
      sideIcon: 'nailDot',
    },
  },
  bird: {
    normal: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'birdNormal',
      sideIcon: 'birdDot',
    },
    dark: {
      rightUp: 'leftDownRed',
      leftDown: 'rightUpRed',
      icon: 'birdColor',
      sideIcon: 'birdDotColor',
    },
    point: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'birdPoint',
      sideIcon: 'birdDot',
    },
  },
  clover: {
    normal: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'cloverNormal',
      sideIcon: 'cloverDot',
    },
    dark: {
      rightUp: 'leftDownGreen',
      leftDown: 'rightUpGreen',
      icon: 'cloverColor',
      sideIcon: 'cloverDotColor',
    },
    point: {
      rightUp: 'leftDown',
      leftDown: 'rightUp',
      icon: 'cloverPoint',
      sideIcon: 'cloverDot',
    },
  },
} as const
