interface Props {
  title: string
  length: number
}

function GameTitle({ title, length }: Props): JSX.Element {
  return (
    <div className="flex flex-col gap-[3px] pt-[52px] px-[8px] text-center">
      <h1 className="headline-2 text-black">{title}</h1>
      <div className="flex mx-auto gap-[4px]">
        <span className="subtitle-3 text-grey-600">카드</span>
        <strong className="headline-5 text-grey-600">{length}장</strong>
        <span className="subtitle-3 text-grey-600">남았어!</span>
      </div>
    </div>
  )
}

export default GameTitle
