import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

import { searchPlaylist } from 'lib/api'
import { Playlist } from 'lib/types'
import Loading from 'components/Loading'
import Input from 'components/Input'
import PlaylistPreview from 'components/PlaylistPreview'

interface Props {
  setChosen?: React.Dispatch<string>
  hidden?: boolean
  setHidden?: React.Dispatch<boolean>
  isSelected?: (arg0: string) => boolean
}

const SpotifyPlaylistSearch: React.FC<Props> = ({
  setChosen,
  hidden = false,
  setHidden,
  isSelected = () => false
}) => {
  const [search, setSearch] = useState('')
  const { data, isLoading, isError } = useQuery(
    ['search-playlist', search],
    async () => searchPlaylist(search),
    {
      enabled: Boolean(search),
      staleTime: 1000 * 60 * 60 // 1 hour
    }
  )

  useEffect(() => {
    if (setHidden && hidden) {
      setHidden && setHidden(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  return (
    <>
      <div className="relative">
        <Input
          setValue={handleSearch}
          placeholder="Search playlist on Spotify"
        />
        {!hidden && search != '' && (
          <ChevronUpIcon
            className="absolute top-1/2 right-0  h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition"
            onClick={() => {
              setHidden && setHidden(true)
            }}
          />
        )}
      </div>

      {/* TODO: fix bug that flashes old result when resetting to empty */}
      {search && (
        <div
          className={`mb-4 overflow-hidden rounded-lg bg-neutral-100 transition-[opacity,max-height] ease-in-out will-change-[max-height] dark:bg-neutral-800 ${
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
              <div className="mx-0.5">
                {data.map((playlist: Playlist) => (
                  <PlaylistPreview
                    className={`clickable cursor-pointer select-none rounded-md px-3 hover:bg-neutral-200 dark:hover:bg-neutral-700 ${
                      isSelected(playlist.uri) ? 'selected' : ''
                    }`}
                    key={playlist.uri}
                    playlist={playlist}
                    onClick={() => {
                      setChosen && setChosen(playlist.uri.split(':').pop()!)
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div>No results</div>
          )}
        </div>
      )}
    </>
  )
}

export default SpotifyPlaylistSearch
