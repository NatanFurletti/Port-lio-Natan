import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes]
}
