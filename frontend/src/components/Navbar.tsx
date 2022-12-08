import { Link } from 'react-router-dom'

// import UserLogin from 'components/UserLogin'

const Navbar: React.FC = () => {
  return (
    <nav className="pointer-events-none sticky top-0 z-20 -mb-6 flex w-full items-center bg-gradient-to-b from-neutral-50 via-neutral-50 p-2 pb-6 dark:from-neutral-900 dark:via-neutral-900">
      <Link to="/" className="pointer-events-auto z-10 flex items-center gap-2">
        <img
          className="h-7 w-7 select-none"
          src="/assets/icon.svg"
          alt="Project logo"
        />
        <h1 className="font-semibold">Team Ez2Type</h1>
      </Link>
      {/* NOTE: We sunset this feature due to issues with Account Authorization
      <div className="pointer-events-auto ml-auto">
        <UserLogin />
      </div> */}
    </nav>
  )
}

export default Navbar
