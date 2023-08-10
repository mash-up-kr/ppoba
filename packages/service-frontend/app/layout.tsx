import './globals.css'

import DesktopSideContents from './components/common/DesktopSideContents'
import Provider from './provider.client'

export const metadata = {
  title: 'PPOBA App',
  description: 'PPOBA App',
  themeColor: '#F7F7F7',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body className="flex justify-center items-start bg-black xl:gap-x-[107px]">
        <DesktopSideContents />

        <Provider>
          <div className="relative max-w-[420px] w-full min-h-screen bg-light">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  )
}
