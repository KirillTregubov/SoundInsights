import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    try {
      window.scrollTo(0, 0)
    } catch (error) {
      console.error(error)
    }
  }, [pathname])

  return null
}
