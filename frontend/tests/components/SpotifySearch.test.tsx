import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

import SpotifySearch from 'components/SpotifySearch'

describe('test SpotifySearch.tsx component', () => {
  test('renders input field', () => {
    const queryClient = new QueryClient()
    const { getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <SpotifySearch />
      </QueryClientProvider>
    )
    const search = getByRole('textbox', { name: 'Search' })
    expect(search).toBeInTheDocument()
  })
})
