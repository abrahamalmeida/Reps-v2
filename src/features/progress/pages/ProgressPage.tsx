import { LineChart } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Progreso</h1>
        <p className="mt-1 text-sm text-slate-400">Sigue tu evolución con gráficas y métricas.</p>
      </header>

      <Card className="grid place-items-center gap-4 p-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-surface-3 text-slate-400">
          <LineChart className="size-6" aria-hidden />
        </span>
        <div>
          <p className="font-semibold text-slate-200">Aún no hay datos que mostrar</p>
          <p className="mt-1 text-sm text-slate-500">
            Registra tus series y aquí verás tu volumen, rachas y récords.
          </p>
        </div>
      </Card>
    </div>
  )
}
