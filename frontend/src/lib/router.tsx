import { QueryClient } from '@tanstack/react-query'

import Root from '../root'
import ErrorPage from '../ErrorPage'
import Index from 'pages/Index'
import RecommendedTracks from 'src/pages/RecommendedTracks'

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
        path: '/get-recommendations',
        element: <RecommendedTracks />
      }
    ]
  }
]
