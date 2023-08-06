import './globals.css'

import localFont from 'next/font/local'
import { Icon } from '@ppoba/ui'

import Provider from './provider.client'

const pretendardFont = localFont({
  src: './font/PretendardVariable.woff2',
  fallback: [
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
  variable: '--font-pretendard',
})

export const metadata = {
  title: 'PPOBA App',
  description: 'PPOBA App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en" className={`${pretendardFont.variable}`}>
      <body className="relative flex justify-center items-start bg-black xl:gap-x-[107px]">
        <div className="hidden xl:block w-[600px] min-h-screen">
          <div className="hidden xl:flex fixed flex-col gap-y-[48px] top-[300px] h-full">
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

        <Provider>
          <div className="relative max-w-[420px] w-full min-h-screen bg-light">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  )
}
