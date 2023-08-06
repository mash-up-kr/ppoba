import './globals.css'

import localFont from 'next/font/local'

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
      <body className="flex justify-center items-start bg-black">
        <Provider>
          <div className="max-w-[420px] w-full min-h-screen bg-light">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  )
}
