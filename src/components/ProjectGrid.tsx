'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ProjectCard } from '@/components/ProjectCard'
import { FilterBar } from '@/components/FilterBar'
import { filterProjects, getAvailableCategories } from '@/lib/filters'
import { staggerContainer, fadeInUp, reducedMotionVariants } from '@/lib/animations'
import type { Project, ProjectCategory } from '@/types'

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const shouldReduce = useReducedMotion()

  const categories = getAvailableCategories(projects)
  const filtered = filterProjects(projects, activeCategory, searchQuery)

  const container = shouldReduce ? reducedMotionVariants : staggerContainer
  const item = shouldReduce ? reducedMotionVariants : fadeInUp

  return (
    <div className="flex flex-col gap-8">
      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchQuery}
      />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
          <p className="text-lg font-medium">No projects found</p>
          <p className="text-sm text-muted-fg">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <motion.div
          key={`${activeCategory}-${searchQuery}`}
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <motion.div key={project.id} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
