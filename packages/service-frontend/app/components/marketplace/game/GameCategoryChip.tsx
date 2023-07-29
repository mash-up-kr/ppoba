interface Props {
  label: string
  bgColor?: string
  textColor?: string
}

export default function GameCategoryChip({
  label,
  bgColor = 'bg-white bg-opacity-[0.15]',
  textColor = 'text-[rgba(36,_36,_36,_0.8)]',
}: Props): JSX.Element {
  return (
    <div
      className={`inline-block px-[8px] py-[2px] headline-5 rounded-[10px] ${bgColor} ${textColor}`}
    >
      <span>{label}</span>
    </div>
  )
}
