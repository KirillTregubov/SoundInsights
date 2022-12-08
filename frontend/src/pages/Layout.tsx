import Navbar from 'components/Navbar'
import FeatureList from 'components/FeatureList'
import ScrollToTop from 'src/components/ScrollToTop'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="my-6 mx-4 mb-28">{children}</div>
      <div className="fixed bottom-0 w-full p-3 px-2 sm:px-4 sm:pb-4">
        <FeatureList />
      </div>
    </>
  )
}

export default Layout
