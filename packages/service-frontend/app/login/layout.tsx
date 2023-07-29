import { ContentWrapper } from '../components/common'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return <ContentWrapper>{children}</ContentWrapper>
}
