/**
 * Exemplos de uso da API de Projetos
 * Copie e adapte conforme necessário
 */

// ============================================
// 1. Buscar todos os projetos
// ============================================

export async function getAllProjects() {
  const response = await fetch('/api/projects')
  if (!response.ok) throw new Error('Erro ao buscar projetos')
  return response.json()
}

// ============================================
// 2. Buscar projetos com filtros
// ============================================

export async function getProjectsFiltered(category?: string, featured?: boolean) {
  const params = new URLSearchParams()
  if (category) params.append('category', category)
  if (featured !== undefined) params.append('featured', String(featured))

  const response = await fetch(`/api/projects?${params.toString()}`)
  if (!response.ok) throw new Error('Erro ao buscar projetos')
  return response.json()
}

// ============================================
// 3. Buscar um projeto específico
// ============================================

export async function getProjectById(id: string) {
  const response = await fetch(`/api/projects/${id}`)
  if (!response.ok) throw new Error('Projeto não encontrado')
  return response.json()
}

// ============================================
// 4. Criar um novo projeto
// ============================================

export interface CreateProjectInput {
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  technologies: string[]
  category: 'web' | 'mobile' | 'backend' | 'fullstack' | 'data' | 'other'
  thumbnail: string
  featured?: boolean
  status?: string
  videoType?: 'youtube' | 'vimeo' | 'local' | 'none'
  videoUrl?: string
  liveLink?: string
  githubLink?: string
  caseStudyLink?: string
}

export async function createProject(data: CreateProjectInput) {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro ao criar projeto')
  }

  return response.json()
}

// ============================================
// 5. Atualizar um projeto
// ============================================

export interface UpdateProjectInput {
  slug?: string
  title?: string
  shortDescription?: string
  fullDescription?: string
  technologies?: string[]
  category?: string
  featured?: boolean
  status?: string
  videoType?: string
  videoUrl?: string
  liveLink?: string
  githubLink?: string
  caseStudyLink?: string
  thumbnail?: string
}

export async function updateProject(id: string, data: UpdateProjectInput) {
  const response = await fetch(`/api/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro ao atualizar projeto')
  }

  return response.json()
}

// ============================================
// 6. Deletar um projeto
// ============================================

export async function deleteProject(id: string) {
  const response = await fetch(`/api/projects/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro ao deletar projeto')
  }

  return response.json()
}

// ============================================
// EXEMPLOS DE USO
// ============================================

// Exemplo 1: Listar todos os projetos
/*
async function example1() {
  const projects = await getAllProjects()
  console.log('Todos os projetos:', projects)
}
*/

// Exemplo 2: Listar apenas projetos em destaque
/*
async function example2() {
  const featured = await getProjectsFiltered(undefined, true)
  console.log('Projetos em destaque:', featured)
}
*/

// Exemplo 3: Listar apenas projetos fullstack
/*
async function example3() {
  const fullstack = await getProjectsFiltered('fullstack')
  console.log('Projetos fullstack:', fullstack)
}
*/

// Exemplo 4: Criar um novo projeto
/*
async function example4() {
  const newProject = await createProject({
    slug: 'mobile-app',
    title: 'Mobile App',
    shortDescription: 'Um aplicativo móvel incrível',
    fullDescription: 'Descrição completa do aplicativo',
    technologies: ['React Native', 'TypeScript', 'Firebase'],
    category: 'mobile',
    thumbnail: 'https://images.unsplash.com/photo-xxx',
    featured: true,
    githubLink: 'https://github.com/usuario/mobile-app'
  })
  console.log('Novo projeto criado:', newProject)
}
*/

// Exemplo 5: Atualizar um projeto
/*
async function example5() {
  const projectId = 'clX1234567890'
  const updated = await updateProject(projectId, {
    title: 'Novo Título',
    featured: false
  })
  console.log('Projeto atualizado:', updated)
}
*/

// Exemplo 6: Deletar um projeto
/*
async function example6() {
  const projectId = 'clX1234567890'
  const result = await deleteProject(projectId)
  console.log('Projeto deletado:', result)
}
*/
