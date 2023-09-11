import React from 'react'

function GameLayout({ children }: React.PropsWithChildren): JSX.Element {
  return (
    <main className="min-h-screen">
      <div className="relative w-full flex flex-col gap-[63px] justify-center items-center">
        {children}
      </div>
    </main>
  )
}

export default GameLayout
