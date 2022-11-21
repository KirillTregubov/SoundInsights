import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-0 -mb-9 bg-gradient-to-b from-neutral-900 via-neutral-900 p-2 pb-9">
      <Link to="/" className="z-10 flex items-center gap-2">
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
