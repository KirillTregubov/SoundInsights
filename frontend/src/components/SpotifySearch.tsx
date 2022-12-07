import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { searchTracks } from 'lib/api'
import { Track } from 'lib/types'
import Loading from 'components/Loading'
import TrackPreview from 'components/TrackPreview'
import Input from 'components/Input'

interface Props {
  setChosen?: ({ image, uri }: any) => void
  hidden?: boolean
  setHidden?: React.Dispatch<boolean>
}

const SpotifySearch: React.FC<Props> = ({
  setChosen,
  hidden = false,
  setHidden
}) => {
  const [search, setSearch] = useState('')
  const { data, isLoading, isError } = useQuery(
    ['search-tracks', search],
    async () => searchTracks(search),
    {
      enabled: Boolean(search),
      staleTime: 1000 * 60 * 60 // 1 hour
    }
  )

  useEffect(() => {
    if (setHidden && hidden) {
      setHidden(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  return (
    <>
      <Input setValue={handleSearch} placeholder="Search tracks on Spotify" />

      {search && (
        <div
          className={`overflow-hidden rounded-lg bg-neutral-100 transition-[opacity,max-height] ease-in-out will-change-[max-height] dark:bg-neutral-800 ${
            hidden ? 'max-h-0 opacity-0' : 'max-h-[100rem] py-1.5'
          } ${isLoading ? 'max-h-16' : ''}`}>
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
                    className="cursor-pointer select-none px-3 hover:bg-neutral-200 dark:hover:bg-neutral-700"
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
    </>
  )
}

export default SpotifySearch
