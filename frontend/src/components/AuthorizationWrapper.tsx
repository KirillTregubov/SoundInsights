import { useToken } from 'lib/tokenContext'
import UserLogin from 'components/UserLogin'

const AuthorizationWrapper: React.FC = ({ children }) => {
  const { token, _ } = useToken()

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
