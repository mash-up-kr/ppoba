'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { authTokenRepository } from '@ppoba/api'
import { Icon } from '@ppoba/ui'

import useIsLoggedIn from '@/hooks/useIsLoggedIn'

interface Props {
  onClickCreateDeck: () => void
}

function LoginHeader({ onClickCreateDeck }: Props): JSX.Element {
  const router = useRouter();
  const { scrollY } = useScroll()
  const isLoggedIn = useIsLoggedIn();

  const y = useTransform(scrollY, [0, 100], [-2, 0])
  const opacity = useTransform(scrollY, [0, 100], [0, 1])

  const handleClick = () => {
    if (isLoggedIn) {
      authTokenRepository.clear()
      router.push('/', { forceOptimisticNavigation: true })
    } else {
      router.push('/login')
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full max-w-[420px] h-[52px] flex justify-between items-center pl-[24px] pr-[16px] bg-light`}
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
            onClick={handleClick}
          >
            {isLoggedIn ? "로그아웃" : "로그인"}
          </strong>
        </div>
      </header>

      {/* Spacing Div */}
      <div className="w-full max-w-[420px] h-[52px] bg-light" />
    </>
  )
}

export default LoginHeader
