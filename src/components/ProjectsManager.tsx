"use client";

import { useState } from "react";
import { CreateProjectInput } from "@/lib/api-examples";

/**
 * Componente para gerenciar projetos (CRUD)
 * Use este componente em uma página admin
 */

export function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateProjectInput>({
    slug: "",
    title: "",
    shortDescription: "",
    fullDescription: "",
    technologies: [],
    category: "web",
    thumbnail: "",
  });

  // Buscar todos os projetos
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Erro ao buscar projetos");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar");
    } finally {
      setLoading(false);
    }
  };

  // Criar ou atualizar projeto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao salvar");
      }

      await fetchProjects();
      resetForm();
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setLoading(false);
    }
  };

  // Deletar projeto
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este projeto?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao deletar");
      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao deletar");
    } finally {
      setLoading(false);
    }
  };

  // Editar projeto
  const handleEdit = (project: any) => {
    setFormData({
      slug: project.slug,
      title: project.title,
      shortDescription: project.shortDescription,
      fullDescription: project.fullDescription,
      technologies: project.technologies,
      category: project.category,
      thumbnail: project.thumbnail,
      featured: project.featured,
      status: project.status,
      videoType: project.videoType,
      videoUrl: project.videoUrl,
      liveLink: project.liveLink,
      githubLink: project.githubLink,
      caseStudyLink: project.caseStudyLink,
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      slug: "",
      title: "",
      shortDescription: "",
      fullDescription: "",
      technologies: [],
      category: "web",
      thumbnail: "",
    });
    setEditingId(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gerenciador de Projetos</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6 flex gap-4">
        <button
          onClick={fetchProjects}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Carregando..." : "Recarregar Projetos"}
        </button>

        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {showForm ? "Cancelar" : "Novo Projeto"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Editar Projeto" : "Novo Projeto"}
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="p-2 border rounded"
              required
              disabled={!!editingId}
            />
            <input
              type="text"
              placeholder="Título"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="p-2 border rounded"
              required
            />
          </div>

          <textarea
            placeholder="Descrição Curta"
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData({ ...formData, shortDescription: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            required
          />

          <textarea
            placeholder="Descrição Completa"
            value={formData.fullDescription}
            onChange={(e) =>
              setFormData({ ...formData, fullDescription: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            required
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as any })
              }
              className="p-2 border rounded"
            >
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
              <option value="data">Data</option>
              <option value="other">Outro</option>
            </select>

            <input
              type="text"
              placeholder="Tecnologias (separadas por vírgula)"
              value={formData.technologies.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  technologies: e.target.value.split(", "),
                })
              }
              className="p-2 border rounded"
            />
          </div>

          <input
            type="url"
            placeholder="URL da Miniatura"
            value={formData.thumbnail}
            onChange={(e) =>
              setFormData({ ...formData, thumbnail: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {projects.length === 0 ? (
          <p className="text-gray-600">Nenhum projeto encontrado</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {project.shortDescription}
              </p>
              <div className="flex gap-2 mb-2">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
