import { ContentWrapper } from '@/components'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return <>{children}</>
}
