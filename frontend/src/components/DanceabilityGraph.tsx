import {
  BarChart,
  CartesianGrid,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts'
import TrackPreview from 'components/TrackPreview'

export default function DanceabilityGraph(props: any) {
  const acousticness = props.data
    .map((e: any, index: any) => {
      return {
        name: props.data[index]?.general_info?.name,
        danceability: e.audio_features.danceability,
        instrumentalness: e.audio_features.instrumentalness,
        speechiness: -e.audio_features.speechiness,
        track: {
          name: e.general_info.name,
          artists: e.general_info.artists.map((a: any) => a.name),
          images: {
            small: e.general_info.album?.images[0].url
          },
          explicit: e.general_info.explicit
        }
      }
    })
    .sort((a: any, b: any) => {
      if (a.danceability > b.danceability) {
        return -1
      } else if (a.danceability < b.danceability) {
        return 1
      } else {
        return 0
      }
    })

  return (
    <ResponsiveContainer width="100%" height={325}>
      <BarChart
        data={acousticness}
        margin={{ top: 15, right: 15, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          stroke="currentColor"
          axisLine={{
            strokeWidth: 3
          }}
        />
        <YAxis
          stroke="currentColor"
          axisLine={{
            strokeWidth: 2
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="danceability" stackId="a" fill="#1DB954" />
        <Bar dataKey="speechiness" stackId="a" fill="#ff0000" />
      </BarChart>
    </ResponsiveContainer>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const track = payload[0]?.payload?.track
    return (
      <div className="max-w-md rounded-md bg-neutral-200 px-2 py-0.5 pr-3 dark:bg-neutral-700">
        <TrackPreview track={track} />
        <p className="mb-1 -mt-[0.1rem]">
          <span className="font-medium">Accousticness: </span>
          {payload[0]?.payload?.value}
        </p>
        danceability {payload[0]?.payload?.danceability}
        speechiness {payload[0]?.payload?.speechiness}
      </div>
    )
  }

  return null
}
