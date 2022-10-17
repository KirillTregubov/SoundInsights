import '@testing-library/jest-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { afterAll, afterEach, beforeAll } from 'vitest'

const handlers = [
  rest.get('http://localhost:5050/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Hello world!' }))
  })
]

// This configures a Service Worker with the given request handlers.
const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
