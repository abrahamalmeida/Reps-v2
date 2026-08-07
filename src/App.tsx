import { RouterProvider } from 'react-router-dom'
import { AppProviders } from '@/app/providers'
import { SessionManager } from '@/features/auth/session-manager'
import { router } from '@/app/router'

export default function App() {
  return (
    <AppProviders>
      <SessionManager />
      <RouterProvider router={router} />
    </AppProviders>
  )
}
