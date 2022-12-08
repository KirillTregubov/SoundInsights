import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Scatter,
  Label,
  Tooltip
} from 'recharts'
import TrackPreview from './TrackPreview'

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
      <ScatterChart margin={{ top: 5, right: 5, bottom: 50, left: 10 }}>
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
        <Tooltip content={<CustomTooltip />} />
        {/* <ReferenceLine x={0.5} stroke="!currentColor" />
        <ReferenceLine y={0.5} stroke="!currentColor" /> */}
      </ScatterChart>
    </ResponsiveContainer>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const track = payload[0]?.payload?.track
    return (
      <div className="w-full max-w-md rounded-md bg-neutral-200 px-2 py-0.5 pr-3 dark:bg-neutral-700">
        <TrackPreview track={track} />
        <div className="mx-auto my-1 flex max-w-[20rem] flex-col items-center gap-1">
          {payload.map((item, index) => (
            <div key={index} className="relative flex items-center gap-1">
              <div className="w-[3.8rem] flex-shrink-0 flex-grow-0 text-sm">
                {item.name === 'valence' ? 'Unhappy' : 'Relaxing'}
              </div>
              <div className="h-2.5 w-full min-w-[8rem] max-w-[16rem] rounded-full bg-neutral-400 dark:bg-neutral-600">
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

              <div className="w-[3.3rem] flex-shrink-0 flex-grow-0 text-right text-sm">
                {item.name === 'valence' ? 'Happy' : 'Intense'}
              </div>
              {/* <p className="">
                <span className="font-medium capitalize">{item.name}: </span>
                {item.value}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}
