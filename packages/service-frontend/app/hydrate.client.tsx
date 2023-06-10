import type { JSX } from 'react'
import { Hydrate, HydrateProps } from '@tanstack/react-query'

function HydrateClient(props: HydrateProps): JSX.Element {
  return <Hydrate {...props} />
}

export default HydrateClient
