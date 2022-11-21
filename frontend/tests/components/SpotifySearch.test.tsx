import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

import { queryClient } from 'lib/router'
import SpotifySearch from 'components/SpotifySearch'

describe('test SpotifySearch.tsx component', () => {
  test('renders input field', () => {
    const { getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <SpotifySearch />
      </QueryClientProvider>
    )
    const search = getByRole('textbox', { name: 'Search' })
    expect(search).toBeInTheDocument()
  })
})
