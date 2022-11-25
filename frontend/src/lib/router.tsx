// import { useLocation } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'

import Root from '../root'
import ErrorPage from '../ErrorPage'
import Index from 'pages/Index'
import RecommendedTracks from 'pages/RecommendedTracks'
import SpotifyCallback from 'pages/SpotifyCallback'
import PlaylistRecommendations from 'pages/PlaylistRecommendations'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: (
      <Root>
        <ErrorPage />
      </Root>
    ),
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: '/callback',
        // loader: async ({ params, request }) => {
        //   console.log(params)
        //   console.log('request', request)
        //   const url = new URL(request.url)
        //   console.log(url.searchParams)
        //   const searchTerm = url.searchParams.get('access_token')
        //   console.log(searchTerm)
        //   const { handleSpotifyCallback } = await import(
        //     'pages/SpotifyCallback'
        //   )
        //   return handleSpotifyCallback()
        // },
        element: <SpotifyCallback />
      },
      {
        path: '/get-recommendations',
        element: <RecommendedTracks />
      },
      {
        path: '/playlist-recommendations',
        element: <PlaylistRecommendations />
      }
    ]
  }
]
