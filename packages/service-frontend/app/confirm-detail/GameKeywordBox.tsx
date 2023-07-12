'use client'

import { TextCheckBox, ToggleButton } from '@ppoba/ui'

interface Props {
  keywords: string[]
  selectedKeywords: string[]
  isAdultGame: boolean
  onClickKeyword: (keyword: string) => void
  onClickAdult: VoidFunction
}

export default function GameKeywordBox({
  keywords,
  selectedKeywords,
  isAdultGame,
  onClickKeyword,
  onClickAdult,
}: Props): JSX.Element {
  return (
    <div className="relative flex flex-col gap-4 px-[16px] top-[-40px]">
      {/* 게임 키워드 */}
      <div className="bg-white flex flex-col gap-[20px] rounded-[24px] p-[30px] shadow-[4px_4px_20px_0px_#0000001A]">
        <div className="headline-3 whitespace-pre text-black">
          {'이 게임의\n키워드를 모두 골라줘!'}
        </div>
        <div className="flex gap-[8px] flex-wrap">
          {keywords.map(keyword => (
            <TextCheckBox
              key={keyword}
              text={keyword}
              selected={selectedKeywords?.includes(keyword)}
              onClick={() => onClickKeyword(keyword)}
            />
          ))}
        </div>
      </div>
      {/* 19+ 컨텐츠 */}
      <div className="bg-white flex justify-between gap-[20px] rounded-[24px] p-[30px] shadow-[4px_4px_20px_0px_#0000001A] headline-3 text-black">
        19+ 컨텐츠 포함이야?
        <ToggleButton value={isAdultGame} onClick={onClickAdult} />
      </div>
    </div>
  )
}
