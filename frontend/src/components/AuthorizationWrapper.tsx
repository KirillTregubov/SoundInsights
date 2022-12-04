import { useToken } from 'lib/tokenContext'
import UserLogin from 'components/UserLogin'
import React from 'react'

interface AuthorizationWrapperProps {
  children: React.ReactNode
}

const AuthorizationWrapper: React.FC<AuthorizationWrapperProps> = ({
  children
}) => {
  const { token } = useToken()

  return (
    <div>
      {token ? (
        children
      ) : (
        <div>
          <h1>Not authorized</h1>
          <p>
            You need to authorize this app to use your Spotify account. Please
            click the button below to authorize.
          </p>
          <UserLogin />
        </div>
      )}
    </div>
  )
}

export default AuthorizationWrapper
