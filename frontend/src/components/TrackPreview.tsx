import { Track } from 'lib/types'

interface Props {
  className?: string
  track: Track
  onClick?: () => void
}

const TrackPreview: React.FC<Props> = ({ className, track, onClick }) => {
  return (
    <button
      className={`box-border flex w-full min-w-0 items-center py-1.5 text-left gap-2${
        className ? ` ${className}` : ''
      }`}
      onClick={onClick}>
      {track.images && (
        <img
          className="h-12 w-12 rounded-lg"
          src={track.images.small}
          alt="Cover art"
        />
      )}
      <div className="min-w-0">
        <p className="flex items-center overflow-hidden overflow-ellipsis whitespace-nowrap">
          {track.name}{' '}
          {!!track.explicit && (
            <span className="ml-1.5 flex items-center rounded-sm px-1 py-[3px] text-[10px] font-medium leading-none dark:bg-neutral-300 dark:text-neutral-900">
              E
            </span>
          )}
        </p>
        <div className="overflow-hidden overflow-ellipsis text-sm dark:text-neutral-400/90">
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
