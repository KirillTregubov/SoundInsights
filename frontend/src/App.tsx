import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import RecommendedTracks from 'components/RecommendedTracks'

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
      <div id="App" className="">
        <nav className="sticky top-0 z-10 -mb-6 flex items-center gap-2 bg-gradient-to-b from-neutral-900 via-neutral-900 p-2 pb-6">
          <img
            className="h-7 w-7 select-none"
            src="/assets/icon.svg"
            alt="Project logo"
          />
          <h1 className="font-semibold">Team Ez2Type</h1>
        </nav>
        <div className="m-6">
          <RecommendedTracks />
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
