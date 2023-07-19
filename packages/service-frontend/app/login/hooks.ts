import { useCallback } from 'react'
import { api, authTokenRepository } from '@ppoba/api'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function useLogin(
  onSuccess: () => void = () => {
    // TODO: 콜백은 프론트분들께 맡기겠습니다.
    alert('로그인에 성공했습니다!')
  },
  onFailure: (error: any) => void = error => {
    // TODO: 콜백은 프론트분들께 맡기겠습니다.
    alert(`로그인 실패: ${error.name}`)
  },
) {
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
  }, [onSuccess, onFailure])
}

function useLoginRedirection(
  onSuccess: () => void,
  onFailure: (error: any) => void,
) {
  const router = useRouter()
  const code = router.query['code']
  useEffect(() => {
    if (typeof code === 'string') {
      handleLogin(code).then(onSuccess, onFailure)
    }
  }, [code, onSuccess, onFailure])
}

async function handleLogin(code: string) {
  const token = await api.auth.getAuthToken({ code })
  authTokenRepository.setToken(token)
}
