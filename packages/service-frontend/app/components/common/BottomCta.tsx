interface Props {
  children: React.ReactNode
  className?: string
}

export default function BottomCta({
  children,
  className = '',
}: Props): JSX.Element {
  return (
    <div className={`fixed max-w-[420px] bottom-0 w-full ${className}`}>
      {children}
    </div>
  )
}
