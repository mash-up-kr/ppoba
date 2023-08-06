import { memo } from 'react'

import { Variants, motion } from 'framer-motion'
import { Icon } from '@ppoba/ui'

import { CardType } from '../../play/Card'
import { CardIcon, CardStyle } from '../../play/constant'

function NormalCardBack({
  indexString,
  isFlipped,
  visibleVariants,
  cardSize,
  type,
  content,
}: {
  indexString: string
  isFlipped: boolean
  visibleVariants: Variants
  cardSize: string
  type: CardType
  content: string
}): JSX.Element {
  const cardSideIcon = CardIcon[type].normalSideIcon
  const bgColor = CardStyle[type].background

  return (
    <motion.div
      key={'back'}
      layout
      initial={'hidden'}
      animate={isFlipped ? 'visible' : 'hidden'}
      variants={visibleVariants}
      className={`absolute top-0 left-0 rounded-[24px] flex justify-center items-center ${cardSize} ${bgColor}`}
    >
      <motion.div
        initial={'hidden'}
        animate={isFlipped ? 'visible' : 'hidden'}
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
        <div className="flex justify-end items-end w-full">
          <div className="flex flex-col justify-center">
            <Icon type={cardSideIcon} width={23} height={23} />
            <span className={`headline-4 text-grey-700 text-center`}>
              {indexString}
            </span>
          </div>
        </div>

        <div className="flex justify-start items-end w-full">
          <div className="flex flex-col justify-center rotate-[180deg]">
            <Icon type={cardSideIcon} width={23} height={23} />
            <span className={`headline-4 text-grey-700 text-center`}>
              {indexString}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        key={'main-icon'}
        className="absolute w-full h-full flex justify-center items-center"
        initial={'hidden'}
        animate={isFlipped ? 'visible' : 'hidden'}
        variants={{
          visible: {
            scaleX: 1,
            transition: {
              type: 'spring',
              duration: 0.35,
              bounce: 0.3,
            },
          },
          hidden: {
            scaleX: 0.6,
          },
        }}
      >
        <p className="headline-2 text-black px-[41px] text-center">{content}</p>
      </motion.div>
    </motion.div>
  )
}

export default memo(NormalCardBack)
