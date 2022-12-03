import { useQuery } from '@tanstack/react-query'
import { getTopPlaylists } from 'lib/api'

const TopPlaylists: React.FC = () => {
  const query = useQuery(['top-playlists'], async () => getTopPlaylists())
  const { data, isLoading } = query

  return (
    <div>
      <h1>Top Playlist Analysis</h1>
      {isLoading && <p>Loading...</p>}
      {data && (
        <div>
          Data: <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default TopPlaylists
