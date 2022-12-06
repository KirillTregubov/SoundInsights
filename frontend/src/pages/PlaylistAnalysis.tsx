import { useQuery } from '@tanstack/react-query'

import { getTopPlaylists } from 'lib/api'
import PlaylistPreview from 'components/PlaylistPreview'
import Loading from 'components/Loading'

const PlaylistAnalysis: React.FC = () => {
  const query = useQuery(['top-playlists'], async () => getTopPlaylists())
  const { data, isLoading } = query

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-2">
        <h1 className="text-lg font-medium">Top Playlist Analysis</h1>
        <h3 className="dark:text-neutral-400">
          Choose one of the top 6 Spotify playlists to conduct an analysis on.
        </h3>
      </div>
      {isLoading && <Loading />}
      {data && (
        <div className="rounded-lg py-1.5 dark:bg-neutral-800">
          <div className="flex flex-col gap-1">
            {data.map((playlist) => (
              <PlaylistPreview
                className="cursor-pointer select-none px-3 hover:bg-neutral-700"
                key={playlist.uri}
                playlist={playlist}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PlaylistAnalysis
