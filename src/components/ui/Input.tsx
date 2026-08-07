import { forwardRef, type ComponentProps } from 'react'
import { cn } from '@/lib/cn'

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'h-10 w-full rounded-lg border border-line bg-surface-3 px-3 text-sm text-slate-100',
        'placeholder:text-slate-500',
        'focus:border-acid/60 focus:outline-none focus:ring-2 focus:ring-acid/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = 'Input'
