import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { PageLoader } from '@/app/PageLoader'
import { useAuthStore } from '@/features/auth/store'

export function GuestOnly({ children }: { children: ReactNode }) {
  const session = useAuthStore((s) => s.session)
  const isLoading = useAuthStore((s) => s.isLoading)

  if (isLoading) return <PageLoader />
  if (session) return <Navigate to="/dashboard" replace />
  return children
}
