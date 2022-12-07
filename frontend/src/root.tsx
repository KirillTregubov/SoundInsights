import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Root: React.FC<{ children?: JSX.Element }> = ({ children }) => {
  return (
    <div id="App">
      <div>{children || <Outlet />}</div>
      <Toaster
        toastOptions={{
          className: 'dark:!bg-neutral-800 dark:!text-neutral-100'
        }}
      />
    </div>
  )
}

export default Root
