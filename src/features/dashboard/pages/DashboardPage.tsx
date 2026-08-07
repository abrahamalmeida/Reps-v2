import { Flame, ListChecks, Timer, TrendingUp, type LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'

type StatCardProps = {
  label: string
  value: string
  hint: string
  icon: LucideIcon
  tone: string
}

function StatCard({ label, value, hint, icon: Icon, tone }: StatCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
        <span className={cn('grid size-8 shrink-0 place-items-center rounded-lg', tone)}>
          <Icon className="size-4" aria-hidden />
        </span>
      </div>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{hint}</p>
    </Card>
  )
}

export default function DashboardPage() {
  const today = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Buenas, athleta</h1>
        <p className="mt-1 text-sm text-slate-400">{today}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Racha"
          value="—"
          hint="días seguidos"
          icon={Flame}
          tone="bg-ember/15 text-ember"
        />
        <StatCard
          label="Series hoy"
          value="—"
          hint="por registrar"
          icon={ListChecks}
          tone="bg-acid/15 text-acid"
        />
        <StatCard
          label="Volumen"
          value="—"
          hint="kg movidos"
          icon={TrendingUp}
          tone="bg-ultra/15 text-ultra"
        />
        <StatCard
          label="Tiempo"
          value="—"
          hint="minutos activos"
          icon={Timer}
          tone="bg-rose/15 text-rose"
        />
      </div>

      <Card className="p-6">
        <h2 className="font-semibold text-white">Entrenamiento de hoy</h2>
        <p className="mt-1 text-sm text-slate-400">
          Conecta tu cuenta y crea tu primera rutina para ver tu plan del día.
        </p>
      </Card>
    </div>
  )
}
