import { memo } from 'react'

import { Variants, motion } from 'framer-motion'
import { Icon } from '@ppoba/ui'

import { CardType } from '../../play/Card'
import { CardIcon, CardStyle } from '../../play/constant'

function TaroCardFront({
  indexString,
  isFlipped,
  visibleVariants,
  type,
}: {
  indexString: string
  isFlipped: boolean
  visibleVariants: Variants
  type: CardType
}): JSX.Element {
  const textColor = CardStyle[type].color
  const cardMainIcon = CardIcon[type].mainIcon
  const cardSideIcon = CardIcon[type].colorSideIcon

  return (
    <motion.div
      key={'front'}
      layout
      initial={'visible'}
      animate={isFlipped ? 'hidden' : 'visible'}
      variants={visibleVariants}
      className={`absolute w-full h-full top-0 bg-grey-700 left-0 rounded-[24px] flex justify-center items-center `}
    >
      <motion.div
        key="front-side-icon"
        initial={'visible'}
        animate={isFlipped ? 'hidden' : 'visible'}
        variants={{
          visible: {
            scale: 1,
            transition: {
              type: 'spring',
              duration: 0.35,
              bounce: 0.3,
            },
          },
          hidden: {
            scale: 0,
            transition: {
              type: 'spring',
              duration: 0.35,
              bounce: 0.3,
            },
          },
        }}
        className="w-full h-full flex flex-col justify-between relative rounded-[24px] p-[16px]"
      >
        <div className="flex justify-start items-start w-full">
          <div className="flex flex-col justify-center">
            <Icon type={cardSideIcon} width={32} height={32} />
            <span className={`headline-4 ${textColor} text-center`}>
              {indexString}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-end items-end w-full">
          <div className="flex flex-col justify-center rotate-[180deg]">
            <Icon type={cardSideIcon} width={32} height={32} />
            <span className={`headline-4 ${textColor} text-center`}>
              {indexString}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        key={'main-icon'}
        className="absolute w-full h-full flex justify-center items-center"
        initial={'visible'}
        animate={isFlipped ? 'hidden' : 'visible'}
        variants={{
          visible: {
            y: 0,
            scale: 1,
            transition: {
              type: 'spring',
              duration: 0.35,
              bounce: 0.3,
            },
          },
          hidden: {
            y: -100,
            scale: 0.4,
          },
        }}
      >
        <Icon type={cardMainIcon} width={200} height={200} />
      </motion.div>
    </motion.div>
  )
}

export default memo(TaroCardFront)
