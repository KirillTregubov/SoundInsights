import { responses } from '../setup'
import { getRecommendedTracks } from 'lib/api'
import { TracksValidator } from 'lib/types'

describe('Test lib/api endpoints', () => {
  test('API mock works', async () => {
    const data = await getRecommendedTracks([
      'spotify:track:6y0igZArWVi6Iz0rj35c1Y'
    ])
    expect(TracksValidator.parse(data))
    expect(data).toEqual(responses['recommend-tracks'])
  })
})
