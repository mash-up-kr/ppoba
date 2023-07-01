import ContentWrapper from '@/components/ContentWrapper'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <ContentWrapper>{children}</ContentWrapper>
    </>
  )
}
