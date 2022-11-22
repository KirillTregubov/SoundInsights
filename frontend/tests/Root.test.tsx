import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import Root from 'src/root'

describe('test Root.tsx', () => {
  test('contains header', () => {
    const { getByText } = render(<Root />, { wrapper: BrowserRouter })
    const header = getByText(/Team Ez2Type/i)
    expect(header).toBeInTheDocument()
  })
})
