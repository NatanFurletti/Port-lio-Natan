import { ExternalLink, Github, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { ProjectLinks as ProjectLinksType } from '@/types'

interface ProjectLinksProps {
  links: ProjectLinksType
  title: string
}

export function ProjectLinks({ links, title }: ProjectLinksProps) {
  if (!links.live && !links.github && !links.caseStudy) return null

  return (
    <div className="flex flex-wrap gap-3">
      {links.live && (
        <Button asChild variant="primary" size="sm">
          <a
            href={links.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} live demo`}
          >
            <ExternalLink size={14} /> Live Demo
          </a>
        </Button>
      )}
      {links.github && (
        <Button asChild variant="outline" size="sm">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} source code on GitHub`}
          >
            <Github size={14} /> Source Code
          </a>
        </Button>
      )}
      {links.caseStudy && (
        <Button asChild variant="ghost" size="sm">
          <a
            href={links.caseStudy}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read ${title} case study`}
          >
            <BookOpen size={14} /> Case Study
          </a>
        </Button>
      )}
    </div>
  )
}
