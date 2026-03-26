'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { cardHover, reducedMotionVariants } from '@/lib/animations'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const shouldReduce = useReducedMotion()
  const hoverVariants = shouldReduce ? reducedMotionVariants : cardHover

  return (
    <motion.div
      variants={hoverVariants}
      initial="rest"
      whileHover="hover"
      className="group rounded-xl border border-border bg-card overflow-hidden transition-colors hover:bg-card-hover"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        aria-label={`View details for ${project.title}`}
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={project.thumbnail}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-fg leading-tight">{project.title}</h3>
            <Badge label={project.category} variant="category" />
          </div>
          <p className="text-sm text-muted-fg line-clamp-2">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} label={tech} variant="tech" />
            ))}
            {project.technologies.length > 4 && (
              <Badge label={`+${project.technologies.length - 4}`} variant="tech" />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
