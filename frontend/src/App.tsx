import {
  QueryClientProvider,
  QueryClient,
  useQuery
} from '@tanstack/react-query'

import { getQuery } from 'lib/api'

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
  const query = useQuery(['query'], getQuery)

  return (
    <div className="m-2 rounded-lg bg-gray-200 p-4">
      <h1 className="font-semibold ">Fetch data from backend</h1>
      <div>Data: {JSON.stringify(query.data)}</div>
      <h4 className="mt-1 text-sm text-gray-900">
        Received at {new Date(query.dataUpdatedAt).toLocaleString()}
      </h4>
    </div>
  )
}

export default App
