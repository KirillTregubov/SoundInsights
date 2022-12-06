import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Navbar from 'components/Navbar'

const Root: React.FC<{ children?: JSX.Element }> = ({ children }) => {
  return (
    <div id="App">
      <div>{children || <Outlet />}</div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'dark:!bg-neutral-800 dark:!text-neutral-100'
        }}
      />
    </div>
  )
}

export default Root
