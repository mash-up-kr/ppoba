import { ContentWrapper } from '@/app/components'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return <ContentWrapper>{children}</ContentWrapper>
}
