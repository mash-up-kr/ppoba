import { ContentWrapper, Header } from '@/components'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <ContentWrapper>
        <Header leftIconType='back' />
        {children}
      </ContentWrapper>
    </>
  )
}
