import FeatureList from 'components/FeatureList'

const Index: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-center px-4 md:px-8">
      <div className="relative my-6 mx-auto max-w-[45rem] items-center px-2 sm:px-6 lg:my-16 lg:mb-44 xl:max-w-3xl">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <img
            className="h-24 select-none"
            src="/assets/icon.svg"
            alt="Project logo"
          />
          <div>
            <h1 className="whitespace-pre-wrap text-2xl font-semibold">
              Welcome to the Ez2Type Project
            </h1>
            <h2 className="mt-1 text-lg text-neutral-600 dark:text-neutral-400">
              This is a project that aims to help you discover new music and
              show interesting and meaningful information about Spotify data.
            </h2>
          </div>
        </div>
        <div className="mt-2 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 301 426"
            className="left-20 mr-16 h-40 sm:h-52 lg:absolute lg:-left-32 lg:top-10 xl:-left-36">
            <path
              fill="#191847"
              fillRule="evenodd"
              d="M155.5 27c-11.874 0-21.5 9.626-21.5 21.5v21c0 11.066 8.36 20.179 19.109 21.368l.008.154h29c4.584-4.478.092-33.03-3.355-45.732C177.212 34.938 168.283 27 157.5 27h-2Z"
              clipRule="evenodd"
            />
            <path
              fill="#B28B67"
              fillRule="evenodd"
              d="M156.935 75.244c6.476 3.903 12.839 5.79 15.825 5.02 7.49-1.931 8.178-29.329 2.383-40.13-5.794-10.801-35.585-15.509-37.086 5.892-.521 7.427 2.597 14.055 7.205 19.464L137 104h24l-4.065-28.756Z"
              clipRule="evenodd"
            />
            <path
              fill="#191847"
              fillRule="evenodd"
              d="M134.881 46.15a56.383 56.383 0 0 1 2.04-1.952l-.032-.777S144.421 28 156.001 28c11.57 0 15.229 5.379 18.339 9.95l.009.013c-1.627 5.582-6.53 7.84-12.075 10.395-2.387 1.1-4.893 2.254-7.308 3.752a5.5 5.5 0 1 0-3.216 9.765c1.106 11.878.663 25.442-2.633 28.662h-29c-.832-14.464 2.909-18.59 6.733-22.806 3.597-3.967 7.267-8.014 7.267-20.828.258-.252.513-.504.764-.752Z"
              clipRule="evenodd"
            />
            <path
              fill="#68A1AC"
              fillRule="evenodd"
              d="M98.408 285.088s35.984 10.065 62.092 10.065c26.108 0 48.5-15.5 48.5-15.5s-35.214-10.33-58-10.33-52.592 15.765-52.592 15.765Z"
              clipRule="evenodd"
            />
            <path
              fill="#997659"
              fillRule="evenodd"
              d="M181.267 304.824a5.671 5.671 0 0 1-.582-1.135C177.479 295.208 126.117 203.726 121 187h57.826c3.891 12.717 21.401 92.52 23.865 108.442 7.776 25.115 23.784 106.453 25.828 112.088 2.15 5.928-9.947 12.103-13.17 4.816-5.129-11.596-17.35-43.681-22.792-63.272-5.101-18.366-9.255-34.89-11.29-44.25Z"
              clipRule="evenodd"
            />
            <path
              fill="#B28B67"
              fillRule="evenodd"
              d="M133.957 315.994c-23.482 5.934-109.373 16.664-115.267 18.347-6.064 1.731-11.38-10.767-3.885-13.474 11.925-4.308 44.784-14.261 64.707-18.323 16.024-3.267 30.647-5.933 40.464-7.494-.831-27.577-4.633-93.756-2.141-108.05H169c-2.39 13.707-22.59 113.718-26.344 123.729-1.192 3.573-4.747 5.153-8.699 5.265Z"
              clipRule="evenodd"
            />
            <path
              fill="#E4E4E4"
              fillRule="evenodd"
              d="M16.931 320.074c.278-1.137-.413-2.309-1.566-2.511-2.104-.368-5.238-.807-6.91-.513-2.663.47-7.617 2.259-7.617 2.259l9.794 55.545s7.54.903 7.288-3.863a335.041 335.041 0 0 1-.336-7.932l6.957-27.846a1 1 0 0 0-.756-1.219l-4.318-.95s-2.776-3.963-3.252-6.663c-.29-1.643.25-4.401.716-6.307Zm197.519 90.21c-1.072-.471-2.346.006-2.745 1.107-.728 2.007-1.705 5.018-1.705 6.715 0 2.705.901 7.894.901 7.894h56.402s2.199-7.268-2.538-7.848a333.808 333.808 0 0 1-7.87-1.046l-26.215-11.687a1 1 0 0 0-1.332.532l-1.685 4.088s-4.385 2.046-7.126 2.046c-1.669 0-4.291-1.011-6.087-1.801Z"
              clipRule="evenodd"
            />
            <path
              fill="#89C5CC"
              fillRule="evenodd"
              d="M118 187s33.82-9.676 64 0c7 31.937 24.009 44.613 27 93.579-34 16.894-76-12.049-111 4.426-10-23.044 4-78.54 20-98.005Z"
              clipRule="evenodd"
            />
            <path
              fill="#997659"
              fillRule="evenodd"
              d="M254.483 141.925 215 147.311 222.084 165l32.037-12.701c13.809 1.362 20.486 1.034 20.032-.984-.384-1.702-1.851-2.216-3.203-2.689-1.053-.369-2.036-.713-2.382-1.575-.788-1.968 3.701-6.048 8.125-9.736 4.424-3.688 1.454-4.367-.412-4.312-6.634 1.555-13.9 4.529-21.798 8.922ZM62.398 238.908c2.93-5.945 28.572-82.458 28.572-82.458l21.897.082s-36.017 81.051-37.56 84.874c-2.003 4.966 1.4 12.181 3.71 17.074.356.757.687 1.458.968 2.087-3.203 1.433-4.742-.299-6.364-2.125-1.831-2.063-3.77-4.245-8.333-2.123-1.763.821-3.431 1.79-5.061 2.738-5.63 3.272-10.802 6.279-17.838 1.937-1.115-.688-2.338-3.279.615-5.304 7.358-5.045 17.961-13.875 19.394-16.782Z"
              clipRule="evenodd"
            />
            <path
              fill="#AFB9C5"
              fillRule="evenodd"
              d="m150.949 87 17.145 1.142c4.223 38.201 27.222 62.331 78.717 54.162l6.841 49.195c-48.129 6.22-90.339-13.049-98.99-65.221-2.239-13.505-4.007-27.56-3.713-39.278Z"
              clipRule="evenodd"
            />
            <path
              fill="#C5CFD6"
              fillRule="evenodd"
              d="M65.402 229c11.903-63.336 37.028-112.336 75.374-147h1.701l.014.016 25.977 5.95c0 31.203 6.942 54.519 13.616 76.934 2.882 9.68 5.714 19.193 7.916 29.1h-70.156c-.989 11.351-1.596 23.018-1.912 35h-52.53Z"
              clipRule="evenodd"
            />
            <path
              fill="#000"
              fillOpacity={0.1}
              fillRule="evenodd"
              d="M119.844 194c2.012-23.109 5.605-44.91 11.544-65.402-1.302 21.914-1.663 49.1 2.715 65.402h-14.259Z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 360 441"
            className="h-40 sm:h-52 lg:absolute lg:-right-32 lg:top-6">
            <path
              fill="#D4A181"
              fillRule="evenodd"
              d="M204.065 90.244c-6.476 3.903-12.839 5.79-15.825 5.02-7.49-1.931-8.178-29.329-2.383-40.13 5.794-10.801 35.585-15.509 37.086 5.892.521 7.427-2.597 14.055-7.205 19.464L224 119h-24l4.065-28.756Z"
              clipRule="evenodd"
            />
            <path
              fill="#191847"
              fillRule="evenodd"
              d="M217.582 85.308c3.012-13.402 11.593-22.537 10.283-28.526-1.311-5.99-6.986-7.45-6.986-7.45s-2.936-11.875-18.935-10.102c-15.999 1.774-25.763 8.418-21.546 23.038 3.876 0 8.556-1.402 15.026 1 3.08 1.143 4.406 7.09 4.406 7.09h2.924s4.257-7.057 8.395-5.187 1.881 9.088 1.881 9.088l1.441 11.049h3.111Z"
              clipRule="evenodd"
            />
            <path
              fill="#C5CFD6"
              fillRule="evenodd"
              d="M291 244c8.837 0 16 7.163 16 16v92c0 8.837-7.163 16-16 16H176c-8.837 0-16-7.163-16-16v-92c0-8.837 7.163-16 16-16h115Zm-16 28a4 4 0 0 1 4 4v60a4 4 0 0 1-4 4h-83a4 4 0 0 1-4-4v-60a4 4 0 0 1 4-4h83Z"
              clipRule="evenodd"
            />
            <path
              fill="#D4A181"
              fillRule="evenodd"
              d="M60.841 363c19.716-24.076 33.056-41.925 40.021-53.546 11.925-19.899 21.685-37.606 24.765-44.37 7.345-16.129-16.909-23.681-22.398-16.158C94.921 260.312 77.178 296.143 50 356.417L60.841 363Z"
              clipRule="evenodd"
            />
            <path
              fill="#2F3676"
              fillRule="evenodd"
              d="m101.242 356 36.693-92.363c7.848-16.837-30.051-27.905-35.818-20.069C89.023 261.357 57.901 331.534 54 336.834L101.242 356Z"
              clipRule="evenodd"
            />
            <path
              fill="#D4A181"
              fillRule="evenodd"
              d="M198.967 337.477c-7.148-10.426-33.146-45.503-47.306-60.016-4.069-4.17-8.04-8.173-11.795-11.904-11.162-11.087-33.39 7.549-22.248 17.648 27.747 25.15 68.231 59.102 71.613 62.129 4.741 4.243 14.228-1.305 9.736-7.857Z"
              clipRule="evenodd"
            />
            <path
              fill="#E4E4E4"
              fillRule="evenodd"
              d="M194.336 333.185c.693-.944 2.034-1.168 2.93-.414 1.635 1.375 3.986 3.493 4.835 4.963 1.352 2.342 3.166 7.287 3.166 7.287l-48.845 28.201s-5.538-5.195-1.726-8.065a333.775 333.775 0 0 0 6.292-4.842l16.86-23.228a1 1 0 0 1 1.419-.205l3.503 2.697s4.821-.42 7.195-1.791c1.446-.835 3.211-3.021 4.371-4.603ZM66.55 358.284c1.072-.471 2.346.006 2.745 1.107.728 2.007 1.705 5.018 1.705 6.715 0 2.705-.901 7.894-.901 7.894H13.697s-2.199-7.268 2.538-7.848c4.737-.579 7.87-1.046 7.87-1.046l26.215-11.687a1 1 0 0 1 1.332.532l1.685 4.088s4.385 2.046 7.126 2.046c1.67 0 4.291-1.011 6.087-1.801Z"
              clipRule="evenodd"
            />
            <path
              fill="#5C63AB"
              fillRule="evenodd"
              d="M151.138 268.25s45.745-7.452 61.282-10.192c29.523-5.206 38.132-21.093 33.042-55.756h-54.396c-10.798 3.118-90.233 38.57-90.233 38.57-9.528 4.73-7.754 18.675-6.013 23.27.107.281 48.188 82.571 48.188 82.571l44.498-28.348-36.452-46.775s-1.444-2.908.084-3.34Z"
              clipRule="evenodd"
            />
            <path
              fill="#D4A181"
              fillRule="evenodd"
              d="m115.32 212.635 31.899-23.424 7.051 17.431-31.588 13.099c-8.933 10.494-13.928 14.869-14.986 13.124-.891-1.471-.195-2.848.447-4.116.5-.989.967-1.911.624-2.76-.785-1.94-6.786-1.735-12.472-1.298-5.687.437-4.03-2.093-2.659-3.342 5.805-3.475 13.033-6.379 21.684-8.714Zm167.282 41.273c-2.93-5.945-12.91-63.888-12.91-63.888l-20.897.082s19.354 62.481 20.897 66.304c2.004 4.966-1.4 12.181-3.708 17.074-.357.757-.688 1.458-.969 2.087 3.203 1.433 4.741-.299 6.363-2.125 1.832-2.063 3.771-4.245 8.334-2.123 1.763.821 3.431 1.79 5.061 2.738 5.63 3.272 10.802 6.279 17.838 1.937 1.115-.688 2.338-3.279-.616-5.304-7.357-5.045-17.96-13.875-19.393-16.782Z"
              clipRule="evenodd"
            />
            <path
              fill="#E87613"
              fillRule="evenodd"
              d="m210.305 102.332-8.647-1.483c-32.083 27.715-45.261 80.96-84.587 109.166l9.465 11.733c68.224-8.448 85.134-73.393 83.769-119.416Z"
              clipRule="evenodd"
            />
            <path
              fill="#DDE3E9"
              fillRule="evenodd"
              d="M248 211h-76.511c-3.497 0-2.838-5.048-2.332-7.596 5.832-29.4 28.602-61.092 28.602-102.943L219.828 97c18.255 29.358 24.567 65.505 28.172 114Z"
              clipRule="evenodd"
            />
            <path
              fill="#FF9B21"
              fillRule="evenodd"
              d="M256.603 232c3.439 8.259 6.811 15.465 9.988 21H283c1.765-57.081-19.845-101.004-37.931-127.487 4.015-.287 7.64-1.968 9.931-6.102 8.067-14.555 5.153-22.569-3.467-25.203-4.74-1.448-9.199-.46-14.535.724-4.367.968-9.323 2.067-15.502 2.068h-.006c-.599 0-1.144.04-1.638.117l-7.324.418s-29.733 100.77-16.4 134.465h60.475Z"
              clipRule="evenodd"
            />
            <path
              fill="#000"
              fillOpacity={0.1}
              fillRule="evenodd"
              d="M256.603 232c-4.512-10.836-9.138-23.484-13.59-36.546-1.658 14.385-4.418 28.832-9.013 36.546h22.603Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <FeatureList expanded={true} />
      {/* <div className="flex flex-col gap-2">
        <Link to="/song-recommendations" title="Get Recommendations">
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
      </div> */}
    </div>
  )
}

export default Index
