import { Link } from 'react-router-dom'

const Index: React.FC = () => {
  return (
    <>
      <div>
        <Link to="/get-recommendations" title="Get Recommendations">
          Get recommendations based on tracks
        </Link>
      </div>
    </>
  )
}

export default Index
