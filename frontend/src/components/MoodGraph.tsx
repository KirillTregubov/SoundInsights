import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Scatter,
  Label,
  Tooltip,
  TooltipProps
} from 'recharts'

import TrackPreview from 'components/TrackPreview'

export default function MoodGraph(props: any) {
  const data = props.data.map((e: any) => {
    return {
      valence: e.audio_features.valence,
      energy: e.audio_features.energy,
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

  return (
    <ResponsiveContainer width="100%" height={400} className="">
      <ScatterChart margin={{ top: 15, right: 15, bottom: 20, left: 12.5 }}>
        <CartesianGrid className="stroke-neutral-900 dark:stroke-neutral-50" />
        <XAxis
          type="number"
          dataKey="valence"
          name="valence"
          domain={[0, 1]}
          stroke="currentColor"
          tick={{ fill: 'currentColor' }}
          axisLine={{
            strokeWidth: 2
          }}>
          <Label
            value="Happy"
            position="insideTopRight"
            offset={30}
            className="fill-current"
          />
          <Label
            value="Unhappy"
            position="insideTopLeft"
            offset={30}
            className="fill-current"
          />
        </XAxis>
        <YAxis
          type="number"
          dataKey="energy"
          name="energy"
          domain={[0, 1]}
          stroke="currentColor"
          tick={{ fill: 'currentColor' }}
          axisLine={{
            strokeWidth: 2
          }}>
          <Label
            value="Intense"
            angle={270}
            position="insideTopRight"
            offset={62}
            className="fill-current"
          />
          <Label
            value="Relaxing"
            angle={270}
            position="insideBottomLeft"
            offset={9}
            className="fill-current"
          />
        </YAxis>
        <Scatter name="Tracks" data={data} fill="#1DB954" />
        <Tooltip content={CustomTooltip} />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const track = payload[0]?.payload?.track
    return (
      <div className="w-full max-w-md rounded-md bg-neutral-200 px-2 py-0.5 dark:bg-neutral-700">
        <TrackPreview track={track} />
        <div className="my-1 mx-1 mb-1.5 flex flex-col gap-1.5">
          {payload.map((item: any, index: number) => (
            <div
              key={index}
              className="relative flex w-full items-baseline justify-center gap-1">
              <div className="w-[3.8rem] flex-shrink-0 flex-grow-0 select-none text-sm">
                {item.name === 'valence' ? 'Unhappy' : 'Relaxing'}
              </div>
              <div className="h-2.5 w-full min-w-[8rem] max-w-[12rem] rounded-full bg-neutral-300 dark:bg-neutral-600">
                <div
                  className="h-2.5 rounded-full bg-[#1DB954]"
                  style={{
                    width: `${new Intl.NumberFormat('default', {
                      style: 'percent',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(item.value)}`
                  }}></div>
              </div>
              <div className="w-[3.3rem] flex-shrink-0 flex-grow-0 select-none text-right text-sm">
                {item.name === 'valence' ? 'Happy' : 'Intense'}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}
