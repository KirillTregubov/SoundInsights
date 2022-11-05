import { render } from '@testing-library/react'

import QueryInput from 'components/QueryInput'

describe('test QueryInput component', () => {
  test('ensure there are three options', () => {
    const screen = render(<QueryInput />)
    expect(screen.getAllByRole('combobox').length).toBe(3)
  })

  test('ensure there is a Search button', () => {
    const screen = render(<QueryInput />)
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })
})
