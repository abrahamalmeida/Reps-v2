import {
  Activity,
  Dumbbell,
  LayoutDashboard,
  LineChart,
  UserRound,
  type LucideIcon,
} from 'lucide-react'

export const NAV_ITEMS: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/rutinas', label: 'Rutinas', icon: Dumbbell },
  { to: '/ejercicios', label: 'Ejercicios', icon: Activity },
  { to: '/progreso', label: 'Progreso', icon: LineChart },
  { to: '/perfil', label: 'Perfil', icon: UserRound },
]
