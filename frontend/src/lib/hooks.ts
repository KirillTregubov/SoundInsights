import { useEffect, useState, useCallback } from 'react'

export const useDebounce = (
  effect: any,
  deps: React.DependencyList,
  delay = 250
) => {
  const callback = useCallback(effect, [...deps, effect])

  useEffect(() => {
    const timeout = setTimeout(callback, delay)
    return () => clearTimeout(timeout)
  }, [callback, delay])
}

export const useDelay = (delay = 500) => {
  const [delayed, setDelayed] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), delay)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (callback) => !delayed && callback()
}
