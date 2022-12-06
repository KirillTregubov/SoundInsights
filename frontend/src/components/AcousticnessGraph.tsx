import {
  BarChart,
  CartesianGrid,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function AcousticnessGraph(props) {
  const acousticness = props.data
    .map((e, index) => {
      return {
        name: index,
        value: e.audio_features.acousticness
      }
    })
    .sort((a, b) => {
      if (a.value < b.value) {
        return -1
      } else if (a.value > b.value) {
        return 1
      } else {
        return 0
      }
    })

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={acousticness}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}
