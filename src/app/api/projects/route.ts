import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/projects
 * Lista todos os projetos
 * Query params:
 * - category: string (opcional) - filtrar por categoria
 * - featured: boolean (opcional) - filtrar por featured
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const where: any = {}

    if (category) {
      where.category = category
    }

    if (featured !== null) {
      where.featured = featured === 'true'
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar projetos' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/projects
 * Cria um novo projeto
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar campos obrigatórios
    const requiredFields = [
      'slug',
      'title',
      'shortDescription',
      'fullDescription',
      'technologies',
      'category',
      'thumbnail',
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Campo obrigatório ausente: ${field}` },
          { status: 400 }
        )
      }
    }

    // Verificar se slug já existe
    const existingProject = await prisma.project.findUnique({
      where: { slug: body.slug },
    })

    if (existingProject) {
      return NextResponse.json(
        { error: 'Slug já existe' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        slug: body.slug,
        title: body.title,
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription,
        technologies: body.technologies,
        category: body.category,
        featured: body.featured || false,
        status: body.status || 'completed',
        videoType: body.videoType || 'none',
        videoUrl: body.videoUrl,
        liveLink: body.liveLink,
        githubLink: body.githubLink,
        caseStudyLink: body.caseStudyLink,
        thumbnail: body.thumbnail,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Erro ao criar projeto' },
      { status: 500 }
    )
  }
}
