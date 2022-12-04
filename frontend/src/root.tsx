import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'

const Root: React.FC<{ children?: JSX.Element }> = ({ children }) => {
  return (
    <div id="App">
      <Navbar />
      <div className="my-6 mx-2">{children || <Outlet />}</div>
    </div>
  )
}

export default Root
