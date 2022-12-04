import { Playlist } from 'lib/types'

interface Props {
  className?: string
  playlist: Playlist
  onClick?: () => void
}

const PlaylistPreview: React.FC<Props> = ({ className, playlist, onClick }) => {
  return (
    <button
      className={`playlist-preview relative box-border flex w-full min-w-0 items-center gap-2 py-1.5 text-left ${
        className ? ` ${className}` : ''
      }`}
      style={{ '--accent-color': playlist.color || '#1DB954' }}
      onClick={() => onClick(playlist.uri)}>
      <img
        className="h-16 w-16 rounded-md"
        src={playlist.image}
        alt="Cover art"
      />
      <div>
        <p className="flex items-center overflow-hidden overflow-ellipsis whitespace-nowrap">
          {playlist.name}
        </p>
        <div className="overflow-hidden overflow-ellipsis dark:text-neutral-400/90">
          <span className="whitespace-nowrap after:content-[',\00a0'] [&:last-child]:after:content-['']">
            {playlist.owner}
          </span>
        </div>
      </div>
    </button>
  )
}

export default PlaylistPreview
