import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: {
    id: string
  }
}

/**
 * GET /api/projects/[id]
 * Busca um projeto específico por ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar projeto' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/projects/[id]
 * Atualiza um projeto específico
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    const body = await request.json()

    // Verificar se projeto existe
    const existingProject = await prisma.project.findUnique({
      where: { id },
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      )
    }

    // Se slug está sendo alterado, verificar se novo slug já existe
    if (body.slug && body.slug !== existingProject.slug) {
      const duplicateSlug = await prisma.project.findUnique({
        where: { slug: body.slug },
      })

      if (duplicateSlug) {
        return NextResponse.json(
          { error: 'Slug já existe' },
          { status: 400 }
        )
      }
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...(body.slug && { slug: body.slug }),
        ...(body.title && { title: body.title }),
        ...(body.shortDescription && { shortDescription: body.shortDescription }),
        ...(body.fullDescription && { fullDescription: body.fullDescription }),
        ...(body.technologies && { technologies: body.technologies }),
        ...(body.category && { category: body.category }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.status && { status: body.status }),
        ...(body.videoType && { videoType: body.videoType }),
        ...(body.videoUrl !== undefined && { videoUrl: body.videoUrl }),
        ...(body.liveLink !== undefined && { liveLink: body.liveLink }),
        ...(body.githubLink !== undefined && { githubLink: body.githubLink }),
        ...(body.caseStudyLink !== undefined && { caseStudyLink: body.caseStudyLink }),
        ...(body.thumbnail && { thumbnail: body.thumbnail }),
      },
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar projeto' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/projects/[id]
 * Deleta um projeto específico
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    // Verificar se projeto existe
    const existingProject = await prisma.project.findUnique({
      where: { id },
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      )
    }

    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Projeto deletado com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar projeto' },
      { status: 500 }
    )
  }
}
