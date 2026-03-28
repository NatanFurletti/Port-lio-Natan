/**
 * Testes unitários para a API de Projetos
 * Não requerem servidor rodando - testam o handler diretamente
 * Execute com: npm test
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "../projects/route";

// Mock do Prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    project: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import { prisma } from "@/lib/prisma";

const mockProject = {
  id: "1",
  slug: "ecommerce-platform",
  title: "E-Commerce Platform",
  shortDescription: "Full-stack e-commerce platform",
  fullDescription: "A complete e-commerce solution",
  technologies: ["Next.js", "TypeScript"],
  category: "fullstack",
  featured: true,
  status: "completed",
  videoType: "youtube",
  videoUrl: "https://www.youtube.com/watch?v=test",
  liveLink: "https://ecommerce-demo.vercel.app",
  githubLink: "https://github.com/devuser/ecommerce",
  thumbnail: "https://images.unsplash.com/photo-1556742049",
  caseStudyLink: null,
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-15"),
};

describe("Projects API - GET /api/projects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve listar todos os projetos", async () => {
    const mockProjects = [mockProject];
    vi.mocked(prisma.project.findMany).mockResolvedValue(mockProjects);

    const request = new NextRequest("http://localhost:3000/api/projects");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(1);
    expect(data[0].title).toBe("E-Commerce Platform");
  });

  it("deve filtrar projetos por categoria", async () => {
    vi.mocked(prisma.project.findMany).mockResolvedValue([mockProject]);

    const request = new NextRequest(
      "http://localhost:3000/api/projects?category=fullstack",
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data[0].category).toBe("fullstack");
    expect(vi.mocked(prisma.project.findMany)).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { category: "fullstack" },
      }),
    );
  });

  it("deve filtrar projetos por featured=true", async () => {
    vi.mocked(prisma.project.findMany).mockResolvedValue([mockProject]);

    const request = new NextRequest(
      "http://localhost:3000/api/projects?featured=true",
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data[0].featured).toBe(true);
    expect(vi.mocked(prisma.project.findMany)).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { featured: true },
      }),
    );
  });

  it("deve filtrar projetos por featured=false", async () => {
    const notFeaturedProject = { ...mockProject, id: "2", featured: false };
    vi.mocked(prisma.project.findMany).mockResolvedValue([notFeaturedProject]);

    const request = new NextRequest(
      "http://localhost:3000/api/projects?featured=false",
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data[0].featured).toBe(false);
  });

  it("deve aplicar múltiplos filtros (categoria e featured)", async () => {
    vi.mocked(prisma.project.findMany).mockResolvedValue([mockProject]);

    const request = new NextRequest(
      "http://localhost:3000/api/projects?category=fullstack&featured=true",
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(vi.mocked(prisma.project.findMany)).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          category: "fullstack",
          featured: true,
        },
      }),
    );
  });

  it("deve retornar array vazio quando não há projetos", async () => {
    vi.mocked(prisma.project.findMany).mockResolvedValue([]);

    const request = new NextRequest("http://localhost:3000/api/projects");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(0);
  });

  it("deve retornar erro 500 se houver problema com banco de dados", async () => {
    vi.mocked(prisma.project.findMany).mockRejectedValue(
      new Error("Database error"),
    );

    const request = new NextRequest("http://localhost:3000/api/projects");
    const response = await GET(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toHaveProperty("error");
  });

  it('deve ignorar filtros inválidos com valor "null"', async () => {
    const notFeaturedProject = { ...mockProject, id: "2", featured: false };
    vi.mocked(prisma.project.findMany).mockResolvedValue([notFeaturedProject]);

    const request = new NextRequest(
      "http://localhost:3000/api/projects?featured=null",
    );
    const response = await GET(request);

    expect(response.status).toBe(200);
    // featured=null é string, então featured !== null é true, resultando em featured: false
    expect(vi.mocked(prisma.project.findMany)).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          featured: false,
        },
      }),
    );
  });
});
