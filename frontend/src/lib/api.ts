import fetch from 'cross-fetch'
import { z } from 'zod'

const API_URL = 'http://localhost:5050'

/*
 * WARN: Don't forget to add request mock to frontend/tests/setup.ts when
 * adding a new endpoint or tests will break.
 */

export const DemoQuery = z
  .object({
    query: z.string(),
    result: z.number()
  })
  .strict()

export const getDemoQuery = async () => {
  const response = await fetch(`${API_URL}/db-demo`)
  if (response.status !== 200) {
    throw new Error('Request to /db-demo failed')
  }
  const data = await response.json()
  return DemoQuery.parse(data)
}

export const Track = z
  .object({
    name: z.string(),
    artists: z.string().array(),
    image_url: z.string().url().nullable()
  })
  .strict()

export const Tracks = Track.array()

export const getRecommendedTracks = async () => {
  const response = await fetch(`${API_URL}/recommend-tracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: ['0c6xIDDpzE81m2q797ordA', '3Qm86XLflmIXVm1wcwkgDK']
    })
  })
  if (response.status !== 200) {
    throw new Error('Request to /recommend-tracks failed')
  }
  const data = await response.json()
  try {
    Tracks.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues)
      throw new Error(`Type error ${JSON.stringify(error.issues)}`)
    }
  }
  return Tracks.parse(data)
}
