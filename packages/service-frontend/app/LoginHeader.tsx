'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Icon } from '@ppoba/ui'

interface Props {
  onClickCreateDeck: () => void
}

function LoginHeader({ onClickCreateDeck }: Props): JSX.Element {
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 100], [-2, 0])
  const opacity = useTransform(scrollY, [0, 100], [0, 1])

  return (
    <>
      <header
        className={`fixed w-full max-w-[420px] h-[52px] left-1/2 -translate-x-1/2 flex justify-between items-center pl-[24px] pr-[16px] bg-light`}
      >
        <motion.div style={{ opacity, y }} className="flex">
          <Icon type="symbol" width={48} height={48} />
        </motion.div>

        <div className="flex justify-between items-center gap-x-[8px]">
          <motion.div
            style={{ opacity, y }}
            className="h-full cursor-pointer"
            onClick={onClickCreateDeck}
          >
            <div className="py-[8px] pl-[10px] pr-[6px] rounded-[12px] border border-grey-100 flex justify-between items-center gap-x-[2px] bg-white">
              <span className="headline-5 text-grey-800">덱 만들기</span>
              <Icon type="deckAdd" height={20} width={20} />
            </div>
          </motion.div>
          <strong
            className="headline-5 text-black cursor px-[10px] py-[6px]"
            role="button"
            onClick={() => console.log('login')}
          >
            로그인
          </strong>
        </div>
      </header>

      {/* Spacing Div */}
      <div className="w-full max-w-[420px] h-[52px]" />
    </>
  )
}

export default LoginHeader
