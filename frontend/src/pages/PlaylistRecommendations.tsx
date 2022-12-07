import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getTopPlaylists, getRecommendedPlaylistTracks } from 'lib/api'
import TrackPreview from 'components/TrackPreview'
import PlaylistPreview from 'components/PlaylistPreview'
import Loading from 'components/Loading'
import Button from 'src/components/Button'
import SpotifyPlaylistSearch from 'components/SpotifyPlaylistSearch'
import { XCircleIcon } from '@heroicons/react/24/outline'

const PlaylistRecommendations: React.FC = () => {
  const [hidden, setHidden] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null)
  const { data: playlists, isLoading: isLoadingPlaylists } = useQuery(
    ['top-playlists'],
    async () => getTopPlaylists()
  )
  const { data: playlistData, refetch: fetchRecommendations } = useQuery(
    ['recommend-playlist-tracks'],
    async () => getRecommendedPlaylistTracks(selectedPlaylist || ''),
    {
      enabled: false,
      retry: false
    }
  )

  function handleSelection(uri: string) {
    if (selectedPlaylist === uri.split(':').pop()!) {
      setSelectedPlaylist(null)
      return
    }

    setSelectedPlaylist(uri.split(':').pop()!)
  }

  function getRecommendations() {
    if (selectedPlaylist) {
      fetchRecommendations()
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-3">
        <h1 className="text-lg font-medium">
          Get Music Recommendations based on a Playlist
        </h1>
        <h3 className="text-neutral-600 dark:text-neutral-400">
          Recommendations are based on a playlist of your choice.
        </h3>
      </div>
      <div className="flex items-center">
        {!selectedPlaylist ? (
          <h3 className="text-neutral-400 dark:text-neutral-600">
            No playlist selected...
          </h3>
        ) : (
          <button
            className="clickable flex items-center gap-1 text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"
            onClick={() => setSelectedPlaylist(null)}>
            Remove selection
            <XCircleIcon className="h-34 w-5" />
          </button>
        )}
        <Button
          className="ml-auto"
          disabled={selectedPlaylist?.length == 0}
          onClick={getRecommendations}>
          Get Recommendations
        </Button>
      </div>
      <div>
        <SpotifyPlaylistSearch
          hidden={hidden}
          setHidden={setHidden}
          setChosen={handleSelection}
          isSelected={(uri) => selectedPlaylist === uri.split(':').pop()!}
        />
        {isLoadingPlaylists ? (
          <Loading />
        ) : (
          <div className="rounded-lg bg-neutral-100 py-1.5 dark:bg-neutral-800">
            <div className="flex flex-col gap-1">
              {playlists &&
                playlists.map((playlist) => (
                  <PlaylistPreview
                    className={`clickable cursor-pointer select-none rounded-md border border-transparent px-3 ring-1 ring-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700 ${
                      selectedPlaylist === playlist.uri.split(':').pop()
                        ? 'selected'
                        : ''
                    }`}
                    key={playlist.uri}
                    playlist={playlist}
                    onClick={() => handleSelection(playlist.uri)}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
      {playlistData && (
        <div className="mt-4">
          <h1 className="text-lg font-medium">Recommended Tracks</h1>
          <div className="flex flex-col">
            {playlistData.map((track) => (
              <TrackPreview
                key={track.uri}
                track={track}
                isSpotifyLink={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PlaylistRecommendations
