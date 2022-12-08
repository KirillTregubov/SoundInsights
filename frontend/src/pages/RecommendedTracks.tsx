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
      retry: false,
      onSuccess: () => {
        setTimeout(() => {
          const element = document.getElementById('recommendations')
          if (element) element.scrollIntoView()
        }, 0)
      }
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
        <h1 className="text-xl font-medium">Get Music Recommendations</h1>
        <h3 className="text-[17px] text-neutral-600 dark:text-neutral-400">
          Recommendations are based on up to 5 tracks of your choosing.
        </h3>
      </div>
      <div className="flex select-none flex-col justify-center gap-1 xs:flex-row xs:gap-0">
        <div className="flex h-9 items-center">
          {selection && selection.length == 0 ? (
            <h3 className="text-neutral-400 dark:text-neutral-600">
              No tracks selected...
            </h3>
          ) : (
            <div className="flex gap-4">
              {selection.length > 0 &&
                selection.map((track) => (
                  <button
                    className="group relative -m-2 p-2 text-red-700/80"
                    key={track.uri}
                    onClick={() => removeUri(track.uri)}>
                    <img
                      className="box-content h-7 w-7 rounded-sm transition-[opacity,border-radius] group-hover:rounded-md group-hover:opacity-60 sm:rounded"
                      src={track.image}
                      alt="Cover art"
                    />
                    <span className="absolute top-0 right-0 hidden h-3.5 w-3.5 rounded-full bg-red-900 opacity-75 group-hover:block group-hover:animate-ping"></span>
                    <MinusCircleIcon className="absolute top-0 right-0 h-3.5 w-3.5" />
                  </button>
                ))}
            </div>
          )}
        </div>
        <Button
          className="box-content h-7 xs:ml-auto xs:h-auto"
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
        <div id="recommendations" className="mt-4">
          <h1 className="text-lg font-medium">Recommended Tracks</h1>
          <div className="flex flex-col">
            {data.map((track) => (
              <TrackPreview
                key={track.uri}
                track={track}
                isSpotifyLink={true}
                className="clickable -mx-2 rounded-md !p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RecommendedTracks
