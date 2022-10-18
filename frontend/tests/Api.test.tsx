// import renderer from 'react-test-renderer'
import { getDemoQuery } from '../src/lib/api'
// import { render } from '@testing-library/react'
import { responses } from './setup'

describe('Test lib/api endpoints', () => {
  test('API mock works', async () => {
    const data = await getDemoQuery()
    expect(data).toEqual(responses['db-demo'])
  })
})
