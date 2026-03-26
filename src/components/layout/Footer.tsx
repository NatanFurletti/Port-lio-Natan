import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { profile } from '@/data/profile'

export function Footer() {
  const { social, name } = profile

  return (
    <footer className="border-t border-border mt-20">
      <div className="mx-auto max-w-5xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-fg">
          © {new Date().getFullYear()} {name}. Built with Next.js & Tailwind CSS.
        </p>
        <div className="flex items-center gap-3">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-muted-fg hover:text-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <Github size={18} />
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-muted-fg hover:text-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${social.email}`}
            aria-label="Send email"
            className="text-muted-fg hover:text-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <Mail size={18} />
          </a>
          {social.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter profile"
              className="text-muted-fg hover:text-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              <Twitter size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
