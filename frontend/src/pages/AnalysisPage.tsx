import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { UserGroupIcon } from '@heroicons/react/20/solid'

import { getPlaylistData } from 'lib/api'
import AcousticnessGraph from 'components/AcousticnessGraph'
import ExplicitGraph from 'components/ExplicitGraph'
import MoodGraph from 'components/MoodGraph'
import DanceabilityGraph from 'components/DanceabilityGraph'
import FastestTracks from 'components/FastestTracks'
// import LoudestTracks from 'components/LoudestTracks'
import { useParams } from 'react-router-dom'
import Loading from 'components/Loading'
import PopularTracks from 'components/PopularTracks'
import AverageStats from 'components/AverageStats'

const AnalysisPage: React.FC = () => {
  const { id: selectedPlaylist } = useParams()
  const { data } = useQuery(
    ['playlist-data', selectedPlaylist],
    async () => getPlaylistData(selectedPlaylist || ''),
    {
      enabled: !!selectedPlaylist,
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: false
    }
  )

  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center">
      <div className="sticky top-[2rem] z-10 -mt-7 w-full bg-white pt-7 dark:bg-neutral-900">
        <div className="mb-3">
          <h1 className="text-xl font-medium">Playlist Analysis Report</h1>
          <h3 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-[17px] dark:text-neutral-400">
            Analyzing{' '}
            {data ? (
              <span className="">
                {data?.playlist.name} by {data?.playlist.owner}
              </span>
            ) : (
              <>an Awesome Playlist</>
            )}
            .
          </h3>
        </div>
        <div className="mb-3 select-none">
          <Link
            className="clickable group mt-1 inline-flex items-center gap-0.5 rounded-md bg-neutral-100 py-1 px-1.5 pr-2.5 font-medium hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            to="/playlist-analysis">
            <ChevronLeftIcon className="h-4 w-4 transition-transform will-change-transform group-hover:-translate-x-0.5" />
            Select another playlist
          </Link>
        </div>
      </div>
      {data ? (
        <>
          <div className="mb-4 flex w-full flex-col gap-4 smallLayout:flex-row">
            <a
              href={`https://open.spotify.com/playlist/${data.playlist.uri
                .split(':')
                .pop()!}`}
              target="_blank"
              rel="noreferrer"
              className="animate-entrance clickable flex w-full max-w-full cursor-pointer items-center gap-5 rounded-xl bg-neutral-100 p-4 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700">
              <img
                className="h-32 w-32 select-none rounded-lg"
                src={data.playlist.image}
                alt="Cover art"
              />
              <div className="flex-1 overflow-hidden">
                <div className="mb-3 items-end xs:flex">
                  <div>
                    <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-medium">
                      {data.playlist.name}
                    </h1>
                    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap  dark:text-neutral-400">
                      {data.playlist.owner}
                    </div>
                  </div>
                  <div
                    className="ml-auto mt-1 flex max-w-full cursor-default items-center gap-1 overflow-hidden overflow-ellipsis break-words dark:text-neutral-400 sm:mt-0"
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
              </div>
            </a>
            <div className="animate-entrance flex w-full flex-col items-center justify-center rounded-xl bg-neutral-100 px-2 py-4 dark:bg-neutral-800 sm:py-5 sm:px-5 smallLayout:max-w-[22rem]">
              <h3 className="mb-1 text-lg font-medium">Playlist Statistics</h3>
              <AverageStats data={data.tracks} />
            </div>
          </div>
          <div className="flex w-full flex-wrap gap-4">
            <div className="animate-entrance flex w-full flex-col items-center justify-center rounded-xl bg-neutral-100 px-2 py-4 dark:bg-neutral-800 sm:py-5 sm:px-7 layout:max-w-[48rem]">
              <h3 className="mb-1 text-lg font-medium">Track Acousticness</h3>
              <AcousticnessGraph data={data.tracks} />
            </div>
            <div className="animate-entrance flex w-full flex-col items-center justify-center rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800 sm:w-[15rem] sm:overflow-hidden">
              <h3 className="mb-1 text-lg font-medium">Explicitness Ratio</h3>
              <ExplicitGraph data={data.tracks} />
            </div>
            <div className="animate-entrance flex w-full flex-1 flex-col items-center justify-center rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800 sm:min-w-[15rem] sm:overflow-hidden sm:py-5">
              <h3 className="mb-2 w-full text-center text-lg font-medium">
                High Tempo Tracks
              </h3>
              <FastestTracks data={data.tracks} />
            </div>
            <div className="animate-entrance flex w-full flex-col items-center justify-center rounded-xl bg-neutral-100 px-2 py-4 dark:bg-neutral-800 sm:px-7 sm:py-5 layout:max-w-[44rem]">
              <h3 className="mb-1 text-lg font-medium">Playlist Mood</h3>
              <MoodGraph data={data.tracks} />
            </div>
            <div className="animate-entrance flex w-full flex-col items-center justify-center rounded-xl bg-neutral-100 px-2 py-4 dark:bg-neutral-800 sm:px-7 sm:py-5 layout:max-w-[44rem]">
              <h3 className="mb-1 text-lg font-medium">
                Party Viability Ranking
              </h3>
              <DanceabilityGraph data={data.tracks} />
            </div>
            {/* <div className="animate-entrance flex w-full flex-1 flex-col items-center justify-center rounded-xl bg-neutral-100 p-4 py-5 dark:bg-neutral-800">
              <h3 className="mb-3 w-full text-center text-lg font-medium">
                Loudest Tracks
              </h3>
              <LoudestTracks data={data.tracks} />
            </div> */}
            <div className="animate-entrance flex w-full flex-1 flex-col items-center justify-center rounded-xl bg-neutral-100 p-4 py-5 dark:bg-neutral-800">
              <h3 className="mb-2 w-full text-center text-lg font-medium">
                Top Tracks
              </h3>
              <PopularTracks data={data.tracks} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center p-4">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default AnalysisPage
