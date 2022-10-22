import fetch from 'cross-fetch'
import { z } from 'zod'

const API_URL = 'http://localhost:5050/'

/*
 * WARN: Don't forget to add request mock to frontend/tests/setup.ts when
 * adding a new endpoint or tests will break.
 */

export const demoQuery = z
  .object({
    query: z.string(),
    result: z.number()
  })
  .strict()

export const getDemoQuery = async () => {
  const response = await fetch(`${API_URL}db-demo`)
  if (response.status !== 200) {
    throw new Error('Request to /db-demo failed')
  }
  const data = await response.json()
  return demoQuery.parse(data)
}
