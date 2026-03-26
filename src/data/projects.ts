import { parseProjects } from '@/lib/parser'
import type { Project } from '@/types'

const rawProjects = [
  {
    id: '1',
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    shortDescription: 'Full-stack e-commerce platform with real-time inventory and payment integration.',
    fullDescription:
      'A complete e-commerce solution built with Next.js and TypeScript. Features include product catalog, shopping cart, Stripe payment integration, real-time inventory management, and an admin dashboard. Deployed on Vercel with a PostgreSQL database on Supabase.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL', 'Supabase'],
    category: 'fullstack',
    featured: true,
    status: 'completed',
    video: {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    links: {
      live: 'https://ecommerce-demo.vercel.app',
      github: 'https://github.com/devuser/ecommerce-platform',
    },
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    createdAt: '2024-01-15T00:00:00.000Z',
  },
  {
    id: '2',
    slug: 'task-manager-app',
    title: 'Task Manager App',
    shortDescription: 'Productivity app with drag-and-drop boards, labels and team collaboration.',
    fullDescription:
      'A Kanban-style task management application inspired by Trello. Built with React and a Node.js backend. Supports drag-and-drop task reordering, labels, due dates, team members, and real-time updates via WebSockets.',
    technologies: ['React', 'Node.js', 'Express', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
    category: 'web',
    featured: true,
    status: 'in-progress',
    video: {
      type: 'local',
      url: '/videos/task-manager-demo.mp4',
    },
    links: {
      github: 'https://github.com/devuser/task-manager',
      live: 'https://tasks-demo.vercel.app',
    },
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    createdAt: '2024-03-10T00:00:00.000Z',
  },
  {
    id: '3',
    slug: 'data-pipeline-cli',
    title: 'Data Pipeline CLI',
    shortDescription: 'Command-line tool for building and orchestrating ETL data pipelines.',
    fullDescription:
      'A CLI tool written in Python that allows data engineers to define, schedule and monitor ETL pipelines using a simple YAML configuration. Supports multiple data sources (CSV, JSON, SQL databases) and destinations, with built-in retry logic and alerting.',
    technologies: ['Python', 'Click', 'Pandas', 'SQLAlchemy', 'YAML', 'Docker'],
    category: 'data',
    featured: false,
    status: 'completed',
    video: {
      type: 'none',
    },
    links: {
      github: 'https://github.com/devuser/data-pipeline-cli',
      caseStudy: 'https://devuser.dev/blog/data-pipeline-cli',
    },
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    createdAt: '2023-11-20T00:00:00.000Z',
  },
]

export const projects: Project[] = parseProjects(rawProjects)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
