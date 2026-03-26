import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  featured?: boolean
  className?: string
}

export function Card({ children, featured = false, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 transition-colors',
        featured && 'border-accent/30 bg-accent/5',
        className
      )}
    >
      {children}
    </div>
  )
}
