import TrackPreview from 'components/TrackPreview'

export default function FastestTracks(props: any) {
  const tempo = props.data
    .map((e: any) => {
      return {
        tempo: e.audio_features.tempo,
        track: {
          name: e.general_info.name,
          artists: e.general_info.artists.map((a: any) => a.name),
          images: {
            small: e.general_info.album?.images[0].url
          },
          uri: e.general_info.uri,
          explicit: e.general_info.explicit
        }
      }
    })
    .sort((a: any, b: any) => {
      if (a.tempo > b.tempo) {
        return -1
      } else if (a.tempo < b.tempo) {
        return 1
      } else {
        return 0
      }
    })

  return (
    <>
      {tempo &&
        tempo.slice(0, 6).map((item) => {
          return (
            <TrackPreview
              track={item.track}
              className="clickable max-w-[17rem] rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              isSpotifyLink={true}
              key={item.track.uri}
            />
          )
        })}
    </>
  )
}
