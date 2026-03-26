'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProjectCategory } from '@/types'

interface FilterBarProps {
  categories: ProjectCategory[]
  activeCategory: ProjectCategory | 'all'
  searchQuery: string
  onCategoryChange: (cat: ProjectCategory | 'all') => void
  onSearchChange: (q: string) => void
}

export function FilterBar({
  categories,
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none"
          aria-hidden
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects..."
          aria-label="Search projects by title or description"
          className="w-full rounded-lg border border-border bg-card pl-9 pr-4 py-2 text-sm text-fg placeholder:text-muted-fg focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <button
          onClick={() => onCategoryChange('all')}
          className={cn(
            'rounded-full px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
            activeCategory === 'all'
              ? 'bg-accent text-white'
              : 'bg-muted text-muted-fg hover:text-fg'
          )}
          aria-pressed={activeCategory === 'all'}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              'rounded-full px-3 py-1 text-sm font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              activeCategory === cat
                ? 'bg-accent text-white'
                : 'bg-muted text-muted-fg hover:text-fg'
            )}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
