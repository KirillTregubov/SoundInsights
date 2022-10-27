import { useQuery } from '@tanstack/react-query'

import { getDemoQuery } from 'lib/api'
import Loading from 'components/Loading'

const Fetch: React.FC = () => {
  const { data, dataUpdatedAt, isLoading, isError, error } = useQuery(
    ['db-demo'],
    getDemoQuery
  )

  if (isLoading)
    return (
      <div className="my-2 rounded-lg bg-gray-200 p-4">
        <h1 className="font-semibold ">Fetch data from backend</h1>
        <Loading className="mt-1 h-7 w-7 text-gray-700" />
      </div>
    )
  if (isError)
    return (
      <div className="my-2 rounded-lg bg-gray-200 p-4">
        <h1 className="font-semibold ">Fetch data from backend</h1>
        <div>
          <pre>{error?.toString()}</pre>
        </div>
      </div>
    )

  return (
    <div className="my-2 rounded-lg bg-gray-200 p-4">
      <h1 className="font-semibold ">Fetch data from backend</h1>
      <div>
        Data: <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

      <h4 className="mt-1 text-sm text-gray-900">
        Received at {new Date(dataUpdatedAt).toLocaleString()}
      </h4>
    </div>
  )
}

export default Fetch
