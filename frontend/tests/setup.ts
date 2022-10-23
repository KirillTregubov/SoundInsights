import '@testing-library/jest-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll } from 'vitest'

const responses = {
  'db-demo': { query: 'Mock query', result: 2 },
  'recommend-tracks': [
    {
      name: 'Lose Control (feat. Ciara & Fat Man Scoop)',
      artists: ['Missy Elliott', 'Ciara', 'Fatman Scoop'],
      image_url:
        'https://i.scdn.co/image/ab67616d0000b273f1dfae21eaac0d24fb3dcf5a'
    },
    {
      name: 'Toxic',
      artists: ['Britney Spears'],
      image_url:
        'https://i.scdn.co/image/ab67616d0000b273efc6988972cb04105f002cd4'
    }
  ]
}

const handlers = [
  rest.get('http://localhost:5050/db-demo', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(responses['db-demo']))
  }),
  rest.post('http://localhost:5050/recommend-tracks', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(responses['recommend-tracks']))
  })
]

export { responses }

// This configures a Service Worker with the given request handlers.
const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
