import { useCallback, useEffect } from 'react'

import { useSearchParams, redirect } from 'next/navigation'
import { api, authTokenRepository } from '@ppoba/api'

export function useLogin(
  onSuccess: () => void = () => {
    redirect('/')
  },
  onFailure: (error: any) => void = error => {
    redirect('/404')
  },
): { handleLoginClick: () => Promise<void> } {
  useLoginToken()
  useLoginRedirection(onSuccess, onFailure)
  const handleLoginClick = useLoginButton(onSuccess, onFailure)

  return { handleLoginClick }
}

function useLoginButton(
  onSuccess: () => void,
  onFailure: (error: any) => void,
) {
  return useCallback(async () => {
    // 이미 토큰이 있는 경우
    if (authTokenRepository.getToken()) {
      try {
        await api.auth.verify()
        return onSuccess()
      } catch (error) {
        authTokenRepository.clear()
        return onFailure(error)
      }
    }

    const { loginUrl } = await api.auth.getLoginUrl()
    location.href = loginUrl
    // 이동했다가 돌아올 때
    // https://HOST/login?code=qweoiqeu1209283
  }, [onSuccess, onFailure])
}

function useLoginRedirection(
  onSuccess: () => void,
  onFailure: (error: any) => void,
) {
  const searchParams = useSearchParams()
  const code = searchParams?.get('code') ?? ''
  useEffect(() => {
    if (typeof code === 'string' && code !== '') {
      handleLogin(code).then(onSuccess, onFailure)
    }
  }, [code, onSuccess, onFailure])
}

function useLoginToken() {
  useEffect(() => {
    authTokenRepository.load()
  }, [])
}

async function handleLogin(code: string) {
  const { token } = await api.auth.getAuthToken({ code })
  authTokenRepository.setToken(token)
}
