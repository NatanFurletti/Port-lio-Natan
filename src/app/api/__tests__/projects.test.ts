/**
 * Tests para os endpoints da API de Projetos
 * Execute com: npm test
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'

let testProjectId: string

const BASE_URL = 'http://localhost:3000'

describe('Projects API', () => {
  describe('GET /api/projects', () => {
    it('deve listar todos os projetos', async () => {
      const response = await fetch(`${BASE_URL}/api/projects`)
      expect(response.status).toBe(200)

      const projects = await response.json()
      expect(Array.isArray(projects)).toBe(true)
      expect(projects.length).toBeGreaterThan(0)
    })

    it('deve filtrar projetos por categoria', async () => {
      const response = await fetch(`${BASE_URL}/api/projects?category=fullstack`)
      expect(response.status).toBe(200)

      const projects = await response.json()
      expect(Array.isArray(projects)).toBe(true)
      projects.forEach((project) => {
        expect(project.category).toBe('fullstack')
      })
    })

    it('deve filtrar projetos por featured', async () => {
      const response = await fetch(`${BASE_URL}/api/projects?featured=true`)
      expect(response.status).toBe(200)

      const projects = await response.json()
      expect(Array.isArray(projects)).toBe(true)
      projects.forEach((project) => {
        expect(project.featured).toBe(true)
      })
    })
  })

  describe('POST /api/projects', () => {
    it('deve criar um novo projeto', async () => {
      const newProject = {
        slug: `test-project-${Date.now()}`,
        title: 'Test Project',
        shortDescription: 'Uma descrição de teste',
        fullDescription: 'Uma descrição completa de teste',
        technologies: ['Next.js', 'TypeScript'],
        category: 'web',
        thumbnail: 'https://example.com/image.jpg',
      }

      const response = await fetch(`${BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })

      expect(response.status).toBe(201)
      const createdProject = await response.json()
      expect(createdProject.id).toBeDefined()
      expect(createdProject.slug).toBe(newProject.slug)
      expect(createdProject.title).toBe(newProject.title)

      testProjectId = createdProject.id
    })

    it('deve retornar erro se slug já existe', async () => {
      const newProject = {
        slug: 'ecommerce-platform',
        title: 'Duplicate',
        shortDescription: 'Description',
        fullDescription: 'Full Description',
        technologies: ['React'],
        category: 'web',
        thumbnail: 'https://example.com/image.jpg',
      }

      const response = await fetch(`${BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })

      expect(response.status).toBe(400)
      const error = await response.json()
      expect(error.error).toContain('Slug')
    })

    it('deve retornar erro se faltam campos obrigatórios', async () => {
      const response = await fetch(`${BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Incomplete',
          // Faltam outros campos
        }),
      })

      expect(response.status).toBe(400)
      const error = await response.json()
      expect(error.error).toBeDefined()
    })
  })

  describe('GET /api/projects/[id]', () => {
    it('deve buscar um projeto por ID', async () => {
      // Primeiro, cria um projeto
      const newProject = {
        slug: `get-test-${Date.now()}`,
        title: 'Get Test',
        shortDescription: 'Description',
        fullDescription: 'Full Description',
        technologies: ['React'],
        category: 'web',
        thumbnail: 'https://example.com/image.jpg',
      }

      const createResponse = await fetch(`${BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })

      const created = await createResponse.json()
      const projectId = created.id

      // Depois busca ele
      const getResponse = await fetch(`${BASE_URL}/api/projects/${projectId}`)
      expect(getResponse.status).toBe(200)

      const fetched = await getResponse.json()
      expect(fetched.id).toBe(projectId)
      expect(fetched.title).toBe(newProject.title)
    })

    it('deve retornar 404 para projeto não encontrado', async () => {
      const response = await fetch(`${BASE_URL}/api/projects/invalid-id-12345`)
      expect(response.status).toBe(404)
      const error = await response.json()
      expect(error.error).toContain('não encontrado')
    })
  })

  describe('PUT /api/projects/[id]', () => {
    it('deve atualizar um projeto', async () => {
      // Cria um projeto
      const newProject = {
        slug: `update-test-${Date.now()}`,
        title: 'Original Title',
        shortDescription: 'Description',
        fullDescription: 'Full Description',
        technologies: ['React'],
        category: 'web',
        thumbnail: 'https://example.com/image.jpg',
      }

      const createResponse = await fetch(`${BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })

      const created = await createResponse.json()
      const projectId = created.id

      // Atualiza o projeto
      const updateResponse = await fetch(`${BASE_URL}/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Updated Title',
          featured: true,
        }),
      })

      expect(updateResponse.status).toBe(200)
      const updated = await updateResponse.json()
      expect(updated.title).toBe('Updated Title')
      expect(updated.featured).toBe(true)
    })

    it('deve retornar 404 ao atualizar projeto inexistente', async () => {
      const response = await fetch(`${BASE_URL}/api/projects/invalid-id`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Updated',
        }),
      })

      expect(response.status).toBe(404)
    })
  })

  describe('DELETE /api/projects/[id]', () => {
    it('deve deletar um projeto', async () => {
      // Cria um projeto
      const newProject = {
        slug: `delete-test-${Date.now()}`,
        title: 'To Delete',
        shortDescription: 'Description',
        fullDescription: 'Full Description',
        technologies: ['React'],
        category: 'web',
        thumbnail: 'https://example.com/image.jpg',
      }

      const createResponse = await fetch(`${BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })

      const created = await createResponse.json()
      const projectId = created.id

      // Deleta o projeto
      const deleteResponse = await fetch(`${BASE_URL}/api/projects/${projectId}`, {
        method: 'DELETE',
      })

      expect(deleteResponse.status).toBe(200)
      const result = await deleteResponse.json()
      expect(result.message).toContain('sucesso')

      // Verifica se foi deletado
      const getResponse = await fetch(`${BASE_URL}/api/projects/${projectId}`)
      expect(getResponse.status).toBe(404)
    })

    it('deve retornar 404 ao deletar projeto inexistente', async () => {
      const response = await fetch(`${BASE_URL}/api/projects/invalid-id`, {
        method: 'DELETE',
      })

      expect(response.status).toBe(404)
    })
  })
})

/**
 * INSTRÇÕES PARA EXECUTAR OS TESTES:
 *
 * 1. Inicie o servidor do projeto:
 *    npm run dev
 *
 * 2. Em outro terminal, execute:
 *    npm test -- src/app/api/__tests__/projects.test.ts
 *
 * Ou adicione o teste ao seu suite de testes.
 */
