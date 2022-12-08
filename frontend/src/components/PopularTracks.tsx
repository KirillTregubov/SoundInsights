import TrackPreview from 'components/TrackPreview'

export default function PopularTracks(props: any) {
  const popularity = props.data
    .map((e: any) => {
      return {
        popularity: e.general_info.popularity,
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
      if (a.popularity > b.popularity) {
        return -1
      } else if (a.popularity < b.popularity) {
        return 1
      } else {
        return 0
      }
    })

  return (
    <>
      {popularity &&
        popularity.slice(0, 6).map((item: any) => {
          return (
            <TrackPreview
              track={item.track}
              className="clickable rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 lg:max-w-[17rem]"
              isSpotifyLink={true}
              key={item.track.uri}
            />
          )
        })}
    </>
  )
}
