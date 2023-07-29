import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

type urlMatcher = {
  [key: string]: {
    prevUrl: string
  }
}

const URL_MATCHER: urlMatcher = {
  '/create-deck': {
    prevUrl: '/create-title',
  },
  '/confirm-detail': {
    prevUrl: '/create-deck',
  },
  '/complete': {
    prevUrl: '/confirm-detail',
  }
}

export function middleware(request: NextRequest): NextResponse {
  const prevUrl = request.headers.get('referer') ? new URL(request.headers.get('referer') || '').pathname : '';
  const nextUrl = request.nextUrl.pathname;
  if (URL_MATCHER[nextUrl] !== undefined && prevUrl !== URL_MATCHER[nextUrl].prevUrl) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}
