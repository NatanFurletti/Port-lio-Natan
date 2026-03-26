'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ProjectCard } from '@/components/ProjectCard'
import { Button } from '@/components/ui/Button'
import { staggerContainer, fadeInUp, reducedMotionVariants } from '@/lib/animations'
import type { Project } from '@/types'

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const shouldReduce = useReducedMotion()
  const container = shouldReduce ? reducedMotionVariants : staggerContainer
  const item = shouldReduce ? reducedMotionVariants : fadeInUp

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Featured Projects</h2>
        <Button asChild variant="ghost" size="sm">
          <Link href="/projects">
            All projects <ArrowRight size={14} />
          </Link>
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 gap-6"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={item}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
