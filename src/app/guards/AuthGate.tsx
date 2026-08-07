import { Navigate, Outlet } from 'react-router-dom'
import { PageLoader } from '@/app/PageLoader'
import { useAuthStore } from '@/features/auth/store'

export function AuthGate() {
  const session = useAuthStore((s) => s.session)
  const isLoading = useAuthStore((s) => s.isLoading)

  if (isLoading) return <PageLoader />
  if (!session) return <Navigate to="/login" replace />
  return <Outlet />
}
