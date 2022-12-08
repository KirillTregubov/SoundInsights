import {
  BarChart,
  CartesianGrid,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import TrackPreview from './TrackPreview'

export default function AcousticnessGraph(props: any) {
  const acousticness = props.data
    .map((e: any, index: any) => {
      return {
        name: props.data[index]?.general_info?.name,
        value: e.audio_features.acousticness,
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
      if (a.value < b.value) {
        return -1
      } else if (a.value > b.value) {
        return 1
      } else {
        return 0
      }
    })

  return (
    <ResponsiveContainer width="100%" height={300}>
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
        <Bar dataKey="value" fill="#1DB954" />
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
      </div>
    )
  }

  return null
}
