import { Icon } from '@ppoba/ui'

interface Props {
  onClick: () => void
}

export default function AllDeckInitialItem({ onClick }: Props): JSX.Element {
  return (
    <div
      className={`cursor-pointer min-h-[64px] bg-white flex justify-between items-center p-[16px] w-full rounded-[20px] shadow-[4px_4px_20px_0px_rgba(0,0,0,0.1)]`}
      onClick={onClick}
    >
      <div className="p-[4px]">
        <Icon type="deckAdd" width={24} height={24} />
      </div>
      <span className="headline-4 text-grey-800 flex-1 ml-[4px]">
        덱 만들기
      </span>
      <Icon type="arrow" width={24} height={24} className="mr-[8px]" />
    </div>
  )
}
