import { QueueListIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { Pie, PieChart } from 'recharts'

import UserLogin from 'components/UserLogin'
import SpotifyWebApi from 'spotify-web-api-js'
// import { useEffect, useState } from 'react'
// import { useLocalStorage } from 'lib/hooks'
// import { useToken } from 'lib/tokenContext'

const Index: React.FC = () => {
  const data01 = [
    {
      name: 'Group A',
      value: 400
    },
    {
      name: 'Group B',
      value: 300
    },
    {
      name: 'Group C',
      value: 300
    },
    {
      name: 'Group D',
      value: 200
    },
    {
      name: 'Group E',
      value: 278
    },
    {
      name: 'Group F',
      value: 189
    }
  ]

  // const spotify = new SpotifyWebApi()
  // const [spotifyToken, setSpotifyToken] = useState('')

  // const { token, setToken } = useToken()

  // const [token, setToken] = useLocalStorage('token')
  // console.log('local storage token', token)

  // useEffect(() => {
  //   const function_a = async () => {
  //     console.log('This is what we derived from the URL: ', getTokenFromUrl())
  //     const _spotifyToken = getTokenFromUrl().access_token
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
    <>
      <div>
        <Link to="/get-recommendations" title="Get Recommendations">
          <div className="flex items-center gap-2 rounded-lg bg-neutral-800 p-3 duration-150 hover:bg-neutral-700 active:scale-[.98] active:will-change-transform">
            <QueueListIcon className="h-10 w-10" />
            <div>
              <h1>Get Song Recommendations</h1>
              <p className="text-neutral-400">
                Select up to 5 Spotify tracks you like and receive 100 song
                recommendations.
              </p>
            </div>
          </div>
        </Link>
        <div className="my-2 rounded-lg border border-neutral-700 p-3">
          <h1 className="font-semibold">Recharts Demo</h1>
          <PieChart width={300} height={250}>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
              animationDuration={350}
            />
          </PieChart>
        </div>
        <UserLogin />
      </div>
    </>
  )
}

export default Index
