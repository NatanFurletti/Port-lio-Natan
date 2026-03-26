import type { Project, ProjectCategory } from '@/types'

export function filterByCategory(
  projects: Project[],
  category: ProjectCategory | 'all'
): Project[] {
  if (category === 'all') return projects
  return projects.filter((p) => p.category === category)
}

export function filterBySearch(projects: Project[], query: string): Project[] {
  if (!query.trim()) return projects
  const lower = query.toLowerCase()
  return projects.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.shortDescription.toLowerCase().includes(lower)
  )
}

export function filterProjects(
  projects: Project[],
  category: ProjectCategory | 'all',
  query: string
): Project[] {
  return filterBySearch(filterByCategory(projects, category), query)
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter((p) => p.featured)
}

export function getAvailableCategories(projects: Project[]): ProjectCategory[] {
  const seen = new Set<ProjectCategory>()
  for (const p of projects) seen.add(p.category)
  return Array.from(seen)
}
