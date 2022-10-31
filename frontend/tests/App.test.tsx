import { render } from '@testing-library/react'

import App from 'src/App'

describe('test App.tsx', () => {
  test('contains RecommendedTracks component', () => {
    const { getByText } = render(<App />)
    const header = getByText(/Team Ez2Type/i)
    expect(header).toBeInTheDocument()
  })
  // test('contains QueryInput component', () => {
  //   const { getByRole } = render(<App />)
  //   const button = getByRole('button', { name: 'Search' })
  //   expect(button).toBeInTheDocument()
  // })
  // test('contains Fetch component', () => {
  //   const { getByText } = render(<App />)
  //   const text = getByText('Fetch data from backend')
  //   expect(text).toBeInTheDocument()
  // })
})
