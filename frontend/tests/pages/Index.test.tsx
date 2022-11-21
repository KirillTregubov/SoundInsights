import { render } from '@testing-library/react'

import { Main } from '../helpers'

describe('test Index.tsx', () => {
  test('contains RecommendedTracks link', () => {
    const { getByTitle } = render(<Main />)
    const GetRecommendationsLink = getByTitle(
      'Get Recommendations'
    ) as HTMLAnchorElement
    expect(GetRecommendationsLink?.href).toContain('/get-recommendations')
  })
})
