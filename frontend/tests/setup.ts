import '@testing-library/jest-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll } from 'vitest'

const responses = {
  'db-demo': { query: 'Mock query', result: 2 }
}

const handlers = [
  rest.get('http://localhost:5050/db-demo', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(responses['db-demo']))
  })
]

export { responses }

// This configures a Service Worker with the given request handlers.
const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
