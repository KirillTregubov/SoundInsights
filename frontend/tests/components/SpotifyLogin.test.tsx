import { render } from '@testing-library/react'
import TrackPreview from 'components/TrackPreview'
import { Track } from 'lib/types'

describe('test UserLogin.tsx component', () => {
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
})
