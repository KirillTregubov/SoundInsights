import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useToken } from 'lib/tokenContext'

const SpotifyCallback: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { token, setToken } = useToken()

  useEffect(() => {
    const parsedHash = new URLSearchParams(location.hash.slice(1))
    // console.log(parsedHash.get('access_token'))
    console.log(parsedHash.toString())
    if (parsedHash.get('token_type') != 'Bearer') {
      throw new Response('Not Found', { status: 404 })
    }
    setToken(
      parsedHash.get('access_token'),
      Date.now() + parsedHash.get('expires_in') * 1000
    )
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
// export { handleSpotifyCallback }
