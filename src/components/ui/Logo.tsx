import { Dumbbell } from 'lucide-react'
import { cn } from '@/lib/cn'

type LogoProps = {
  className?: string
  compact?: boolean
}

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-acid text-surface">
        <Dumbbell className="size-5" aria-hidden />
      </span>
      {!compact && <span className="text-xl font-black tracking-tight text-white">Reps</span>}
    </div>
  )
}
