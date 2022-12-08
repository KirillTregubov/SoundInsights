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
    <ResponsiveContainer width="100%" height={225}>
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={75}
          fill="currentColor"
          stroke="currentColor"
          label
          animationDuration={750}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              className={`${
                entry.name === 'yes'
                  ? 'fill-red-500 dark:!fill-red-700'
                  : 'fill-green-500 dark:!fill-green-700'
              }`}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
