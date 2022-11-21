import { QueryClientProvider } from '@tanstack/react-query'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { queryClient, routes } from 'lib/router'

export const Main: React.FC<{ route?: string }> = ({ route = '/' }) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [route]
  })

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
