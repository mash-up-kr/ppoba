interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return <div className="overflow-hidden relative">{children}</div>
}
