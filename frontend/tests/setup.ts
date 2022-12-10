import '@testing-library/jest-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll } from 'vitest'

const responses = {
  'recommend-tracks': [
    {
      name: 'Lose Control (feat. Ciara & Fat Man Scoop)',
      artists: ['Missy Elliott', 'Ciara', 'Fatman Scoop'],
      uri: 'spotify:track:0WqIKmW4BTrj3eJFmnCKMv',
      explicit: false,
      images: {
        small:
          'https://i.scdn.co/image/ab67616d0000b273f1dfae21eaac0d24fb3dcf5a',
        large:
          'https://i.scdn.co/image/ab67616d0000b273f1dfae21eaac0d24fb3dcf5a'
      }
    },
    {
      name: 'Toxic',
      artists: ['Britney Spears'],
      uri: 'spotify:track:6I9VzXrHxO9rA9A5euc8Ak',
      explicit: false,
      images: {
        small:
          'https://i.scdn.co/image/ab67616d0000b273efc6988972cb04105f002cd4',
        large:
          'https://i.scdn.co/image/ab67616d0000b273efc6988972cb04105f002cd4'
      }
    }
  ]
}

const handlers = [
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

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.scrollTo = () => {}
