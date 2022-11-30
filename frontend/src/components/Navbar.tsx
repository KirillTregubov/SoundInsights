import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav className="pointer-events-none sticky top-0 z-10 -mb-6 bg-gradient-to-b from-neutral-900 via-neutral-900 p-2 pb-6">
      <Link to="/" className="pointer-events-auto z-10 flex items-center gap-2">
        <img
          className="h-7 w-7 select-none"
          src="/assets/icon.svg"
          alt="Project logo"
        />
        <h1 className="font-semibold">Team Ez2Type</h1>
      </Link>
    </nav>
  )
}

export default Navbar
