import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getPlaylistData, getTopPlaylists } from 'lib/api'
import PlaylistPreview from 'components/PlaylistPreview'
import Loading from 'components/Loading'
import SpotifyPlaylistSearch from 'components/SpotifyPlaylistSearch'
import { useNavigate } from 'react-router-dom'

const PlaylistAnalysis: React.FC = () => {
  const [hidden, setHidden] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null)
  const { data: playlists, isLoading: isLoadingPlaylists } = useQuery(
    ['top-playlists'],
    async () => getTopPlaylists()
  )
  const { refetch: fetchPlaylistData } = useQuery(
    ['playlist-data', selectedPlaylist],
    async () => getPlaylistData(selectedPlaylist || ''),
    {
      enabled: false,
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: false
    }
  )
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      setSelectedPlaylist(null)
    }
  }, [])

  const handleClick = (playlist: string) => {
    setHidden(true)
    setSelectedPlaylist(playlist)
  }

  useEffect(() => {
    if (selectedPlaylist) {
      fetchPlaylistData()
      setTimeout(() => {
        navigate('/playlist-analysis/' + selectedPlaylist.split(':').pop()!)
      }, 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlaylist])

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-3">
        <h1 className="text-xl font-medium">Top Playlist Analysis</h1>
        <h3 className="text-[17px] dark:text-neutral-400">
          Choose a playlist to conduct an analysis on.
        </h3>
      </div>
      <>
        <SpotifyPlaylistSearch
          hidden={hidden}
          setHidden={setHidden}
          setChosen={handleClick}
        />
        {isLoadingPlaylists ? (
          <div className="flex h-full w-full items-center justify-center p-6">
            <Loading />
          </div>
        ) : (
          <div className="mt-3">
            <h1 className="my-1 mt-3 text-lg font-medium">Top Playlists</h1>
            <div className="rounded-lg bg-neutral-100 py-1.5 dark:bg-neutral-800">
              <div className="flex flex-col gap-1">
                {playlists &&
                  playlists.map((playlist) => (
                    <PlaylistPreview
                      className="clickable cursor-pointer select-none rounded-md px-3 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                      key={playlist.uri}
                      playlist={playlist}
                      onClick={() => {
                        handleClick(playlist.uri.split(':').pop()!)
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  )
}

export default PlaylistAnalysis
