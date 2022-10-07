import renderer from 'react-test-renderer'
import App from '../src/App'
import { render } from '@testing-library/react'

describe('App.tsx', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('contains desired title', () => {
    const { getByText } = render(<App />)
    const linkElement = getByText(/Vite \+ React/i)
    expect(linkElement).toBeInTheDocument()
  })
})
