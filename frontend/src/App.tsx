import {
  QueryClientProvider,
  QueryClient,
  useQuery
} from '@tanstack/react-query'

import QueryInput from 'components/QueryInput'
import { getDemoQuery } from 'lib/api'

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <div id="App" className="m-2">
        <p>Hello from App.tsx</p>
        <QueryInput />
        <Fetch />
      </div>
    </QueryClientProvider>
  )
}

const Fetch: React.FC = () => {
  const { data, dataUpdatedAt, isLoading, isError, error } = useQuery(
    ['query'],
    getDemoQuery
  )

  if (isLoading)
    return (
      <div className="my-2 rounded-lg bg-gray-200 p-4">
        <h1 className="font-semibold ">Fetch data from backend</h1>
        {/* By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL */}
        <svg
          className="mt-1 h-7 w-7 animate-spin text-gray-700"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              x1="8.042%"
              y1="0%"
              x2="65.682%"
              y2="23.865%"
              id="a">
              <stop stopColor="currentColor" stopOpacity="0" offset="0%" />
              <stop
                stopColor="currentColor"
                stopOpacity=".631"
                offset="63.146%"
              />
              <stop stopColor="currentColor" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)">
              <path
                d="M36 18c0-9.94-8.06-18-18-18"
                stroke="url(#a)"
                strokeWidth="2"></path>
            </g>
          </g>
        </svg>
      </div>
    )
  if (isError)
    return (
      <div className="my-2 rounded-lg bg-gray-200 p-4">
        <h1 className="font-semibold ">Fetch data from backend</h1>
        <div>
          <pre>{error?.toString()}</pre>
        </div>
      </div>
    )

  return (
    <div className="my-2 rounded-lg bg-gray-200 p-4">
      <h1 className="font-semibold ">Fetch data from backend</h1>
      <div>
        Data: <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

      <h4 className="mt-1 text-sm text-gray-900">
        Received at {new Date(dataUpdatedAt).toLocaleString()}
      </h4>
    </div>
  )
}

export default App
