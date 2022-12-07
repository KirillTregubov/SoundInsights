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
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 0, right: 0, bottom: 50, left: 0 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey="valence" name="valence" domain={[0, 1]}>
          <Label value="Happy" position="insideTopRight" offset={30} />
          <Label value="Unhappy" position="insideTopLeft" offset={30} />
        </XAxis>
        <YAxis type="number" dataKey="energy" name="energy" domain={[0, 1]}>
          <Label
            value="Intense"
            angle={270}
            position="insideTopRight"
            offset={58}
          />
          <Label
            value="Relaxing"
            angle={270}
            position="insideBottomLeft"
            offset={12}
          />
        </YAxis>
        <Scatter name="Tracks" data={data} fill="#8884d8" />
        <ReferenceLine x={0.5} stroke="#000000" />
        <ReferenceLine y={0.5} stroke="#000000" />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
