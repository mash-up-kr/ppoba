import { SSTConfig } from 'sst'
import { NextjsSite } from 'sst/constructs'

export default {
  config(_input) {
    return {
      name: 'ppoba-frontend',
      region: 'ap-northeast-2',
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'site', {
        customDomain: {
          domainName: process.env.DOMAIN_NAME!,
          hostedZone: process.env.AWS_HOST_ZONE!,
        },
        runtime: 'nodejs18.x',
        environment: {
          NEXT_PUBLIC_API_HOST: process.env.DOMAIN_NAME_API!,
          NEXT_PUBLIC_WEB_SENTRY_DSN: process.env.WEB_SENTRY_DSN!,
        },
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
  },
} satisfies SSTConfig
