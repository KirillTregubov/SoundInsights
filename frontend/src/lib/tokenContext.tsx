import React, { createContext, useContext, useState } from 'react'

interface TokenContextInterface {
  token: string | null
  setToken: (token: string, expiresIn: number) => void
}

const TokenContext = createContext<TokenContextInterface>(
  {} as TokenContextInterface
)

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  if (
    localStorage.getItem('token_expires_in') === null ||
    parseInt(localStorage.getItem('token_expires_in') as string) < Date.now()
  ) {
    localStorage.removeItem('token')
    localStorage.removeItem('token_expires_in')
  }
  const [token, setStateToken] = useState(localStorage.getItem('token') || null)
  // NOTE: we *might* need to memoize this value
  const setToken = (newToken: string, expiresIn: number) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('token_expires_in', String(expiresIn))
    setStateToken(newToken)
  }
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export const useToken = () => {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider')
  }

  return context
}
