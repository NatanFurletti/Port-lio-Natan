# 📚 Setup do Banco de Dados PostgreSQL com Prisma

Este guia irá ajudá-lo a configurar o banco de dados PostgreSQL e as APIs CRUD para gerenciar projetos.

## ✅ O que foi configurado

- ✅ Prisma instalado e inicializado
- ✅ Schema Prisma criado com modelo `Project`
- ✅ Seed script para popular o banco com projetos
- ✅ API CRUD completa (GET, POST, PUT, DELETE)
- ✅ Arquivo `.env.local` com template de configuração

## 🚀 Passo 1: Configurar PostgreSQL

### Opção A: PostgreSQL Local (Linux/Mac)

```bash
# Instalar PostgreSQL
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS com Homebrew
brew install postgresql@15

# Iniciar o serviço
sudo service postgresql start    # Linux
brew services start postgresql  # macOS
```

### Opção B: PostgreSQL com Docker

```bash
docker run --name portfolio-postgres \
  -e POSTGRES_PASSWORD=senha123 \
  -e POSTGRES_DB=portfolio_db \
  -p 5432:5432 \
  -d postgres:15
```

### Opção C: PostgreSQL na Nuvem

- **Supabase** (recomendado): https://supabase.com
- **Railway**: https://railway.app
- **Neon**: https://neon.tech
- **Vercel Postgres**: https://vercel.com/storage/postgres

## 🔧 Passo 2: Configurar o arquivo .env.local

Edite o arquivo `.env.local` com sua string de conexão do PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/portfolio_db?schema=public"
```

Exemplos:
- **Local**: `postgresql://postgres:password@localhost:5432/portfolio_db?schema=public`
- **Supabase**: `postgresql://[user]:[password]@[host]:[port]/[database]?schema=public`
- **Railway/Neon**: Copiar a URL fornecida pela plataforma

## 📦 Passo 3: Executar Migrações

```bash
# Criar o banco de dados e aplicar schema
npm run db:migrate
```

## 🌱 Passo 4: Popular o Banco (Seed)

```bash
# Populará o banco com os 3 projetos existentes
npm run db:seed
```

## 🎯 Passo 5: Visualizar Dados (Opcional)

```bash
# Abre o Prisma Studio para visualizar dados no navegador
npm run db:studio
```

---

## 📡 API Endpoints

### 1️⃣ **GET /api/projects**
Listar todos os projetos

**Query Parameters:**
- `category` (opcional): Filtrar por categoria (web, mobile, backend, fullstack, data, other)
- `featured` (opcional): Filtrar por destaque (true/false)

**Exemplo:**
```bash
curl "http://localhost:3000/api/projects"
curl "http://localhost:3000/api/projects?category=fullstack"
curl "http://localhost:3000/api/projects?featured=true"
```

**Response (200):**
```json
[
  {
    "id": "clX1234567890",
    "slug": "ecommerce-platform",
    "title": "E-Commerce Platform",
    "shortDescription": "Full-stack e-commerce platform...",
    "fullDescription": "A complete e-commerce solution...",
    "technologies": ["Next.js", "TypeScript", ...],
    "category": "fullstack",
    "featured": true,
    "status": "completed",
    "videoType": "youtube",
    "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "liveLink": "https://ecommerce-demo.vercel.app",
    "githubLink": "https://github.com/devuser/ecommerce-platform",
    "caseStudyLink": null,
    "thumbnail": "https://images.unsplash.com/...",
    "createdAt": "2024-01-15T00:00:00.000Z",
    "updatedAt": "2024-01-15T00:00:00.000Z"
  }
]
```

---

### 2️⃣ **GET /api/projects/[id]**
Buscar um projeto específico por ID

**Exemplo:**
```bash
curl "http://localhost:3000/api/projects/clX1234567890"
```

**Response (200):** Retorna um projeto único

**Response (404):** Projeto não encontrado

---

### 3️⃣ **POST /api/projects**
Criar um novo projeto

**Body (JSON):**
```json
{
  "slug": "meu-novo-projeto",
  "title": "Meu Novo Projeto",
  "shortDescription": "Uma descrição curta",
  "fullDescription": "Uma descrição mais completa do projeto",
  "technologies": ["Next.js", "React", "TypeScript"],
  "category": "web",
  "thumbnail": "https://images.unsplash.com/photo-xxx",
  "featured": false,
  "status": "completed",
  "videoType": "youtube",
  "videoUrl": "https://www.youtube.com/watch?v=xxx",
  "liveLink": "https://meusite.com",
  "githubLink": "https://github.com/usuario/projeto",
  "caseStudyLink": "https://blog.com/case-study"
}
```

