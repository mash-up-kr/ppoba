import type { JSX } from 'react'

function EmptyCard(): JSX.Element {
  return (
    <div
      className={`flex items-center justify-center w-full h-full shrink-0 rounded-[24px] bg-white border-[5px] border-grey-200 border-dashed text-grey-800 headline-3 text-center whitespace-pre shadow-[inset_0px_0px_24px_rgba(0,0,0,0.3)]`}
    >
      {`남은 카드가 없어\n다른 게임하러 갈래?`}
    </div>
  )
}

export default EmptyCard
