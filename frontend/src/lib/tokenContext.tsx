import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'

const TokenContext = createContext()

export const TokenProvider = ({ children }) => {
  if (parseInt(localStorage.getItem('token_expires_in')) < Date.now()) {
    localStorage.removeItem('token')
    localStorage.removeItem('token_expires_in')
  }
  const [token, setStateToken] = useState(localStorage.getItem('token') || null)
  // NOTE: we *might* need to memoize this value
  const setToken = (newToken, expiresIn) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('token_expires_in', expiresIn)
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
