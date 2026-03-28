import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete existing projects
  await prisma.project.deleteMany({});

  // Create projects
  const projects = await prisma.project.createMany({
    data: [
      {
        slug: "ecommerce-platform",
        title: "E-Commerce Platform",
        shortDescription:
          "Full-stack e-commerce platform with real-time inventory and payment integration.",
        fullDescription:
          "A complete e-commerce solution built with Next.js and TypeScript. Features include product catalog, shopping cart, Stripe payment integration, real-time inventory management, and an admin dashboard. Deployed on Vercel with a PostgreSQL database on Supabase.",
        technologies: [
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Stripe",
          "PostgreSQL",
          "Supabase",
        ],
        category: "fullstack",
        featured: true,
        status: "completed",
        videoType: "youtube",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        liveLink: "https://ecommerce-demo.vercel.app",
        githubLink: "https://github.com/devuser/ecommerce-platform",
        thumbnail:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        createdAt: new Date("2024-01-15T00:00:00.000Z"),
      },
      {
        slug: "task-manager-app",
        title: "Task Manager App",
        shortDescription:
          "Productivity app with drag-and-drop boards, labels and team collaboration.",
        fullDescription:
          "A Kanban-style task management application inspired by Trello. Built with React and a Node.js backend. Supports drag-and-drop task reordering, labels, due dates, team members, and real-time updates via WebSockets.",
        technologies: [
          "React",
          "Node.js",
          "Express",
          "Socket.io",
          "MongoDB",
          "Tailwind CSS",
        ],
        category: "web",
        featured: true,
        status: "in-progress",
        videoType: "local",
        videoUrl: "/videos/task-manager-demo.mp4",
        liveLink: "https://tasks-demo.vercel.app",
        githubLink: "https://github.com/devuser/task-manager",
        thumbnail:
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
        createdAt: new Date("2024-03-10T00:00:00.000Z"),
      },
      {
        slug: "data-pipeline-cli",
        title: "Data Pipeline CLI",
        shortDescription:
          "Command-line tool for building and orchestrating ETL data pipelines.",
        fullDescription:
          "A CLI tool written in Python that allows data engineers to define, schedule and monitor ETL pipelines using a simple YAML configuration. Supports multiple data sources (CSV, JSON, SQL databases) and destinations, with built-in retry logic and alerting.",
        technologies: [
          "Python",
          "Click",
          "Pandas",
          "SQLAlchemy",
          "YAML",
          "Docker",
        ],
        category: "data",
        featured: false,
        status: "completed",
        videoType: "none",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        caseStudyLink: "https://devuser.dev/blog/data-pipeline-cli",
        createdAt: new Date("2023-11-20T00:00:00.000Z"),
      },
    ],
  });

  console.log(`✅ Seeded ${projects.count} projects`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
