export type ProjectCategory = 'web' | 'mobile' | 'backend' | 'fullstack' | 'data' | 'other'

export interface ProjectVideo {
  type: 'youtube' | 'vimeo' | 'local' | 'none'
  url?: string
}

export interface ProjectLinks {
  live?: string
  github?: string
  caseStudy?: string
}

export interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  technologies: string[]
  category: ProjectCategory
  featured: boolean
  status: string
  video: ProjectVideo
  links: ProjectLinks
  thumbnail: string
  createdAt: string
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface SocialLinks {
  github: string
  linkedin: string
  email: string
  twitter?: string
  portfolio?: string
}

export interface DeveloperProfile {
  name: string
  title: string
  bio: string
  location: string
  availableForWork: boolean
  skills: SkillCategory[]
  social: SocialLinks
  resumeUrl?: string
}
