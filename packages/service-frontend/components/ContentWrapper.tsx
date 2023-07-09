export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return <div className="px-[24px]">{children}</div>
}
