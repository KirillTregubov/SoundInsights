/* SVG by Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL */
interface LoadingProps {
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ className }) => {
  return (
    <svg
      className={`inline-block h-7 w-7 animate-spin text-neutral-700 dark:text-neutral-400${
        className ? ` ${className}` : ''
      }`}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem">
      <defs>
        <linearGradient
          x1="8.042%"
          y1="0%"
          x2="65.682%"
          y2="23.865%"
          id="loading">
          <stop stopColor="currentColor" stopOpacity="0" offset="0%" />
          <stop stopColor="currentColor" stopOpacity=".631" offset="63.146%" />
          <stop stopColor="currentColor" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            stroke="url(#loading)"
            strokeWidth="2"></path>
        </g>
      </g>
    </svg>
  )
}

export default Loading
