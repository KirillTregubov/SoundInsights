import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { MinusCircleIcon } from '@heroicons/react/20/solid'

import SpotifySearch, { Selection } from 'components/SpotifySearch'

import { getRecommendedTracks, getRecommendedTracksProps } from 'lib/api'
import TrackPreview from 'components/TrackPreview'
import Button from 'components/Button'
// import Loading from 'components/Loading'

const RecommendedTracks: React.FC = () => {
  const [selection, setSelection] = useState<Selection[]>([])
  const [hidden, setHidden] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { data, refetch } = useQuery(
    ['recommend-tracks'],
    () =>
      getRecommendedTracks(
        selection.map((item) => {
          const { uri } = item
          return uri
        }) as getRecommendedTracksProps
      ),
    {
      enabled: false,
      keepPreviousData: false
    }
  )

  useEffect(() => {
    return () => {
      queryClient.removeQueries('recommend-tracks')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function removeUri(uri: string) {
    setSelection(selection.filter((item) => item.uri !== uri))
  }

  function chooseSong({ image, uri }: Selection) {
    if (selection.filter((item) => item.uri === uri).length > 0) {
      removeUri(uri)
      return
    }
    if (selection.length >= 5) {
      alert('You may only select up to 5 tracks.') // TODO: improve UX
      return
    }
    setSelection([...selection, { image, uri }])
  }

  function getRecommendations() {
    refetch().then(() => {
      setHidden(true)
    })
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-2">
        <h1 className="text-lg font-medium">Get Music Recommendations</h1>
        <h3 className="text-neutral-600 dark:text-neutral-400">
          Select up to 5 tracks.
        </h3>
      </div>
      <div className="flex select-none items-center">
        {selection && selection.length == 0 ? (
          <div className="text-neutral-400 dark:text-neutral-700">
            No tracks selected...
          </div>
        ) : (
          <div className="flex gap-2.5">
            {selection.length > 0 &&
              selection.map((track) => (
                <button
                  className="group relative -m-1 p-1 text-red-700/80"
                  key={track.uri}
                  onClick={() => removeUri(track.uri)}>
                  <img
                    className="box-content h-7 w-7 rounded transition-[opacity,border-radius] group-hover:rounded-md group-hover:opacity-60"
                    src={track.image}
                    alt="Cover art"
                  />
                  <span className="absolute top-[-3px] right-[-3px] hidden h-3.5 w-3.5 rounded-full bg-red-900 opacity-75 group-hover:block group-hover:animate-ping"></span>
                  <MinusCircleIcon className="absolute top-[-3px] right-[-3px] h-3.5 w-3.5" />
                </button>
              ))}
          </div>
        )}
        <Button
          className="ml-auto"
          disabled={selection?.length == 0}
          onClick={() => getRecommendations()}>
          Get Recommendations
        </Button>
      </div>
      <SpotifySearch
        setChosen={chooseSong}
        hidden={hidden}
        setHidden={setHidden}
      />
      {data && (
        <div className="mt-4">
          <h1 className="text-lg font-medium">Recommended Tracks</h1>
          <div className="flex flex-col">
            {data.map((track) => (
              <TrackPreview key={track.uri} track={track} isSpotifyLink />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RecommendedTracks
