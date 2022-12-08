import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function ExplicitGraph(props: any) {
  let yes = 0
  let no = 0
  for (const e of props.data) {
    if (e.general_info.explicit) {
      yes++
    } else {
      no++
    }
  }
  const data = [
    {
      name: 'yes',
      value: yes
    },
    {
      name: 'no',
      value: no
    }
  ]

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
          label
          animationDuration={750}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.name === 'yes' ? 'red' : 'green'}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
