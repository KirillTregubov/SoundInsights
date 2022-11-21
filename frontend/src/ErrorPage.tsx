import { Link, useRouteError } from 'react-router-dom'

interface ErrorType {
  status?: number
  statusText?: string
  message?: string
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as ErrorType

  return (
    <div id="error-page">
      <h1 className="font-medium italic">
        {error.status && error.status == 404
          ? 'Error 404: The page you are looking for does not exist.'
          : `Error ${error.status}: ${error.statusText}` ||
            error.message ||
            'Something went wrong.'}
        <Link to="/">Go Home</Link>
      </h1>
    </div>
  )
}

export default ErrorPage
