import { Link, useRouteError } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

interface ErrorType {
  status?: number
  statusText?: string
  message?: string
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as ErrorType

  // console.log(error, error.message)

  const errorMessage =
    (error.statusText && error.statusText.length > 0 && `{error.statusText}`) ||
    error.message ||
    'Something went wrong'

  return (
    <div id="error-page" className="flex flex-col items-center gap-1">
      <h1 className="font-medium italic">
        {error.status && error.status == 404
          ? 'Error 404: The page you are looking for does not exist.'
          : `Error ${error.status}: ` + errorMessage}
      </h1>
      <Link
        to="/"
        className="group mt-1 inline-flex items-center rounded-md bg-neutral-800 py-1 px-1 pl-2 font-medium hover:bg-neutral-700">
        Go Home
        <ChevronRightIcon className="h-4 w-4 transition-transform will-change-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}

export default ErrorPage
