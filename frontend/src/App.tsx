import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import RecommendedTracks from 'components/RecommendedTracks'
import UserLogin from 'components/UserLogin'
import { getTokenFromUrl, getPlayLists } from './lib/spotify'
import SpotifyWebApi from 'spotify-web-api-js'
import { useEffect, useState } from 'react'
import { response } from 'msw'
import { stringify } from 'postcss'

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  const spotify = new SpotifyWebApi()
  const [spotifyToken, setSpotifyToken] = useState('')

  useEffect(() => {
    const function_a = async () => {
      console.log('This is what we derived from the URL: ', getTokenFromUrl())
      const _spotifyToken = getTokenFromUrl().access_token
      window.location.hash = ''
      console.log('This is our spotify token ', _spotifyToken)
      if (_spotifyToken) {
        setSpotifyToken(_spotifyToken)
        spotify.setAccessToken(_spotifyToken)
        const playlists = await spotify
          .getUserPlaylists() // note that we don't pass a user id
          .then(
            function (data) {
              const string = JSON.parse(JSON.stringify(data.items))
              return string
            },
            function (err) {
              console.error(err)
            }
          )
        const user_Info = await spotify.getMe()
        const user_Id = user_Info.id
        console.log('The user Id we get is', user_Id)
        console.log('playlists, ', playlists)
        const myAsynFunction = async (playlists): Promise<T> => {
          const value = await playlists 
          return value
        }
      }
    }

    function_a()
  })

  return (
    <QueryClientProvider client={queryClient}>
      <div id="App" className="">
        <nav className="sticky top-0 z-10 -mb-6 flex items-center gap-2 bg-gradient-to-b from-neutral-900 via-neutral-900 p-2 pb-6">
          <img
            className="h-7 w-7 select-none"
            src="/assets/icon.svg"
            alt="Project logo"
          />
          <h1 className="font-semibold">Team Ez2Type</h1>
        </nav>
        <div className="m-6">
          <RecommendedTracks />
          <UserLogin />
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
