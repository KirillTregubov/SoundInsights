import { render } from '@testing-library/react'

import Loading from 'components/Loading'

describe('test Loading.tsx component', () => {
  test('applies className properly', () => {
    const { container } = render(<Loading className="marked-class" />)
    const loading = container.querySelector('.marked-class')
    expect(loading).toBeInTheDocument()
  })
})
