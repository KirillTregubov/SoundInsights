import { getDemoQuery } from 'lib/api'
import { responses } from '../setup'

describe('Test lib/api endpoints', () => {
  test('API mock works', async () => {
    const data = await getDemoQuery()
    expect(data).toEqual(responses['db-demo'])
  })
})
