import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'

import './index.css'
import { queryClient, routes } from 'lib/router'
import { TokenProvider } from 'lib/tokenContext'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <RouterProvider router={router} />
      </TokenProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
