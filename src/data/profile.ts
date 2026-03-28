import type { DeveloperProfile } from '@/types'

export const profile: DeveloperProfile = {
  name: 'Natan Furletti ',
  title: 'BackEnd Developer',
  bio: 'Backend developer specialized in Node.js, TypeScript, and RESTful APIs. Experience with MySQL, PostgreSQL, and Prisma ORM. Currently studying software architecture, and AI, focused on building scalable, high-performance systems using best practices such as Clean Architecture and TDD.',
  location: 'BH / MG, Brazil',
  availableForWork: true,
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'PostgreSQL', 'API RESTful'],
    },
    {
      category: 'DevOps & Tools',
      items: ['Docker', 'Vercel', 'GitHub Actions', 'AWS', 'Git'],
    },
  ],
  social: {
    github: 'https://github.com/NatanFurletti',
    linkedin: 'https://www.linkedin.com/in/natan-furletti/',
    email: 'natan.furletti@outlook.com',
    
  },
  resumeUrl: '/resume.pdf',
}
