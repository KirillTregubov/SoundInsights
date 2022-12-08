import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Scatter,
  ReferenceLine,
  Label
} from 'recharts'

export default function MoodGraph(props: any) {
  const data = props.data.map((e: any) => {
    return {
      valence: e.audio_features.valence,
      energy: e.audio_features.energy
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
          stroke="currentColor !important"
          tick={{ fill: 'currentColor' }}>
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
          stroke="currentColor !important"
          tick={{ fill: 'currentColor' }}>
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
        {/* <ReferenceLine x={0.5} stroke="!currentColor" />
        <ReferenceLine y={0.5} stroke="!currentColor" /> */}
      </ScatterChart>
    </ResponsiveContainer>
  )
}
