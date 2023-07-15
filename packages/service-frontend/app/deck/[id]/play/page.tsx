import { Button } from '@ppoba/ui'

import { Header } from '@/components'

import Card from './Card'

export default function DeckPlay(): JSX.Element {
  return (
    <div className="flex flex-col">
      <Header rightIconType="close" />
      {/* 게임 정보 */}
      <div className="flex flex-col gap-[4px] pt-[52px] px-[8px]">
        <strong className="headline-1 text-grey-800">
          뉴 매시업 이미지 게임
        </strong>
        <p className="subtitle-3 text-grey-600">남은 카드 49장</p>
      </div>

      {/* 플레이 카드 */}
      <Card type="duck" variant="point" className="mt-[50px] mx-auto" />

      {/* 버튼 */}
      <div className="flex gap-[10px] mt-[62px]">
        <Button size="small" rightIcon="shuffle">
          섞기
        </Button>
        <Button size="large">다음 카드 보기</Button>
      </div>
    </div>
  )
}
