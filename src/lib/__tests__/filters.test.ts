import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import {
  filterByCategory,
  filterBySearch,
  filterProjects,
  getFeaturedProjects,
  getAvailableCategories,
} from '../filters'
import type { Project, ProjectCategory } from '@/types'

const VALID_CATEGORIES: ProjectCategory[] = ['web', 'mobile', 'backend', 'fullstack', 'data', 'other']

const arbitraryProject = (): fc.Arbitrary<Project> =>
  fc.record({
    id: fc.uuid(),
    slug: fc.stringMatching(/^[a-z]{3,10}$/),
    title: fc.string({ minLength: 1, maxLength: 60 }),
    shortDescription: fc.string({ minLength: 1, maxLength: 150 }),
    fullDescription: fc.string({ minLength: 1 }),
    technologies: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
    category: fc.constantFrom(...VALID_CATEGORIES),
    featured: fc.boolean(),
    status: fc.string({ minLength: 1 }),
    video: fc.record({ type: fc.constant('none' as const) }),
    links: fc.constant({}),
    thumbnail: fc.webUrl(),
    createdAt: fc.date().map((d) => d.toISOString()),
  })

// --- Property 5 ---
describe('Property 5: Filtro de categoria retorna somente projetos da categoria selecionada', () => {
  it('returns only projects matching the selected category', () => {
    fc.assert(
      fc.property(
        fc.array(arbitraryProject(), { minLength: 0, maxLength: 20 }),
        fc.constantFrom(...VALID_CATEGORIES),
        (projects, category) => {
          const result = filterByCategory(projects, category)
          expect(result.every((p) => p.category === category)).toBe(true)
          // No project from another category should appear
          const others = projects.filter((p) => p.category !== category)
          for (const other of others) {
            expect(result).not.toContainEqual(other)
          }
        }
      ),
      { numRuns: 100 }
    )
  })
})

// --- Property 6 ---
describe('Property 6: Busca case-insensitive cobre title e shortDescription', () => {
  it('returns exactly projects matching the query case-insensitively', () => {
    fc.assert(
      fc.property(
        fc.array(arbitraryProject(), { minLength: 0, maxLength: 20 }),
        fc.string({ minLength: 1, maxLength: 10 }),
        (projects, query) => {
          const result = filterBySearch(projects, query)
          const lower = query.toLowerCase()
          // All returned projects must match
          expect(
            result.every(
              (p) =>
                p.title.toLowerCase().includes(lower) ||
                p.shortDescription.toLowerCase().includes(lower)
            )
          ).toBe(true)
          // No non-matching project should appear
          const nonMatching = projects.filter(
            (p) =>
              !p.title.toLowerCase().includes(lower) &&
              !p.shortDescription.toLowerCase().includes(lower)
          )
          for (const nm of nonMatching) {
            expect(result).not.toContainEqual(nm)
          }
        }
      ),
      { numRuns: 100 }
    )
  })
})

// --- Property 7 ---
describe('Property 7: Filtros combinados aplicam interseção', () => {
  it('combined filter equals intersection of individual filters', () => {
    fc.assert(
      fc.property(
        fc.array(arbitraryProject(), { minLength: 0, maxLength: 20 }),
        fc.constantFrom(...VALID_CATEGORIES),
        fc.string({ minLength: 0, maxLength: 10 }),
        (projects, category, query) => {
          const combined = filterProjects(projects, category, query)
          const byCat = filterByCategory(projects, category)
          const intersection = filterBySearch(byCat, query)
          expect(combined).toEqual(intersection)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// --- Property 8 ---
describe('Property 8: getFeaturedProjects retorna somente projetos featured', () => {
  it('returns only projects where featured === true', () => {
    fc.assert(
      fc.property(
        fc.array(arbitraryProject(), { minLength: 0, maxLength: 20 }),
        (projects) => {
          const result = getFeaturedProjects(projects)
          expect(result.every((p) => p.featured === true)).toBe(true)
          const nonFeatured = projects.filter((p) => !p.featured)
          for (const nf of nonFeatured) {
            expect(result).not.toContainEqual(nf)
          }
        }
      ),
      { numRuns: 100 }
    )
  })
})

// --- Property 9 ---
describe('Property 9: getAvailableCategories corresponde às categorias presentes nos dados', () => {
  it('returns exactly the distinct categories present in the project list', () => {
    fc.assert(
      fc.property(
        fc.array(arbitraryProject(), { minLength: 0, maxLength: 20 }),
        (projects) => {
          const result = getAvailableCategories(projects)
          const expected = Array.from(new Set(projects.map((p) => p.category)))
          expect(result.sort()).toEqual(expected.sort())
        }
      ),
      { numRuns: 100 }
    )
  })
})
