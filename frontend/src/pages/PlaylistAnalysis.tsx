import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { UserGroupIcon } from '@heroicons/react/20/solid'

import { getTopPlaylists, getPlaylistData } from 'lib/api'
import { useDelay } from 'lib/hooks'
import PlaylistPreview from 'components/PlaylistPreview'
import Loading from 'components/Loading'
import AcousticnessGraph from 'components/AcousticnessGraph'
import ExplicitGraph from 'components/ExplicitGraph'
import MoodGraph from 'components/MoodGraph'
import SpotifyPlaylistSearch from 'components/SpotifyPlaylistSearch'
import DanceabilityGraph from 'components/DanceabilityGraph'
import FastestTracks from 'components/FastestTracks'
import LoudestTracks from 'components/LoudestTracks'

const PlaylistAnalysis: React.FC = () => {
  const [hidden, setHidden] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null)
  const { data: playlists, isLoading: isLoadingPlaylists } = useQuery(
    ['top-playlists'],
    async () => getTopPlaylists()
  )
  const { data, refetch: fetchPlaylistData } = useQuery(
    ['playlist-data', selectedPlaylist],
    async () => getPlaylistData(selectedPlaylist || ''),
    {
      enabled: false,
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: false
    }
  )

  useEffect(() => {
    return () => {
      setSelectedPlaylist(null)
    }
  }, [])

  useEffect(() => {
    if (data) {
      window.scrollTo(0, 0)
    }
  }, [data])

  const handleClick = (playlist: string) => {
    setHidden(true)
    setSelectedPlaylist(playlist)
  }

  useEffect(() => {
    if (selectedPlaylist && !data) {
      fetchPlaylistData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlaylist, data])

  return (
    <div
      className={`mx-auto transition-[max-width] duration-300 ease-out will-change-[max-width] ${
        data ? 'max-w-5xl' : 'max-w-xl'
      }`}>
      {/* max-w-xl */}
      <div className={`mb-3 ${data ? 'sticky top-[3.75rem]' : ''}`}>
        <h1 className="text-lg font-medium">Top Playlist Analysis</h1>
        <h3 className="dark:text-neutral-400">
          Choose a playlist to conduct an analysis on.
        </h3>
      </div>
      {data ? (
        <>
          <div className="sticky top-[7.75rem]">
            <div className="mb-3 select-none">
              <button
                className="clickable group mt-1 inline-flex items-center gap-0.5 rounded-md bg-neutral-200 py-1 px-1.5 pr-2.5 font-medium hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                onClick={() => setSelectedPlaylist(null)}>
                <ChevronLeftIcon className="h-4 w-4 transition-transform will-change-transform group-hover:-translate-x-0.5" />
                Select another playlist
              </button>
            </div>
            <a
              href={`https://open.spotify.com/playlist/${data.playlist.uri
                .split(':')
                .pop()!}`}
              target="_blank"
              rel="noreferrer"
              className={`animate-entrance clickable mb-4 flex w-full max-w-full cursor-pointer items-center gap-5 rounded-xl bg-neutral-100 p-4 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700`}>
              <img
                className="h-32 w-32 rounded-lg"
                src={data.playlist.image}
                alt="Cover art"
              />
              <div className="flex-1 overflow-hidden">
                <div className="mb-3 flex items-end">
                  <div>
                    <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-medium">
                      {data.playlist.name}
                    </h1>
                    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap  dark:text-neutral-400">
                      {data.playlist.owner}
                    </div>
                  </div>
                  <div
                    className="ml-auto flex max-w-full cursor-default items-center gap-1 overflow-hidden overflow-ellipsis break-words dark:text-neutral-400"
                    title={`${new Intl.NumberFormat().format(
                      data.playlist.followers
                    )} followers`}>
                    <UserGroupIcon className="h-4 w-4" />
                    <span>
                      {new Intl.NumberFormat('en-CA', {
                        notation: 'compact',
                        compactDisplay: 'short'
                      }).format(data.playlist.followers)}
                    </span>
                  </div>
                </div>
                <div className="max-w-full overflow-hidden overflow-ellipsis break-words dark:text-neutral-400">
                  {data.playlist.description}
                </div>

                {/* <div className="overflow-hidden overflow-ellipsis dark:text-neutral-400/90">
                  <span className="whitespace-nowrap after:content-[',\00a0'] [&:last-child]:after:content-['']">
                    {data.playlist.description}
                     && (
                      <UserGroupIcon className="h-4 w-4" />
                    ) 
                  </span>
                </div> */}
              </div>
            </a>
          </div>
          <PlaylistPage data={data} />
        </>
      ) : (
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
                        className="clickable cursor-pointer select-none rounded-md border border-transparent px-3 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        key={playlist.uri}
                        playlist={playlist}
                        onClick={() => {
                          setSelectedPlaylist(playlist.uri.split(':').pop()!)
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PlaylistAnalysis

const PlaylistPage = ({ data }: { data: any }) => {
  const delayedRender = useDelay(200)

  return delayedRender(() => (
    <>
      <div className="mb-4 flex gap-4">
        <div className="animate-entrance flex w-full max-w-[48rem] flex-col items-center justify-center rounded-xl bg-neutral-100 px-7 py-5 dark:bg-neutral-800">
          <h3 className="mb-1 text-lg font-medium">Track Acousticness</h3>
          <AcousticnessGraph data={data.tracks} />
        </div>
        <div className="animate-entrance flex flex-1 flex-col items-center justify-center rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
          <h3 className="mb-1 text-lg font-medium">Explicitness Ratio</h3>
          <ExplicitGraph data={data.tracks} />
        </div>
      </div>
      <div className="my-4 flex gap-4">
        <div className="animate-entrance flex w-full flex-1 flex-col items-start justify-center rounded-xl bg-neutral-100 p-4 py-5 dark:bg-neutral-800">
          <h3 className="mb-2 w-full text-center text-lg font-medium">
            Fastest Tracks
          </h3>
          <FastestTracks data={data.tracks} />
        </div>
        <div className="animate-entrance flex w-full max-w-[44rem] flex-col items-center justify-center rounded-xl bg-neutral-100 p-4 px-7 py-5 dark:bg-neutral-800">
          <h3 className="mb-1 text-lg font-medium">Playlist Mood</h3>
          <MoodGraph data={data.tracks} />
        </div>
      </div>
      <div className="my-4 flex gap-4">
        <div className="animate-entrance flex w-full max-w-[44rem] flex-col items-center justify-center rounded-xl bg-neutral-100 px-7 py-5 dark:bg-neutral-800">
          <h3 className="text-lg font-medium">Party Viability Ranking</h3>
          <DanceabilityGraph data={data.tracks} />
        </div>
        <div className="animate-entrance flex w-full flex-1 flex-col items-start justify-center rounded-xl bg-neutral-100 p-4 py-5 dark:bg-neutral-800">
          <h3 className="mb-2 w-full text-center text-lg font-medium">
            Loudest Tracks
          </h3>
          <LoudestTracks data={data.tracks} />
        </div>
      </div>
    </>
  ))
}
