import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import SpotifyWebApi from 'spotify-web-api-js'
import { useToken } from 'lib/tokenContext'
import { never } from 'zod'
import { responses } from 'tests/setup'

const PlaylistRecommendations: React.FC = () => {
  const spotify = new SpotifyWebApi()
  const [spotifyToken, setSpotifyToken] = useState('')

  const { token, _ } = useToken()

  const query = useQuery(
    ['playlist-recommendations'],
    async () => {
      var access_token = "Bearer " + token;
      // console.log('token is ', access_token)
      // var user_id_url = "https://api.spotify.com/v1/me";
      // const user_id_res = fetch(user_id_url, {
      //   method: 'GET',
      //   headers: {"Authorization": access_token }
      // }).then(
      //   response => {
      //     console.log(response)
      //     return response.json()
      //   }
      // )

      // const user_id = await(user_id_res)
      // console.log(user_id)

      // window.location.hash = ''
      spotify.setAccessToken(token)
      // const data = await spotify.getMe()
      const playlists = await spotify.getUserPlaylists()
      var playlists_info = []

      for (const item in playlists.items){
        const playlist_url = playlists.items[item].href
        const playlist_res = fetch(playlist_url, {
          method: 'GET',
          headers: {"Authorization": access_token }
        }).then(
          response => {
            return response.json()
          }
        )
        var playlist_obj = {
          'name': '',
          'tracks': ([] as any),
        }
        const playlist = await(playlist_res)
        console.log(playlist)
        playlist_obj['name'] = playlist.name
        var tracks = []
        for (const item in playlist.tracks.items) {
          tracks.push(playlist.tracks.items[item].track.uri)
        }

        // const audio_features_res = fetch('http://localhost:5050/audio-features', {
        //   method: "POST",
        //   headers : {
        //     'Content-Type': 'application/json'
        //   },
        //   body : JSON.stringify({
        //     data: ['2up3OPMp9Tb4dAKM2erWXQ']
        //   })
        // })
        // const audio_features = await(audio_features_res)
        // console.log(audio_features)


        playlist_obj['tracks'] = tracks
        playlists_info.push(playlist_obj)
      }
      console.log(playlists_info)
      return playlists
    },
    {
      enabled: !!token
    }
  )
  const { data, isLoading } = query
  // console.log(data)

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
      <h1>Playlist Recommendations</h1>
      <div>isLoading? {JSON.stringify(isLoading)}</div>
      <div>
        Data: <pre>{JSON.stringify(data)}</pre>
      </div>
    </div>
  )
}

export default PlaylistRecommendations