import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/Navbar'

const Root: React.FC<{ children?: JSX.Element }> = ({ children }) => {
  return (
    <div id="App">
      <Navbar />
      <div className="my-6 mx-2">{children || <Outlet />}</div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'dark:!bg-neutral-800 dark:!text-neutral-100'
          // duration: 5000,
          // style: {
          //   background: '#363636',
          //   color: '#fff'
          // }
        }}
      />
    </div>
  )
}

export default Root
