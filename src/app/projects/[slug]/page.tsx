import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { VideoPlayer } from '@/components/VideoPlayer'
import { ProjectLinks } from '@/components/ProjectLinks'
import { Badge } from '@/components/ui/Badge'
import { projects, getProjectBySlug } from '@/data/projects'
import { profile } from '@/data/profile'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | ${profile.name}`,
      description: project.shortDescription,
      images: [{ url: project.thumbnail, width: 800, height: 450 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | ${profile.name}`,
      description: project.shortDescription,
    },
  }
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-fg hover:text-fg transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
      >
        <ArrowLeft size={14} /> Back to projects
      </Link>

      <article>
        <header className="mb-8 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge label={project.category} variant="category" />
            <Badge label={project.status} variant="status" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">{project.title}</h1>
          <p className="text-lg text-muted-fg">{project.shortDescription}</p>
          <ProjectLinks links={project.links} title={project.title} />
        </header>

        {project.video.type !== 'none' && (
          <div className="mb-8">
            <VideoPlayer
              video={project.video}
              title={`${project.title} demo video`}
              projectUrl={project.links.live}
            />
          </div>
        )}

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">About this project</h2>
          <p className="text-muted-fg leading-relaxed whitespace-pre-line">
            {project.fullDescription}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} label={tech} variant="tech" />
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
