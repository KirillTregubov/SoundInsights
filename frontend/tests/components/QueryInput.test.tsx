import { render, screen } from '@testing-library/react'

import QueryInput from 'components/QueryInput'

describe('Test QueryInput component', () => {
  test('Ensure there are three options', () => {
    render(<QueryInput />)
    expect(screen.getAllByRole('combobox').length).toBe(3)
  })
})
