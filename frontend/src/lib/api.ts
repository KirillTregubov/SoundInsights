import fetch from 'cross-fetch'

const API_URL = 'http://localhost:5050/'

/*
 * WARN: Don't forget to add request mock to frontend/tests/setup.ts when
 * adding a new endpoint or tests will break.
 */

const getDemoQuery = async () => {
  const response = await fetch(`${API_URL}db-demo`)
  if (!response.ok) {
    throw new Error('Request to /db-demo failed')
  }
  return response.json()
}

export { getDemoQuery }
