// import { useLocation } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'

import Root from '../root'
import ErrorPage from '../ErrorPage'
import Index from 'pages/Index'
import RecommendedTracks from 'pages/RecommendedTracks'
import SpotifyCallback from 'pages/SpotifyCallback'
import PlaylistRecommendations from 'pages/PlaylistRecommendations'
import PlaylistAnalysis from 'pages/PlaylistAnalysis'
import Layout from 'pages/Layout'
import AnalysisPage from 'pages/AnalysisPage'

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
        <Layout>
          <ErrorPage />
        </Layout>
      </Root>
    ),
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: '/callback',
        element: <SpotifyCallback />
      },
      {
        path: '/track-recommendations',
        element: (
          <Layout>
            <RecommendedTracks />
          </Layout>
        )
      },
      {
        path: '/playlist-recommendations',
        element: (
          <Layout>
            <PlaylistRecommendations />
          </Layout>
        )
      },
      {
        path: '/playlist-analysis',
        element: (
          <Layout>
            <PlaylistAnalysis />
          </Layout>
        )
      },
      {
        path: '/playlist-analysis/:id',
        element: (
          <Layout>
            <AnalysisPage />
          </Layout>
        )
      }
    ]
  }
]
