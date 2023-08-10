'use client'

import { Icon } from '@ppoba/ui'

export default function DesktopSideContents(): JSX.Element {
  return (
    <div className="hidden xl:block w-[600px] min-h-screen h-auto">
      <div className="hidden xl:flex fixed flex-col gap-y-[48px] xl:top-1/2 xl:-translate-y-1/2 h-auto">
        <Icon type="logoBlack" height={200} width={600} />
        <p className="headline-1 text-white">
          뽀바,
          <br />
          너만의 카드게임을 즐겨봐
        </p>
        <div className="flex gap-x-[8px] items-center justify-start headline-3">
          <div className="text-red-02 py-[10px] px-[16px] rounded-[16px] bg-[rgba(255,161,173,0.29)]">
            #이미지_게임
          </div>
          <div className="text-blue-02 py-[10px] px-[16px] rounded-[16px] bg-[rgba(159,169,255,0.20)]">
            #밸런스_게임
          </div>
          <div className="text-teal-02 py-[10px] px-[16px] rounded-[16px] bg-[rgba(129,228,187,0.20)]">
            #모든_게임
          </div>
        </div>
        <footer className="text-grey-300 subtitle-3 mt-[112px]">
          PPOBA 2023 ⓒ team anytype
        </footer>
      </div>
    </div>
  )
}
