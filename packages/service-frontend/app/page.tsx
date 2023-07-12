import type { JSX } from 'react'

import LoginHeader from './LoginHeader'

export default function Home(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LoginHeader />
      <div className="pt-[80px] text-black">PPOBA MainPage</div>
    </main>
  )
}
