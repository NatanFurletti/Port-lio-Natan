import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { parseProject, serializeProject } from '../parser'
import type { Project, ProjectCategory, ProjectVideo } from '@/types'

const VALID_CATEGORIES: ProjectCategory[] = ['web', 'mobile', 'backend', 'fullstack', 'data', 'other']
const VALID_VIDEO_TYPES = ['youtube', 'vimeo', 'local', 'none'] as const

// Arbitrary for a valid ProjectVideo
const arbitraryVideo = (): fc.Arbitrary<ProjectVideo> =>
  fc.oneof(
    fc.record({ type: fc.constant('none' as const) }),
    fc.record({ type: fc.constantFrom('youtube' as const, 'vimeo' as const, 'local' as const), url: fc.webUrl() })
  )

// Arbitrary for a valid Project
const arbitraryProject = (): fc.Arbitrary<Project> =>
  fc.record({
    id: fc.uuid(),
    slug: fc.stringMatching(/^[a-z0-9-]{3,30}$/),
    title: fc.string({ minLength: 1, maxLength: 80 }),
    shortDescription: fc.string({ minLength: 1, maxLength: 200 }),
    fullDescription: fc.string({ minLength: 1, maxLength: 2000 }),
    technologies: fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
    category: fc.constantFrom(...VALID_CATEGORIES),
    featured: fc.boolean(),
    status: fc.string({ minLength: 1, maxLength: 30 }),
    video: arbitraryVideo(),
    links: fc.record(
      { live: fc.webUrl(), github: fc.webUrl(), caseStudy: fc.webUrl() },
      { requiredKeys: [] }
    ),
    thumbnail: fc.webUrl(),
    createdAt: fc.date().map((d) => d.toISOString()),
  })

// --- Unit tests ---

describe('parseProject', () => {
  it('accepts a valid project object', () => {
    const raw = {
      id: '1',
      slug: 'my-project',
      title: 'My Project',
      shortDescription: 'Short',
      fullDescription: 'Full',
      technologies: ['React'],
      category: 'web',
      featured: true,
      status: 'completed',
      video: { type: 'none' },
      links: {},
      thumbnail: 'https://example.com/thumb.png',
      createdAt: '2024-01-01',
    }
    expect(() => parseProject(raw)).not.toThrow()
  })

  it('throws on missing required field', () => {
    expect(() => parseProject({ id: '1', slug: 'x' })).toThrow()
  })

  it('throws descriptive error for invalid video.type', () => {
    const raw = {
      id: '1', slug: 'x', title: 'T', shortDescription: 'S', fullDescription: 'F',
      technologies: ['A'], category: 'web', featured: false, status: 'done',
      video: { type: 'stream' }, links: {}, thumbnail: 'https://x.com/t.png', createdAt: '2024-01-01',
    }
    expect(() => parseProject(raw)).toThrow(/video\.type/)
    expect(() => parseProject(raw)).toThrow(/stream/)
  })

  it('throws descriptive error for invalid category', () => {
    const raw = {
      id: '1', slug: 'x', title: 'T', shortDescription: 'S', fullDescription: 'F',
      technologies: ['A'], category: 'game', featured: false, status: 'done',
      video: { type: 'none' }, links: {}, thumbnail: 'https://x.com/t.png', createdAt: '2024-01-01',
    }
    expect(() => parseProject(raw)).toThrow(/category/)
    expect(() => parseProject(raw)).toThrow(/game/)
  })
})

// --- Property tests ---

describe('Property 1: Parser rejeita campos obrigatórios ausentes', () => {
  const REQUIRED_FIELDS = [
    'id', 'slug', 'title', 'shortDescription', 'fullDescription',
    'technologies', 'category', 'featured', 'status', 'video', 'thumbnail', 'createdAt',
  ]

  it('throws when any required field is missing', () => {
    fc.assert(
      fc.property(
        arbitraryProject(),
        fc.constantFrom(...REQUIRED_FIELDS),
        (project, field) => {
          const raw = serializeProject(project) as Record<string, unknown>
          delete raw[field]
          expect(() => parseProject(raw)).toThrow()
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Property 2: Parser rejeita video.type inválido com erro descritivo', () => {
  it('throws error mentioning video.type and the invalid value', () => {
    const invalidVideoType = fc.string({ minLength: 1 }).filter(
      (s) => !(VALID_VIDEO_TYPES as readonly string[]).includes(s)
    )
    fc.assert(
      fc.property(arbitraryProject(), invalidVideoType, (project, badType) => {
        const raw = serializeProject(project) as Record<string, unknown>
        raw['video'] = { type: badType }
        let error: Error | null = null
        try { parseProject(raw) } catch (e) { error = e as Error }
        expect(error).not.toBeNull()
        expect(error!.message).toMatch(/video\.type/)
        expect(error!.message).toContain(badType)
      }),
      { numRuns: 100 }
    )
  })
})

describe('Property 3: Parser rejeita category inválida com erro descritivo', () => {
  it('throws error mentioning category and the invalid value', () => {
    const invalidCategory = fc.string({ minLength: 1 }).filter(
      (s) => !(VALID_CATEGORIES as string[]).includes(s)
    )
    fc.assert(
      fc.property(arbitraryProject(), invalidCategory, (project, badCat) => {
        const raw = serializeProject(project) as Record<string, unknown>
        raw['category'] = badCat
        let error: Error | null = null
        try { parseProject(raw) } catch (e) { error = e as Error }
        expect(error).not.toBeNull()
        expect(error!.message).toMatch(/category/)
        expect(error!.message).toContain(badCat)
      }),
      { numRuns: 100 }
    )
  })
})

describe('Property 4: Round-trip de serialização de Project', () => {
  it('parse(serialize(project)) equals original project', () => {
    fc.assert(
      fc.property(arbitraryProject(), (project) => {
        const serialized = serializeProject(project)
        const reparsed = parseProject(serialized)
        expect(reparsed).toEqual(project)
      }),
      { numRuns: 100 }
    )
  })
})
