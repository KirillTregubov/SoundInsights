import { render } from '@testing-library/react'

import App from 'src/App'

describe('test App.tsx', () => {
  test('failure test', () => {
    expect(false).toBe(true)
  })

  test('contains desired title', () => {
    const { getByText } = render(<App />)
    const text = getByText('Hello from App.tsx')
    expect(text).toBeInTheDocument()
  })

  test('contains QueryInput component', () => {
    const { getByRole } = render(<App />)
    const button = getByRole('button', { name: 'Search' })
    expect(button).toBeInTheDocument()
  })

  test('contains Fetch component', () => {
    const { getByText } = render(<App />)
    const text = getByText('Fetch data from backend')
    expect(text).toBeInTheDocument()
  })
})
