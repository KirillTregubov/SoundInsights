import { NavLink } from 'react-router-dom'
import {
  ChartPieIcon,
  QueueListIcon,
  RectangleStackIcon
} from '@heroicons/react/24/outline'

interface FeatureListProps {
  expanded?: boolean
}

const FeatureList: React.FC<FeatureListProps> = ({ expanded = false }) => {
  return (
    <div
      className={`mx-auto flex w-full gap-1.5 rounded-2xl border border-green-400/70 bg-green-100/70 bg-clip-padding p-3 backdrop-blur-xl backdrop-filter dark:border-[#030C07]/80 dark:bg-[#17201A]/70 sm:gap-2 ${
        expanded ? '' : 'max-w-4xl'
      }`}>
      <FeatureCard
        name="Track Recommendations"
        Icon={QueueListIcon}
        to="/track-recommendations"
        title="Get Recommendations"
        description={
          expanded ? 'Get recommendations based on Spotify tracks.' : undefined
        }
      />
      <FeatureCard
        name="Playlist Recommendations"
        Icon={RectangleStackIcon}
        to="/playlist-recommendations"
        title="Playlist Recommendations"
        description={
          expanded
            ? 'Get recommendations based on a Spotify playlist.'
            : undefined
        }
      />
      <FeatureCard
        name="Playlist Analyzer"
        Icon={ChartPieIcon}
        to="/playlist-analysis"
        title="Playlist Analysis"
        description={
          expanded ? 'Analyze a Spotify playlist of your choice.' : undefined
        }
      />
    </div>
  )
}

export default FeatureList

interface FeatureCardProps {
  name: string
  Icon?: React.FC<{ className: string }>
  to: string
  title: string
  description?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  name,
  Icon = QuestionMarkCircleIcon,
  to,
  title,
  description
}) => {
  const expanded = description !== undefined
  return (
    <NavLink
      className={({ isActive }) =>
        `group flex flex-1 cursor-pointer select-none items-center items-center justify-center rounded-xl bg-green-300/40 bg-clip-padding duration-150 hover:bg-green-400/60 active:scale-[.97] active:will-change-transform dark:bg-[#020804]/40 dark:hover:bg-[#5B876C]/40 ${
          isActive ? 'bg-green-400/80 dark:bg-[#2B6442]/40' : ''
        } ${expanded ? 'flex-col py-4 px-6' : 'py-2 px-3'}`
      }
      to={to}
      title={title}>
      <div className="relative">
        <Icon className="relative z-10 mx-2 h-6 w-6 text-green-900 dark:text-green-300 sm:h-10 sm:w-10" />
        <svg
          viewBox="0 0 1350 1299"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-[-0.3rem] -top-3 z-0 h-[3.05rem] text-green-600/50 group-hover:text-green-600/50 dark:text-green-800/50 dark:group-hover:text-green-900 sm:left-[-0.35rem] sm:h-[4.25rem]">
          <g filter="url(#a)">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M672.584 200.031c196.542-1.867 400.156 81.321 461.016 268.293 60.97 187.28-56.41 371.926-214.315 489.564C754.03 1081 534.601 1158.84 366.243 1040.01 192.371 917.287 164.809 676.821 237.744 476.834c65.103-178.51 244.911-274.999 434.84-276.803Z"
              clipRule="evenodd"
            />
          </g>
          <defs>
            {/* <linearGradient
                id="b"
                x1={200}
                x2={1241.37}
                y1={1099}
                y2={643.582}
                gradientUnits="userSpaceOnUse">
                <stop stopColor="currentColor" />
                <stop offset={1} stopColor="currentColor" />
              </linearGradient> */}
            <filter
              id="a"
              width={1350}
              height={1299}
              x={0}
              y={0}
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_3_22"
                stdDeviation={100}
              />
            </filter>
          </defs>
        </svg>
      </div>
      <h1
        className={`ml-1.5 hidden whitespace-nowrap pr-3 font-medium dark:text-green-200/90 lg:inline-block ${
          expanded ? 'text-lg' : ''
        }`}>
        {name}
      </h1>
      {description && (
        <div className="mx-2 mt-2 hidden text-center text-[#14532D] dark:text-green-100/90 lg:inline-block">
          {String(description)}
        </div>
      )}
    </NavLink>
  )
}
