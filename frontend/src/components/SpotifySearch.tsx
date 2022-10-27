import { useQuery } from '@tanstack/react-query'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
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
      <div className="my-3 flex items-center rounded-full border border-neutral-600 px-3 py-1">
        <MagnifyingGlassIcon className="h-5 w-5 text-neutral-600" />
        <input
          className="bg-inherit px-2 py-1 placeholder:text-neutral-300 focus:outline-none dark:placeholder:text-neutral-500"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
    </>
  )
}

const SpotifySearch: React.FC = () => {
  const [search, setSearch] = useState('')
  const query = useQuery(
    ['search-tracks', search],
    async () => searchTracks(search),
    {
      enabled: Boolean(search),
      keepPreviousData: true,
      staleTime: 1000 * 60 * 90
    }
  )
  const { data, isLoading, isError } = query

  return (
    <>
      <div>
        <Input setValue={setSearch} />

        {search && (
          <>
            {isLoading ? (
              <div>Loading...</div>
            ) : isError ? (
              <div>Error</div>
            ) : data ? (
              <pre>{JSON.stringify(data)}</pre>
            ) : (
              <div>No results</div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default SpotifySearch
