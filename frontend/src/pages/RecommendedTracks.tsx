import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MinusCircleIcon } from '@heroicons/react/20/solid'

import { getRecommendedTracks, getRecommendedTracksProps } from 'lib/api'
import { toastError } from 'lib/toast'
import { queryClient } from 'lib/router'
import SpotifySearch from 'components/SpotifySearch'
import TrackPreview from 'components/TrackPreview'
import Button from 'components/Button'

const RecommendedTracks: React.FC = () => {
  const [selection, setSelection] = useState<{ image: string; uri: string }[]>(
    []
  )
  const [hidden, setHidden] = useState<boolean>(false)
  const { data, refetch } = useQuery(
    ['recommend-tracks'],
    () =>
      getRecommendedTracks(
        selection.map(({ uri }) => {
          return uri
        }) as getRecommendedTracksProps
      ),
    {
      enabled: false,
      retry: false
    }
  )

  useEffect(() => {
    return () => {
      queryClient.removeQueries('recommend-tracks' as any)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function removeUri(uri: string) {
    setSelection(selection.filter((item) => item.uri !== uri))
  }

  function chooseSong({ image, uri }: { image: string; uri: string }) {
    if (selection.filter((item) => item.uri === uri).length > 0) {
      removeUri(uri)
      return
    }
    if (selection.length >= 5) {
      toastError('You may only select up to 5 tracks.')
      return
    }
    setSelection([...selection, { image, uri }])
  }

  function getRecommendations() {
    setHidden(true)
    refetch()
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-3">
        <h1 className="text-lg font-medium">Get Music Recommendations</h1>
        <h3 className="text-neutral-600 dark:text-neutral-400">
          Recommendations are based on up to 5 tracks of your choosing.
        </h3>
      </div>
      <div className="flex select-none items-center">
        {selection && selection.length == 0 ? (
          <h3 className="text-neutral-400 dark:text-neutral-600">
            No tracks selected...
          </h3>
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

export default RecommendedTracks
