import { Dumbbell, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function WorkoutsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Rutinas</h1>
          <p className="mt-1 text-sm text-slate-400">Crea y gestiona tus entrenamientos.</p>
        </div>
        <Button>
          <Plus className="size-4" aria-hidden />
          Nueva rutina
        </Button>
      </header>

      <Card className="grid place-items-center gap-4 p-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-surface-3 text-slate-400">
          <Dumbbell className="size-6" aria-hidden />
        </span>
        <div>
          <p className="font-semibold text-slate-200">Todavía no tienes rutinas</p>
          <p className="mt-1 text-sm text-slate-500">Tu primer entrenamiento empieza aquí.</p>
        </div>
      </Card>
    </div>
  )
}
