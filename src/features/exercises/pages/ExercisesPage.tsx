import { Search } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

export default function ExercisesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Gimnasio de ejercicios</h1>
        <p className="mt-1 text-sm text-slate-400">
          1.300+ ejercicios con vídeo y animación, listos para tu rutina.
        </p>
      </header>

      <Card className="p-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
            aria-hidden
          />
          <Input
            className="pl-9"
            placeholder="Buscar por nombre, músculo o equipo…"
            aria-label="Buscar ejercicios"
          />
        </div>
      </Card>

      <Card className="grid place-items-center gap-4 p-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-surface-3 text-slate-400">
          <Search className="size-6" aria-hidden />
        </span>
        <div>
          <p className="font-semibold text-slate-200">El catálogo llega en una fase próxima</p>
          <p className="mt-1 text-sm text-slate-500">
            Con 1.300+ ejercicios en MP4/WebP, buscador y filtros por grupo muscular.
          </p>
        </div>
      </Card>
    </div>
  )
}
