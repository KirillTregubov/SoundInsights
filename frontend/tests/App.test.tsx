import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'

import App from 'src/App'

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
})
