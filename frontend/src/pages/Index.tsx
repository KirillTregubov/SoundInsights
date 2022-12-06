import {
  ChartPieIcon,
  QueueListIcon,
  RectangleStackIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { Pie, PieChart } from 'recharts'

const Index: React.FC = () => {
  const data01 = [
    {
      name: 'Group A',
      value: 400
    },
    {
      name: 'Group B',
      value: 300
    },
    {
      name: 'Group C',
      value: 300
    },
    {
      name: 'Group D',
      value: 200
    },
    {
      name: 'Group E',
      value: 278
    },
    {
      name: 'Group F',
      value: 189
    }
  ]

  return (
    <>
      <div>
        <div className="flex flex-col gap-2">
          <Link to="/get-recommendations" title="Get Recommendations">
            <div className="flex items-center gap-2 rounded-lg bg-neutral-200 p-3 duration-150 hover:bg-neutral-300 active:scale-[.98] active:will-change-transform dark:bg-neutral-800 dark:hover:bg-neutral-700">
              <QueueListIcon className="h-10 w-10" />
              <div>
                <h1>Get Song Recommendations</h1>
                <p className="text-neutral-500 dark:text-neutral-400">
                  Select up to 5 Spotify tracks you like and receive 10 song
                  recommendations.
                </p>
              </div>
            </div>
          </Link>
          <Link to="/playlist-recommendations" title="Playlist Recommendations">
            <div className="flex items-center gap-2 rounded-lg bg-neutral-200 p-3 duration-150 hover:bg-neutral-300 active:scale-[.98] active:will-change-transform dark:bg-neutral-800 dark:hover:bg-neutral-700">
              <RectangleStackIcon className="h-10 w-10" />
              <div>
                <h1>Get Playlist Recommendations</h1>
                <p className="text-neutral-500 dark:text-neutral-400">
                  Feature coming soon!
                </p>
              </div>
            </div>
          </Link>
          <Link to="/playlist-analysis" title="Playlist Analysis">
            <div className="flex items-center gap-2 rounded-lg bg-neutral-200 p-3 duration-150 hover:bg-neutral-300 active:scale-[.98] active:will-change-transform dark:bg-neutral-800 dark:hover:bg-neutral-700">
              <ChartPieIcon className="h-10 w-10" />
              <div>
                <h1>Analysis of Top Playlists</h1>
                <p className="text-neutral-500 dark:text-neutral-400">
                  Feature coming soon!
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="my-2 rounded-lg border border-neutral-700 p-3">
          <h1 className="font-semibold">Recharts Demo</h1>
          <PieChart width={300} height={250}>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
              animationDuration={350}
            />
          </PieChart>
        </div>
      </div>
    </>
  )
}

export default Index
