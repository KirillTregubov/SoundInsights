import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'
// import { useLocalStorage } from 'lib/hooks'
import { useToken } from 'lib/tokenContext'

const Root: React.FC<{ children?: JSX.Element }> = ({ children }) => {
  // const [token] = useLocalStorage('token')
  const { token, setToken } = useToken()
  console.log('new token', token)

  return (
    <div id="App">
      <Navbar />
      <div className="my-6 mx-2">{children || <Outlet />}</div>
    </div>
  )
}

export default Root
