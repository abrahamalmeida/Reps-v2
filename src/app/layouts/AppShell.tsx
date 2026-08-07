import { NavLink, Outlet } from 'react-router-dom'
import { UserRound } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Logo } from '@/components/ui/Logo'
import { NAV_ITEMS } from './nav'

function navLinkClass(isActive: boolean) {
  return cn(
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
    isActive
      ? 'bg-surface-3 text-acid'
      : 'text-slate-400 hover:bg-surface-3/60 hover:text-slate-200',
  )
}

export function AppShell() {
  return (
    <div className="min-h-screen">
      {/* Sidebar escritorio */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-surface-2/60 px-4 py-6 md:flex">
        <Logo />
        <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Navegación principal">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => navLinkClass(isActive)}>
              <Icon className="size-4.5 shrink-0" aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3 rounded-lg border border-line bg-surface-3/50 px-3 py-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-ultra/20 text-ultra">
            <UserRound className="size-4" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-200">Invita</p>
            <p className="truncate text-xs text-slate-500">tu cuenta</p>
          </div>
        </div>
      </aside>

      {/* Header móvil */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-surface/80 px-4 py-3 backdrop-blur md:hidden">
        <Logo compact />
        <span className="text-sm font-semibold text-slate-400">v2</span>
      </header>

      {/* Contenido */}
      <main className="md:pl-64">
        <div className="mx-auto w-full max-w-5xl px-4 py-6 pb-24 md:px-8 md:py-10 md:pb-10">
          <Outlet />
        </div>
      </main>

      {/* Bottom nav móvil */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface-2/90 backdrop-blur md:hidden"
        aria-label="Navegación principal"
      >
        <div className="grid grid-cols-5">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors',
                  isActive ? 'text-acid' : 'text-slate-500',
                )
              }
            >
              <Icon className="size-5" aria-hidden />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
