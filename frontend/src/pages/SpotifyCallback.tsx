import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useToken } from 'lib/tokenContext'

const SpotifyCallback: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { token, setToken } = useToken()

  useEffect(() => {
    const parsedHash = new URLSearchParams(location.hash.slice(1))
    if (
      parsedHash.get('token_type') != 'Bearer' ||
      !parsedHash.get('access_token') ||
      !parsedHash.get('expires_in')
    ) {
      throw new Response('', { status: 400 })
      return
    }
    const token = parsedHash.get('access_token') as string
    const expiresIn =
      Date.now() + parseInt(parsedHash.get('expires_in') as string) * 1000
    setToken(token, expiresIn)
    navigate('/')
  }, [location.hash, setToken, navigate])

  return (
    <div>
      <h1>Spotify Callback</h1>
      {token}
    </div>
  )
}

export default SpotifyCallback
