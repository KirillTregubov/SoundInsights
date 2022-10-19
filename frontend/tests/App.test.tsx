import renderer from 'react-test-renderer'
import App from '../src/App'
import { render, screen } from '@testing-library/react'

describe('App.tsx', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('contains desired title', () => {
    const { getByText } = render(<App />)
    const linkElement = getByText(/Hello from App.tsx/i)
    expect(linkElement).toBeInTheDocument()
  })

  test('Select an option', () => {
    render(<App />)
    expect(screen.getAllByRole('option').length).toBe(3)
    })
})
