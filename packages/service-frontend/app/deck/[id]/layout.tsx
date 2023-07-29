import { ContentWrapper } from '@/app/components/common'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return <ContentWrapper isFullWidth>{children}</ContentWrapper>
}
