import { render } from '@testing-library/react'

import App from 'src/App'

describe('test App.tsx', () => {
  test('contains header', () => {
    const { getByText } = render(<App />)
    const header = getByText(/Team Ez2Type/i)
    expect(header).toBeInTheDocument()
  })

  test('contains RecommendedTracks component', () => {
    const { getByText } = render(<App />)
    const header = getByText(/Get Music Recommendations/i)
    expect(header).toBeInTheDocument()
  })
})
