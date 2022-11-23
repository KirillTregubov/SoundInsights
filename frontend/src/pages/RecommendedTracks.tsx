import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MinusCircleIcon } from '@heroicons/react/20/solid'

import SpotifySearch, { Selection } from 'components/SpotifySearch'

import { getRecommendedTracks, getRecommendedTracksProps } from 'lib/api'
import TrackPreview from 'components/TrackPreview'
// import Loading from 'components/Loading'

const RecommendedTracks: React.FC = () => {
  const [selection, setSelection] = useState<Selection[]>([])
  const [dirty, setDirty] = useState<boolean>(false)
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
      enabled: false
    }
  )
  // { data, refetch, dataUpdatedAt, isLoading, isError, error }

  function removeUri(uri: string) {
    setSelection(selection.filter((item) => item.uri !== uri))
  }

  function chooseSong({ image, uri }: Selection) {
    if (selection.filter((item) => item.uri === uri).length > 0) {
      removeUri(uri)
      return
    }
    if (!dirty) {
      setDirty(true)
    }
    if (selection.length >= 5) {
      alert('You may only select up to 5 tracks.') // TODO: improve UX
      return
    }
    setSelection([...selection, { image, uri }])
  }

  function getRecommendations() {
    refetch()
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-2">
        <h1 className="text-lg font-medium">Get Music Recommendations</h1>
        <h3 className="dark:text-neutral-400">Select up to 5 tracks.</h3>
      </div>
      <div className="flex select-none items-center">
        {selection && selection.length == 0 ? (
          <div className="dark:text-neutral-700">No tracks selected...</div>
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
        <button
          className="ml-auto rounded-full border py-1 px-3 disabled:cursor-not-allowed disabled:dark:border-neutral-700 disabled:dark:text-neutral-700"
          disabled={selection?.length == 0}
          onClick={() => getRecommendations()}>
          Get Recommendations
        </button>
      </div>
      <SpotifySearch setChosen={chooseSong} />
      {data && (
        <div className="mt-4">
          <h1 className="text-lg font-medium">Recommended Tracks</h1>
          <div className="flex flex-col">
            {data.map((track) => (
              <TrackPreview key={track.uri} track={track} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RecommendedTracks

// const Body = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="my-2 rounded-lg bg-neutral-200 p-4">
//       <h1 className="font-semibold">Fetch Recommended Tracks</h1>
//       <div>{children}</div>
//     </div>
//   )
// }
// if (isLoading)
//   return (
//     <Body>
//       {/* By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL */}
//       <svg
//         className="mt-1 h-7 w-7 animate-spin text-neutral-700"
//         viewBox="0 0 38 38"
//         xmlns="http://www.w3.org/2000/svg">
//         <defs>
//           <linearGradient
//             x1="8.042%"
//             y1="0%"
//             x2="65.682%"
//             y2="23.865%"
//             id="a">
//             <stop stopColor="currentColor" stopOpacity="0" offset="0%" />
//             <stop
//               stopColor="currentColor"
//               stopOpacity=".631"
//               offset="63.146%"
//             />
//             <stop stopColor="currentColor" offset="100%" />
//           </linearGradient>
//         </defs>
//         <g fill="none" fillRule="evenodd">
//           <g transform="translate(1 1)">
//             <path
//               d="M36 18c0-9.94-8.06-18-18-18"
//               stroke="url(#a)"
//               strokeWidth="2"></path>
//           </g>
//         </g>
//       </svg>
//     </Body>
//   )
// if (isError)
//   return (
//     <Body>
//       <pre>{error?.toString()}</pre>
//     </Body>
//   )
// return (
//   <Body>
//     <div>
//       Data: <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//     <h4 className="mt-1 text-sm text-neutral-900">
//       Received at {new Date(dataUpdatedAt).toLocaleString()}
//     </h4>
//   </Body>
// )
// }
