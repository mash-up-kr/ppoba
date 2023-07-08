'use client'
import { ContentWrapper, Header } from '@/components'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <ContentWrapper>
      <Header title="로그인" className="justify-end" />
      {children}
    </ContentWrapper>
  )
}
