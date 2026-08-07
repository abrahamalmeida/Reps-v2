import { Outlet } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-10">
      <Logo />
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  )
}
