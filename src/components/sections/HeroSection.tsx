'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { fadeInUp, staggerContainer, reducedMotionVariants } from '@/lib/animations'
import type { DeveloperProfile } from '@/types'

interface HeroSectionProps {
  profile: DeveloperProfile
}

export function HeroSection({ profile }: HeroSectionProps) {
  const shouldReduce = useReducedMotion()
  const variants = shouldReduce ? reducedMotionVariants : fadeInUp
  const container = shouldReduce ? reducedMotionVariants : staggerContainer

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:py-32">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <motion.p variants={variants} className="text-accent font-mono text-sm">
          Hello, I&apos;m
        </motion.p>
        <motion.h1 variants={variants} className="text-4xl sm:text-6xl font-bold tracking-tight">
          {profile.name}
        </motion.h1>
        <motion.p variants={variants} className="text-xl sm:text-2xl text-muted-fg font-medium">
          {profile.title}
        </motion.p>
        <motion.div variants={variants} className="flex flex-wrap gap-3 pt-2">
          <Button asChild size="lg">
            <Link href="/projects">
              View Projects <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <Github size={16} /> GitHub
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
