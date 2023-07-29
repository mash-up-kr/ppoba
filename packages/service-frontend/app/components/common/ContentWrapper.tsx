export default function LayoutWrapper({
  isFullWidth = false,
  children,
}: {
  isFullWidth?: boolean
  children: React.ReactNode
}): JSX.Element {
  return <div className={isFullWidth ? '' : 'px-[24px]'}>{children}</div>
}
