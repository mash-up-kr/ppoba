import { Hydrate, HydrateProps } from '@tanstack/react-query'
import React from 'react'

function HydrateClient(props: HydrateProps): React.JSX.Element {
  return <Hydrate {...props} />
}

export default HydrateClient
