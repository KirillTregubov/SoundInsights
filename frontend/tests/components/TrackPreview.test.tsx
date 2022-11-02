import { render } from '@testing-library/react'

import TrackPreview from 'components/TrackPreview'
import { Track } from 'lib/types'
import { vi } from 'vitest'

describe('test SpotifySearch.tsx component', () => {
  test('applies className properly', () => {
    const track = {
      name: 'Track 1',
      artists: ['Artist 1'],
      images: {
        small: 'https://placeholder.com/64',
        large: 'https://placeholder.com/300'
      },
      uri: 'spotify:track:1',
      explicit: false
    } as Track
    const { container } = render(
      <TrackPreview className="marked-class" track={track} />
    )
    const loading = container.querySelector('.marked-class')
    expect(loading).toBeInTheDocument()
  })

  test('renders all desired track details', () => {
    const track = {
      name: 'Track 1',
      artists: ['Artist 1'],
      images: {
        small: 'https://placeholder.com/64',
        large: 'https://placeholder.com/300'
      },
      uri: 'spotify:track:1',
      explicit: true
    } as Track
    const { getByText, getByTitle } = render(<TrackPreview track={track} />)
    const header = getByText(/Track 1/i)
    expect(header).toBeInTheDocument()

    const artist = getByText(/Artist 1/i)
    expect(artist).toBeInTheDocument()

    const explicit = getByTitle(/Explicit/i)
    expect(explicit).toBeInTheDocument()
  })

  test('renders multiple artists', () => {
    const track = {
      name: 'Track 1',
      artists: ['Artist 1', 'Artist 2'],
      images: {
        small: 'https://placeholder.com/64',
        large: 'https://placeholder.com/300'
      },
      uri: 'spotify:track:1',
      explicit: false
    } as Track
    const { getByText } = render(<TrackPreview track={track} />)
    const artist1 = getByText(/Artist 1/i)
    expect(artist1).toBeInTheDocument()
    const artist2 = getByText(/Artist 2/i)
    expect(artist2).toBeInTheDocument()
  })

  test('correctly hides explicit icon', () => {
    const track = {
      name: 'Track 1',
      artists: ['Artist 1'],
      images: {
        small: 'https://placeholder.com/64',
        large: 'https://placeholder.com/300'
      },
      uri: 'spotify:track:1',
      explicit: false
    } as Track
    const { queryByTitle } = render(<TrackPreview track={track} />)
    const explicit = queryByTitle(/Explicit/i)
    expect(explicit).not.toBeInTheDocument()
  })

  test('correctly calls onClick', () => {
    const track = {
      name: 'Track 1',
      artists: ['Artist 1'],
      images: {
        small: 'https://placeholder.com/64',
        large: 'https://placeholder.com/300'
      },
      uri: 'spotify:track:1',
      explicit: false
    } as Track
    const onClick = vi.fn()
    const { getByRole } = render(
      <TrackPreview track={track} onClick={onClick} />
    )
    const button = getByRole('button')
    button.click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
