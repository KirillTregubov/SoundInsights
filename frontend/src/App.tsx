import {
  QueryClientProvider,
  QueryClient
  // useQuery
} from '@tanstack/react-query'

// import QueryInput from 'components/QueryInput'
// import RecommendedTracks from 'components/RecommendedTracks'
import RecommendedTracks from 'components/RecommendedTracks'
// import { getDemoQuery } from 'lib/api'

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
        <RecommendedTracks />
        {/* <QueryInput />
        <Fetch /> */}
        {/* <RecommendedTracks /> */}
      </div>
    </QueryClientProvider>
  )
}

export default App
