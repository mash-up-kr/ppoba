'use client'
import { ContentWrapper, Header } from '@/components'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <ContentWrapper>
      <Header
        title="뉴 매시업 이미지 게임"
        className="bg-[#FFA63F]"
        leftIconType="back"
        rightIconType="share"
        onClickLeftIcon={() => console.log('left')}
        onClickRightIcon={() => console.log('right')}
      />
      {children}
    </ContentWrapper>
  )
}
