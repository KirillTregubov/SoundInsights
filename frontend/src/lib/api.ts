import fetch from 'cross-fetch'
import { z } from 'zod'

import { DemoQuery, PlaylistsValidator, TracksValidator } from 'lib/types'

const API_URL = 'http://localhost:5050'

/*
 * WARN: Don't forget to add request mock to frontend/tests/setup.ts when
 * adding a new endpoint or tests will break.
 *
 * Also, don't forget to declare all relevant types in lib/types.ts
 */

export const getDemoQuery = async () => {
  const response = await fetch(`${API_URL}/db-demo`)
  if (response.status !== 200) {
    throw new Error('Request to /db-demo failed')
  }
  const data = await response.json()
  return DemoQuery.parse(data)
}

export const searchTracks = async (query: string) => {
  const response = await fetch(`${API_URL}/search-tracks?query=${query}`)
  if (response.status !== 200) {
    throw new Error('Request to /search failed')
  }
  const data = await response.json()
  return data
}

export type getRecommendedTracksProps = [uri: string]

export const getRecommendedTracks = async (
  tracks: getRecommendedTracksProps
) => {
  const response = await fetch(`${API_URL}/recommend-tracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: tracks
    })
  })
  if (response.status !== 200) {
    throw new Error('Request to /recommend-tracks failed')
  }
  const data = await response.json()
  try {
    TracksValidator.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues)
      throw new Error(`Type error ${JSON.stringify(error.issues)}`)
    }
  }
  return TracksValidator.parse(data)
}

export const getTopPlaylists = async (query: string) => {
  const response = await fetch(`${API_URL}/get-top-playlists`)
  if (response.status !== 200) {
    throw new Error('Request to /search failed')
  }
  const data = await response.json()
  try {
    PlaylistsValidator.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues)
      throw new Error(`Type error ${JSON.stringify(error.issues)}`)
    }
  }
  return data
}
