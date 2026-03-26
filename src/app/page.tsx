import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { profile } from '@/data/profile'
import { getFeaturedProjects } from '@/data/projects'

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.title}`,
  description: profile.bio,
  openGraph: {
    title: `${profile.name} | ${profile.title}`,
    description: profile.bio,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} | ${profile.title}`,
    description: profile.bio,
  },
}

export default function HomePage() {
  const featuredProjects = getFeaturedProjects()

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <FeaturedProjects projects={featuredProjects} />
    </>
  )
}
