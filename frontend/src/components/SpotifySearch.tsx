import { useQuery } from '@tanstack/react-query'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

import { Track } from 'lib/types'
import { searchTracks } from 'lib/api'

// import { getRecommendedTracks } from 'lib/api'
// import Loading from 'components/Loading'

// type Inputs = {
//   example: string
//   exampleRequired: string
// }

// const SpotifySearch: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     watch
//     // formState: { errors }
//   } = useForm<Inputs>()
//   const onSubmit: SubmitHandler<Inputs> = (data) => {
//     console.log('data', data)
//   }

//   console.log(watch('example'))

//   return (
//     <div>
//       <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
//         <div className="flex items-center rounded-full border border-neutral-600 px-3 py-1">
//           <MagnifyingGlassIcon className="h-5 w-5 text-neutral-600" />
//           <input
//             className="bg-inherit px-2 py-1 placeholder:text-neutral-300 focus:outline-none dark:placeholder:text-neutral-500"
//             placeholder="Search"
//             autoComplete="off"
//             {...register('example')}
//           />
//         </div>

//         {/* <input
//         className="rounded-md border px-2 py-1"
//         {...register('exampleRequired', { required: true })}
//       /> */}
//         {/* errors will return when field validation fails  */}
//         {/* {errors.exampleRequired && <span>This field is required</span>} */}

//         {/* <button type="submit">Search</button> */}
//       </form>
//       {/* <button>Search</button> */}
//       {/* <Loading /> */}
//     </div>
//   )
// }

import { useCallback } from 'react'
import TrackPreview from 'components/TrackPreview'
import Loading from 'components/Loading'

function useDebounceEffect(
  effect: any,
  deps: React.DependencyList,
  delay = 250
) {
  const callback = useCallback(effect, [...deps, effect])

  useEffect(() => {
    const timeout = setTimeout(callback, delay)
    return () => clearTimeout(timeout)
  }, [callback, delay])
}

interface InputProps {
  setValue: React.Dispatch<string>
}

const Input: React.FC<InputProps> = ({ setValue }) => {
  const [search, setSearch] = useState('')
  useDebounceEffect(
    () => {
      setValue(search)
    },
    [search],
    400
  )

  return (
    <>
      <div className="group my-2 flex items-center rounded-full border border-neutral-600 px-3 py-1 focus-within:border-neutral-500 focus-within:bg-neutral-800">
        <MagnifyingGlassIcon
          className={`h-5 w-5 text-neutral-600 ${
            search.length > 0
              ? 'text-neutral-50'
              : 'group-focus-within:text-neutral-500'
          }`}
        />
        <input
          className="select-none bg-inherit px-2 py-1 placeholder:text-neutral-300 focus:outline-none dark:placeholder:text-neutral-500"
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
              <div className="px-3.5">
                <Loading className="my-1" />
              </div>
            ) : isError ? (
              <div>Error</div>
            ) : data ? (
              <div>
                <div>
                  {data.map((track: Track) => (
                    <TrackPreview
                      className="cursor-pointer select-none px-3.5 hover:bg-neutral-700"
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
