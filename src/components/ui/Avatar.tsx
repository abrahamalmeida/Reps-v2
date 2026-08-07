import { UserRound } from 'lucide-react'
import { cn } from '@/lib/cn'

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <span
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-full bg-ultra/20 text-xs font-bold text-ultra',
        className,
      )}
    >
      {initials || <UserRound className="size-4" aria-hidden />}
    </span>
  )
}
