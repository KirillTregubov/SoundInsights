import {
  QueryClientProvider,
  QueryClient,
  useQuery
} from '@tanstack/react-query'

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
      <div id="App">
        <div className="m-2">Hello from App.tsx</div>
        <Fetch />
      </div>
    </QueryClientProvider>
  )
}

const Fetch: React.FC = () => {
  const { data, dataUpdatedAt, isLoading } = useQuery(['query'], getDemoQuery)

  if (isLoading)
    return (
      <div className="m-2 rounded-lg bg-gray-200 p-4">
        <h1 className="font-semibold ">Fetch data from backend</h1>
        <div>Loading...</div>
      </div>
    )

  return (
    <div className="m-2 rounded-lg bg-gray-200 p-4">
      <h1 className="font-semibold ">Fetch data from backend</h1>
      <div>
        Data: <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

      <select id="user_select1" onChange="update()">
        <option value="c1">customize1</option>
        <option value="c2">customize2</option>
        <option value="c3">customize3</option>
      </select>

      <h4 className="mt-1 text-sm text-gray-900">
        Received at {new Date(dataUpdatedAt).toLocaleString()}
      </h4>
    </div>
  )
}

export default App
