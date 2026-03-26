'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ExternalLink, VideoOff } from 'lucide-react'
import type { ProjectVideo } from '@/types'

// Dynamically import react-player to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

interface VideoPlayerProps {
  video: ProjectVideo
  title: string
  projectUrl?: string
}

export function VideoPlayer({ video, title, projectUrl }: VideoPlayerProps) {
  const [hasError, setHasError] = useState(false)

  if (video.type === 'none' || !video.url) return null

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-muted aspect-video text-center px-4">
        <VideoOff size={32} className="text-muted-fg" aria-hidden />
        <p className="text-sm text-muted-fg">Failed to load video.</p>
        {projectUrl && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            View project <ExternalLink size={12} />
          </a>
        )}
      </div>
    )
  }

  return (
    <div
      className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted"
      title={title}
    >
      <ReactPlayer
        url={video.url}
        width="100%"
        height="100%"
        controls
        onError={() => setHasError(true)}
        config={{
          youtube: { playerVars: { modestbranding: 1 } },
          vimeo: { playerOptions: { title: false } },
          file: { attributes: { title } },
        }}
      />
    </div>
  )
}
