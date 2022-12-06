import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

import { getTopPlaylists, getPlaylistData } from 'lib/api'
import PlaylistPreview from 'components/PlaylistPreview'
import Loading from 'components/Loading'
import AcousticnessGraph from 'components/AcousticnessGraph'
import ExplicitGraph from 'components/ExplicitGraph'
import MoodGraph from 'components/MoodGraph'

const PlaylistAnalysis: React.FC = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const { data: playlists, isLoading: isLoadingPlaylists } = useQuery(
    ['top-playlists'],
    async () => getTopPlaylists()
  )
  const { data, refetch: fetchPlaylistData } = useQuery(
    ['playlist-data', selectedPlaylist],
    async () => getPlaylistData(selectedPlaylist),
    {
      enabled: false,
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: false
    }
  )

  useEffect(() => {
    if (selectedPlaylist && !data) {
      console.log('fetching playlist data')
      fetchPlaylistData(selectedPlaylist)
    }
  }, [selectedPlaylist, fetchPlaylistData, data])

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-2">
        <h1 className="text-lg font-medium">Top Playlist Analysis</h1>
        <h3 className="dark:text-neutral-400">
          Choose one of the top 6 Spotify playlists to conduct an analysis on.
        </h3>
      </div>
      {data ? (
        <>
          <div className="mb-2">
            <button
              className="group mt-1 inline-flex items-center gap-0.5 rounded-md bg-neutral-200 py-1 px-1.5 pr-2.5 font-medium hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              onClick={() => setSelectedPlaylist(null)}>
              <ChevronLeftIcon className="h-4 w-4 transition-transform will-change-transform group-hover:-translate-x-0.5" />
              Select another playlist
            </button>
          </div>
          {/* <details>
            <summary className="select-none">Data</summary>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </details> */}
          <h3 className="text-lg font-medium">
            How Natural Sounding is this Playlist? (Acousticness)
          </h3>
          <AcousticnessGraph data={data} />
          <h3 className="text-lg font-medium">
            How many tracks are explicit (red) or not (green)?
          </h3>
          <ExplicitGraph data={data} />
          <h3 className="text-lg font-medium">
            What is the mood of this playlist? (valence (x) by energy (y))
          </h3>
          <MoodGraph data={data} />
        </>
      ) : isLoadingPlaylists ? (
        <Loading />
      ) : (
        <div className="rounded-lg bg-neutral-100 py-1.5 dark:bg-neutral-800">
          <div className="flex flex-col gap-1">
            {playlists.map((playlist) => (
              <PlaylistPreview
                className="cursor-pointer select-none rounded-md border border-transparent px-3 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                key={playlist.uri}
                playlist={playlist}
                onClick={() => {
                  setSelectedPlaylist(playlist.uri.split(':').pop()!)
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PlaylistAnalysis
