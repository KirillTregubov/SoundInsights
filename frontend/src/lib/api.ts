import fetch from 'cross-fetch'
import { z } from 'zod'

import { PlaylistsValidator, TracksValidator } from 'lib/types'
import { toastError, toastLoad, toastSuccess } from 'lib/toast'

const API_URL = 'http://localhost:5050'

/*
 * WARN: Don't forget to add request mock to frontend/tests/setup.ts when
 * adding a new endpoint or tests will break.
 *
 * Also, don't forget to declare all relevant types in lib/types.ts
 */

export const searchTracks = async (query: string) => {
  const response = await fetch(`${API_URL}/search-tracks?query=${query}`)
  if (response.status !== 200) {
    toastError('Failed to get search for tracks')
    throw new Error('Request to /search-tracks failed')
  }
  const data = await response.json()
  return data
}

export const searchPlaylist = async (query: string) => {
  const response = await fetch(`${API_URL}/search-playlist?query=${query}`)
  if (response.status !== 200) {
    toastError('Failed to get search for playlists')
    throw new Error('Request to /search-playlist failed')
  }
  const data = await response.json()
  return data
}

export type getRecommendedTracksProps = [string]

export const getRecommendedTracks = async (
  tracks: getRecommendedTracksProps
) => {
  const toastId = toastLoad('Loading recommendations...')
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
    toastError('Failed to get recommendations', toastId)
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
  toastSuccess('Success', toastId)
  return TracksValidator.parse(data)
}

export const getRecommendedPlaylistTracks = async (id: string) => {
  const toastId = toastLoad('Loading recommendations...')
  const response = await fetch(`${API_URL}/recommend-playlist-tracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: id
    })
  })
  if (response.status !== 200) {
    toastError('Failed to get recommendations based on a playlist', toastId)
    throw new Error('Request to /recommend-playlist-tracks failed')
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
  toastSuccess('Success', toastId)
  return TracksValidator.parse(data)
}

export const getTopPlaylists = async () => {
  const response = await fetch(`${API_URL}/get-top-playlists`)
  if (response.status !== 200) {
    toastError('Failed to get top playlists')
    throw new Error('Request to /get-top-playlists failed')
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
  return PlaylistsValidator.parse(data)
}

export const getPlaylistData = async (id: string) => {
  const toastId = toastLoad('Analyzing playlist...')
  const response = await fetch(`${API_URL}/get-playlist-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: id
    })
  })
  if (response.status !== 200) {
    toastError('Failed to get playlist data', toastId)
    throw new Error('Request to /get-playlist-data failed')
  }
  const data = await response.json()
  toastSuccess('Success', toastId)
  return data
}
