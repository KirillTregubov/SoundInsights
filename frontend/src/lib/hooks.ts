import { useEffect, useCallback, useState } from 'react'

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
