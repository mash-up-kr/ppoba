import { Icon } from '@ppoba/ui'

interface Props {
  onClick: () => void
}

export default function AllDeckLastItem({ onClick }: Props): JSX.Element {
  return (
    <div
      className={`border-2 border-grey-200 border-dashed cursor-pointer min-h-[162px] bg-white flex flex-col p-[24px] w-full rounded-[24px] shadow-[inset_0px_0px_24px_0px_rgba(0,0,0,0.12)]`}
      onClick={onClick}
    >
      {/* 게임 상단 */}
      <div className="flex justify-between items-start w-full">
        <div className="flex items-center justify-between">
          <Icon type="cardcount" width={16} height={16} />
          <div className="justify-center items-center flex ml-[2px]">
            <span className="text-grey-800 caption-bold">?</span>
          </div>
        </div>
        <Icon type="deckAdd" width={24} height={24} />
      </div>

      <p className="headline-3 mt-[26px] text-grey-800">
        새로운 게임을 만들어볼까?
      </p>
    </div>
  )
}
