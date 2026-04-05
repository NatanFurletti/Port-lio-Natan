import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Projects",
  description: `Browse all projects by ${profile.name} — ${profile.title}.`,
  openGraph: {
    title: `Projects | ${profile.name}`,
    description: `Browse all projects by ${profile.name}.`,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${profile.name}`,
    description: `Browse all projects by ${profile.name}.`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-1">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-muted-fg">A collection of things I&apos;ve built.</p>
      </div>
      <ProjectGrid projects={projects} />
    </div>
  );
}
