'use client'

import { useEffect, useState } from 'react'

import { authTokenRepository } from '@ppoba/api'

function useIsLoggedIn(): boolean {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = authTokenRepository.getToken()

      if (token) {
        setIsLogin(true)
      }
    }
  }, [])

  return isLogin
}

export default useIsLoggedIn
