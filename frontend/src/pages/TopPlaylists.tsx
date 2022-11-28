import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import fetch from 'cross-fetch'

// import SpotifyWebApi from 'spotify-web-api-js'
import AuthorizationWrapper from 'components/AuthorizationWrapper'
import { useToken } from 'lib/tokenContext'
import { getTopPlaylists } from 'lib/api'

const TopPlaylists: React.FC = () => {
  // const spotify = new SpotifyWebApi()
  const [spotifyToken, setSpotifyToken] = useState('')

  const { token, _ } = useToken()

  const query = useQuery(['top-playlists'], async () => getTopPlaylists(), {
    enabled: !!token
  })
  const { data, isLoading } = query

  // useEffect(() => {
  //   const function_a = async () => {
  //     const _spotifyToken = token
  //     window.location.hash = ''
  //     console.log('This is our spotify token ', _spotifyToken)
  //     if (_spotifyToken) {
  //       setSpotifyToken(_spotifyToken)
  //       spotify.setAccessToken(_spotifyToken)
  //       const playlists = await spotify
  //         .getUserPlaylists() // note that we don't pass a user id
  //         .then(
  //           function (data) {
  //             const string = JSON.parse(JSON.stringify(data.items))
  //             return string
  //           },
  //           function (err) {
  //             console.error(err)
  //           }
  //         )
  //       const user_Info = await spotify.getMe()
  //       const user_Id = user_Info.id
  //       console.log('The user Id we get is', user_Id)
  //       console.log('playlists, ', playlists)
  //       const myAsynFunction = async (playlists): Promise<T> => {
  //         const value = await playlists
  //         return value
  //       }
  //     }
  //   }

  //   function_a()
  // })

  return (
    <div>
      <h1>Top Playlist Analysis</h1>
      <div>
        Data: <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}

export default TopPlaylists
