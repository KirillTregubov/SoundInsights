import {
  BarChart,
  CartesianGrid,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts'
import TrackPreview from 'components/TrackPreview'

export default function DanceabilityGraph(props: any) {
  const danceability = props.data
    .map((e: any, index: any) => {
      return {
        name: props.data[index]?.general_info?.name,
        danceability: e.audio_features.danceability,
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
      if (a.danceability + a.speechiness > b.danceability + b.speechiness) {
        return -1
      } else if (
        a.danceability + a.speechiness <
        b.danceability + b.speechiness
      ) {
        return 1
      } else {
        return 0
      }
    })

  return (
    <ResponsiveContainer width="100%" height={325}>
      <BarChart
        data={danceability}
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
        <Tooltip content={CustomTooltip} />
        <Bar dataKey="danceability" stackId="a" fill="#1DB954" />
        <Bar dataKey="speechiness" stackId="a" fill="#ff0000" />
      </BarChart>
    </ResponsiveContainer>
  )
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const track = payload[0]?.payload?.track
    return (
      <div className="max-w-md rounded-md bg-neutral-200 px-2 py-0.5 pr-3 dark:bg-neutral-700">
        <TrackPreview track={track} />
        <div className="-mt-[0.1rem] flex items-baseline justify-start gap-2">
          <span className="w-[6.25rem] select-none font-medium">
            Danceability:{' '}
          </span>
          <div className="h-2.5 w-full min-w-[8rem] max-w-[12rem] rounded-full bg-neutral-300 dark:bg-neutral-600">
            <div
              className="h-2.5 rounded-full bg-[#1DB954]"
              style={{
                width: `${new Intl.NumberFormat('default', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(payload[0]?.payload?.danceability)}`
              }}></div>
          </div>
        </div>

        <div className="mb-1 flex items-baseline justify-start gap-2">
          <span className="w-[6.25rem] select-none font-medium">
            Speechiness:{' '}
          </span>
          <div className="h-2.5 w-full min-w-[8rem] max-w-[12rem] rounded-full bg-neutral-300 dark:bg-neutral-600">
            <div
              className="h-2.5 rounded-full bg-[#1DB954]"
              style={{
                width: `${new Intl.NumberFormat('default', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(Math.abs(payload[0]?.payload?.speechiness))}`
              }}></div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
