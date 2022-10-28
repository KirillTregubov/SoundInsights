import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { searchTracks } from 'lib/api'
import { Track } from 'lib/types'
import { useDebounce } from 'lib/hooks'
import Loading from 'components/Loading'
import TrackPreview from 'components/TrackPreview'

interface InputProps {
  setValue: React.Dispatch<string>
}

const Input: React.FC<InputProps> = ({ setValue }) => {
  const [search, setSearch] = useState('')
  useDebounce(
    () => {
      setValue(search)
    },
    [search],
    400
  )

  return (
    <>
      <div className="group my-2 flex items-center rounded-full border px-3 py-1 dark:border-neutral-500 dark:focus-within:border-neutral-500 dark:focus-within:bg-neutral-800">
        <MagnifyingGlassIcon
          className={`h-5 w-5 ${
            search.length > 0
              ? 'text-neutral-50'
              : 'text-neutral-300 group-focus-within:text-neutral-500 dark:text-neutral-600'
          }`}
        />
        <input
          className="w-full select-none bg-inherit px-2 py-1 placeholder:text-neutral-300 focus:outline-none group-focus-within:placeholder:text-neutral-500 dark:placeholder:text-neutral-600"
          placeholder="Search tracks on Spotify"
          autoComplete="off"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
    </>
  )
}

export type Selection = {
  uri: string
  image: string | undefined
}

interface Props {
  setChosen?: React.Dispatch<Selection>
}

const SpotifySearch: React.FC<Props> = ({ setChosen }) => {
  const [search, setSearch] = useState('')
  const query = useQuery(
    ['search-tracks', search],
    async () => searchTracks(search),
    {
      enabled: Boolean(search), // TODO: remove when fallback songs added
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 // 1 hour
    }
  )
  const { data, isLoading, isError } = query

  return (
    <>
      <div className="">
        <Input setValue={setSearch} />

        {/* TODO: fix bug that flashes old result when resetting to empty */}
        {search && (
          <div className="rounded-lg py-1.5 dark:bg-neutral-800">
            {isLoading ? (
              <div className="px-3">
                <Loading className="my-1" />
              </div>
            ) : isError ? (
              <div className="px-3">Error</div>
            ) : data ? (
              <div>
                <div>
                  {data.map((track: Track) => (
                    <TrackPreview
                      className="cursor-pointer select-none px-3 hover:bg-neutral-700"
                      key={track.uri}
                      track={track}
                      onClick={() => {
                        setChosen &&
                          setChosen({
                            image: track.images?.small,
                            uri: track.uri.split(':').pop()! // NOTE: removes spotify:track: prefix
                          })
                      }}
                    />
                  ))}
                </div>
                {/* <details>
                  <summary className="select-none">Data</summary>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </details> */}
              </div>
            ) : (
              <div>No results</div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default SpotifySearch
