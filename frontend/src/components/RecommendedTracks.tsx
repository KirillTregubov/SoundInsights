// import { useQuery } from '@tanstack/react-query'
// import { useForm, SubmitHandler } from 'react-hook-form'

// import { getRecommendedTracks } from 'lib/api'
// import Loading from 'components/Loading'

const RecommendedTracks: React.FC = () => {
  return <></>
}

export default RecommendedTracks

// const { data, dataUpdatedAt, isLoading, isError, error } = useQuery(
//   ['recommend-tracks'],
//   getRecommendedTracks
// )
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
