import ContentWrapper from '@/app/components/common/ContentWrapper'

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
