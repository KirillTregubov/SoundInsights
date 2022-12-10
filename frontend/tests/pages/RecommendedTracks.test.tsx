import { render } from '@testing-library/react'

import { Main } from '../helpers'

describe('test RecommendedTracks.tsx', () => {
  test('renders properly', () => {
    const { getByText } = render(<Main route={'/track-recommendations'} />)
    const header = getByText(/Get Music Recommendations/i)
    expect(header).toBeInTheDocument()
  })

  test('renders SpotifySearch component', () => {
    const { getByRole } = render(<Main route="/track-recommendations" />)
    const search = getByRole('textbox', { name: 'Search' })
    expect(search).toBeInTheDocument()
  })
})
