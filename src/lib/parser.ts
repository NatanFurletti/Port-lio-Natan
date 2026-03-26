import type { Project, ProjectCategory, ProjectVideo, ProjectLinks } from '@/types'

const VALID_CATEGORIES: ProjectCategory[] = ['web', 'mobile', 'backend', 'fullstack', 'data', 'other']
const VALID_VIDEO_TYPES = ['youtube', 'vimeo', 'local', 'none'] as const

function assertString(value: unknown, field: string, context?: string): string {
  if (typeof value !== 'string') {
    const ctx = context ? ` in project "${context}"` : ''
    throw new Error(`Missing required field "${field}"${ctx}`)
  }
  return value
}

function assertStringArray(value: unknown, field: string, context?: string): string[] {
  if (!Array.isArray(value) || !value.every((v) => typeof v === 'string')) {
    const ctx = context ? ` in project "${context}"` : ''
    throw new Error(`Missing required field "${field}"${ctx}`)
  }
  return value as string[]
}

function assertBoolean(value: unknown, field: string, context?: string): boolean {
  if (typeof value !== 'boolean') {
    const ctx = context ? ` in project "${context}"` : ''
    throw new Error(`Missing required field "${field}"${ctx}`)
  }
  return value
}

function parseVideo(raw: unknown, slug: string): ProjectVideo {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error(`Missing required field "video" in project "${slug}"`)
  }
  const obj = raw as Record<string, unknown>
  const type = obj['type']
  if (!VALID_VIDEO_TYPES.includes(type as (typeof VALID_VIDEO_TYPES)[number])) {
    throw new Error(
      `Invalid video.type "${type}" in project "${slug}". Expected one of: ${VALID_VIDEO_TYPES.join(', ')}`
    )
  }
  const video: ProjectVideo = { type: type as ProjectVideo['type'] }
  if (typeof obj['url'] === 'string') {
    video.url = obj['url']
  }
  return video
}

function parseLinks(raw: unknown): ProjectLinks {
  if (typeof raw !== 'object' || raw === null) return {}
  const obj = raw as Record<string, unknown>
  const links: ProjectLinks = {}
  if (typeof obj['live'] === 'string') links.live = obj['live']
  if (typeof obj['github'] === 'string') links.github = obj['github']
  if (typeof obj['caseStudy'] === 'string') links.caseStudy = obj['caseStudy']
  return links
}

export function parseProject(raw: unknown): Project {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error('Missing required field "id" in project')
  }
  const obj = raw as Record<string, unknown>

  const id = assertString(obj['id'], 'id')
  const slug = assertString(obj['slug'], 'slug', id)
  const title = assertString(obj['title'], 'title', slug)
  const shortDescription = assertString(obj['shortDescription'], 'shortDescription', slug)
  const fullDescription = assertString(obj['fullDescription'], 'fullDescription', slug)
  const technologies = assertStringArray(obj['technologies'], 'technologies', slug)
  const featured = assertBoolean(obj['featured'], 'featured', slug)
  const status = assertString(obj['status'], 'status', slug)
  const thumbnail = assertString(obj['thumbnail'], 'thumbnail', slug)
  const createdAt = assertString(obj['createdAt'], 'createdAt', slug)

  const category = obj['category']
  if (!VALID_CATEGORIES.includes(category as ProjectCategory)) {
    throw new Error(
      `Invalid category "${category}" in project "${slug}". Expected one of: ${VALID_CATEGORIES.join(', ')}`
    )
  }

  const video = parseVideo(obj['video'], slug)
  const links = parseLinks(obj['links'])

  return {
    id,
    slug,
    title,
    shortDescription,
    fullDescription,
    technologies,
    category: category as ProjectCategory,
    featured,
    status,
    video,
    links,
    thumbnail,
    createdAt,
  }
}

export function serializeProject(project: Project): Record<string, unknown> {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    fullDescription: project.fullDescription,
    technologies: [...project.technologies],
    category: project.category,
    featured: project.featured,
    status: project.status,
    video: { ...project.video },
    links: { ...project.links },
    thumbnail: project.thumbnail,
    createdAt: project.createdAt,
  }
}

export function parseProjects(raw: unknown[]): Project[] {
  return raw.map((item) => parseProject(item))
}
