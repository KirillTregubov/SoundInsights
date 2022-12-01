import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

import RecommendedTracks from 'components/RecommendedTracks'

describe('test RecommendedTracks.tsx component', () => {
  test('renders properly', () => {
    const queryClient = new QueryClient()
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <RecommendedTracks />
      </QueryClientProvider>
    )
    const header = getByText(/Get Music Recommendations/i)
    expect(header).toBeInTheDocument()
  })

  test('renders SpotifySearch component', () => {
    const queryClient = new QueryClient()
    const { getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <RecommendedTracks />
      </QueryClientProvider>
    )
    const search = getByRole('textbox', { name: 'Search' })
    expect(search).toBeInTheDocument()
  })
})
