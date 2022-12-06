import { Track } from 'lib/types'

interface Props {
  className?: string
  track: Track
  onClick?: () => void
  spotifyLink?: boolean
}

const TrackPreview: React.FC<Props> = ({
  className,
  track,
  onClick,
  isSpotifyLink = false
}) => {
  if (isSpotifyLink) {
    return (
      <a
        href={`https://open.spotify.com/track/${track.uri.split(':').pop()!}`}
        target="_blank"
        rel="noreferrer"
        className={`group relative box-border flex w-full min-w-0 items-center gap-2 py-1.5 text-left ${
          className ? ` ${className}` : ''
        }`}
        onClick={onClick}>
        {track.images && (
          <img
            className="h-12 w-12 rounded-md"
            src={track.images.small}
            alt="Cover art"
          />
        )}
        <div className="min-w-0">
          <div className="flex items-center">
            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {track.name}{' '}
            </p>
            {!!track.explicit && (
              <span
                title="Explicit"
                aria-label="Explicit"
                className="flex-0 ml-1.5 select-none rounded-sm bg-neutral-500 px-1 py-[3px] text-[10px] font-medium leading-none text-neutral-50 dark:bg-neutral-300 dark:text-neutral-900">
                E
              </span>
            )}
          </div>
          <div className="overflow-hidden overflow-ellipsis text-sm text-neutral-600 dark:text-neutral-400/90">
            {track.artists.map((artist: any) => (
              <span
                className="whitespace-nowrap after:content-[',\00a0'] [&:last-child]:after:content-['']"
                key={artist}>
                {artist}
              </span>
            ))}
          </div>
        </div>
      </a>
    )
  }

  return (
    <button
      className={`box-border flex w-full min-w-0 items-center gap-2 py-1.5 text-left ${
        className ? ` ${className}` : ''
      }`}
      onClick={onClick}>
      {track.images && (
        <img
          className="h-12 w-12 rounded-md"
          src={track.images.small}
          alt="Cover art"
        />
      )}
      <div className="min-w-0">
        <div className="flex items-center">
          <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            {track.name}{' '}
          </p>
          {!!track.explicit && (
            <span
              title="Explicit"
              aria-label="Explicit"
              className="flex-0 ml-1.5 select-none rounded-sm bg-neutral-500 px-1 py-[3px] text-[10px] font-medium leading-none text-neutral-50 dark:bg-neutral-300 dark:text-neutral-900">
              E
            </span>
          )}
        </div>
        <div className="overflow-hidden overflow-ellipsis text-sm text-neutral-600 dark:text-neutral-400/90">
          {track.artists.map((artist: any) => (
            <span
              className="whitespace-nowrap after:content-[',\00a0'] [&:last-child]:after:content-['']"
              key={artist}>
              {artist}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

export default TrackPreview