**Campos Obrigatórios:**
- `slug`: Identificador único (sem espaços)
- `title`: Título do projeto
- `shortDescription`: Descrição curta
- `fullDescription`: Descrição completa
- `technologies`: Array de tecnologias
- `category`: Categoria (web, mobile, backend, fullstack, data, other)
- `thumbnail`: URL da imagem de miniatura

**Campos Opcionais:**
- `featured`: boolean (padrão: false)
- `status`: string (padrão: "completed")
- `videoType`: "youtube" | "vimeo" | "local" | "none" (padrão: "none")
- `videoUrl`: URL do vídeo
- `liveLink`: URL do site ao vivo
- `githubLink`: URL do repositório
- `caseStudyLink`: URL do case study

**Exemplo com curl:**
```bash
curl -X POST "http://localhost:3000/api/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "novo-projeto",
    "title": "Novo Projeto",
    "shortDescription": "Uma descrição",
    "fullDescription": "Descrição completa",
    "technologies": ["React", "Node.js"],
    "category": "fullstack",
    "thumbnail": "https://example.com/image.jpg",
    "featured": true
  }'
```

**Response (201):** Retorna o projeto criado com ID gerado

---

### 4️⃣ **PUT /api/projects/[id]**
Atualizar um projeto existente

**Body (JSON):**
```json
{
  "title": "Título Atualizado",
  "shortDescription": "Nova descrição curta",
  "featured": true,
  "status": "in-progress"
}
```

Você pode atualizar qualquer campo. Campos não informados não serão alterados.

**Exemplo com curl:**
```bash
curl -X PUT "http://localhost:3000/api/projects/clX1234567890" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título Atualizado",
    "featured": true
  }'
```

**Response (200):** Retorna o projeto atualizado

**Response (404):** Projeto não encontrado

---

### 5️⃣ **DELETE /api/projects/[id]**
Deletar um projeto

**Exemplo com curl:**
```bash
curl -X DELETE "http://localhost:3000/api/projects/clX1234567890"
```

**Response (200):** Mensagem de sucesso

**Response (404):** Projeto não encontrado

---

## 🧪 Testando com Exemplos

### Criar um novo projeto:
```bash
curl -X POST "http://localhost:3000/api/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "ai-chatbot",
    "title": "AI Chatbot",
    "shortDescription": "Um chatbot inteligente com IA",
    "fullDescription": "Um aplicativo de chatbot que usa inteligência artificial para responder perguntas",
    "technologies": ["Python", "OpenAI", "FastAPI", "React"],
    "category": "backend",
    "thumbnail": "https://images.unsplash.com/photo-1677442d019cecf8d6f1d262f03a9f87?w=800&q=80",
    "featured": false,
    "status": "completed",
    "githubLink": "https://github.com/usuario/ai-chatbot"
  }'
```

### Listar apenas projetos em destaque:
```bash
curl "http://localhost:3000/api/projects?featured=true"
```

### Atualizar um projeto:
```bash
curl -X PUT "http://localhost:3000/api/projects/ID_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "featured": true,
    "status": "in-progress"
  }'
```

### Deletar um projeto:
```bash
curl -X DELETE "http://localhost:3000/api/projects/ID_AQUI"
```

---

## 🔐 Próximos Passos (Opcional)

1. **Adicionar Autenticação**: Use NextAuth.js ou JSON Web Tokens (JWT)
2. **Validação de Dados**: Use bibliotecas como Zod ou Yup
3. **Rate Limiting**: Proteja sua API com rate limiting
4. **Tests**: Escreva testes para os endpoints
5. **Documentação Swagger**: Use Swagger/OpenAPI para documentar
6. **Cache**: Implemente cache com Redis

---

## 🐛 Troubleshooting

### Erro: "Can't reach database server"
- Verifique se PostgreSQL está rodando
- Verifique a string DATABASE_URL
- Teste a conexão: `psql postgresql://user:pass@localhost:5432/portfolio_db`

### Erro: "Prisma Client validation error"
```bash
npm run build  # Regenerar Prisma Client
```

### Erro: "Slug já existe"
Use um slug diferente que seja único

### Remover todas as migrações e recriar (CUIDADO - deleta dados!)
```bash
npm run db:reset
```

---

## 📚 Recursos

- [Documentação do Prisma](https://www.prisma.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [Supabase Docs](https://supabase.com/docs)

---

**Desenvolvido com ❤️ para o seu portfólio**
