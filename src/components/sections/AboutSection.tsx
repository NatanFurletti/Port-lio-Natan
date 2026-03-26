'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { fadeInUp, staggerContainer, reducedMotionVariants } from '@/lib/animations'
import type { DeveloperProfile } from '@/types'

interface AboutSectionProps {
  profile: DeveloperProfile
}

export function AboutSection({ profile }: AboutSectionProps) {
  const shouldReduce = useReducedMotion()
  const variants = shouldReduce ? reducedMotionVariants : fadeInUp
  const container = shouldReduce ? reducedMotionVariants : staggerContainer

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 border-t border-border">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col gap-8"
      >
        <motion.h2 variants={variants} className="text-2xl font-bold">
          About Me
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-8">
          <motion.div variants={variants} className="flex flex-col gap-4">
            <p className="text-muted-fg leading-relaxed">{profile.bio}</p>
            <div className="flex items-center gap-2 text-sm text-muted-fg">
              <MapPin size={14} />
              <span>{profile.location}</span>
            </div>
            {profile.availableForWork && (
              <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-sm text-green-600 dark:text-green-400 w-fit">
                <CheckCircle size={14} />
                Available for work
              </div>
            )}
          </motion.div>

          <motion.div variants={variants} className="flex flex-col gap-4">
            {profile.skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <p className="text-sm font-medium mb-2">{skillGroup.category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((item) => (
                    <Badge key={item} label={item} variant="tech" />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
