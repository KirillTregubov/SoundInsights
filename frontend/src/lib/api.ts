import fetch from 'cross-fetch'

const API_URL = 'http://localhost:5050/'

const getQuery = async () => {
  const response = await fetch(`${API_URL}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export { getQuery }
