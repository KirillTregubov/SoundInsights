import { responses } from '../setup'
import { getDemoQuery } from 'lib/api'
import { DemoQuery } from 'lib/types'

describe('Test lib/api endpoints', () => {
  test('API mock works', async () => {
    const data = await getDemoQuery()
    expect(DemoQuery.parse(data))
    expect(data).toEqual(responses['db-demo'])
  })
})
