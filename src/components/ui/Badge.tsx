import { cn } from '@/lib/utils'

type BadgeVariant = 'tech' | 'category' | 'status'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  tech: 'bg-muted text-muted-fg font-mono text-xs',
  category: 'bg-accent/10 text-accent text-xs font-medium',
  status: 'bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium',
}

export function Badge({ label, variant = 'tech', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5',
        variantClasses[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
