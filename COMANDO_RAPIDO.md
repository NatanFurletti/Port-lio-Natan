# ⚡ Referência Rápida de Comandos

## 🐘 PostgreSQL com Docker

```bash
# Criar container
docker run --name portfolio-db \
  -e POSTGRES_PASSWORD=senha123 \
  -e POSTGRES_DB=portfolio_db \
  -p 5432:5432 \
  -d postgres:15

# Ver logs
docker logs portfolio-db

# Conectar ao banco
docker exec -it portfolio-db psql -U postgres -d portfolio_db

# Parar
docker stop portfolio-db

# Remover
docker rm portfolio-db
```

---

## 📦 Prisma

```bash
# Criar migração
npm run db:migrate

# Ver status
npx prisma migrate status

# Popular com dados
npm run db:seed

# Visualizar dados
npm run db:studio

# Resetar banco (CUIDADO - deleta dados!)
npx prisma migrate reset --force
```

---

## 🚀 Next.js

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Testes
npm test
npm test:watch
```

---

## 🧪 Curl - Testes de APIs

```bash
# GET - Listar todos
curl http://localhost:3000/api/projects

# GET - Filtrar por categoria
curl "http://localhost:3000/api/projects?category=fullstack"

# GET - Filtrar por featured
curl "http://localhost:3000/api/projects?featured=true"

# GET - Buscar por ID
curl http://localhost:3000/api/projects/ID

# POST - Criar
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "novo",
    "title": "Novo Projeto",
    "shortDescription": "Desc curta",
    "fullDescription": "Desc completa",
    "technologies": ["React"],
    "category": "web",
    "thumbnail": "https://example.com/img.jpg"
  }'

# PUT - Atualizar
curl -X PUT http://localhost:3000/api/projects/ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título Atualizado",
    "featured": true
  }'

# DELETE - Deletar
curl -X DELETE http://localhost:3000/api/projects/ID
```

---

## 📂 Estrutura de Pastas

```
/workspaces/Port-lio-Natan
├── prisma/
│   ├── schema.prisma          ← Schema do banco
│   └── seed.ts                ← Dados iniciais
├── src/
│   ├── app/
│   │   ├── api/projects/      ← Endpoints da API
│   │   └── ...
│   ├── lib/
│   │   ├── prisma.ts          ← Cliente Prisma
│   │   ├── api-examples.ts    ← Exemplos de uso
│   │   └── ...
│   ├── components/
│   │   ├── ProjectsManager.tsx ← Gerenciador CRUD
│   │   └── ...
│   └── ...
├── .env.local                 ← Variáveis de ambiente
├── package.json
├── DATABASE_SETUP.md          ← Documentação completa
├── SETUP_RAPIDO.md            ← Guia rápido
└── README.md
```

---

## 🔑 Variáveis de Ambiente

`.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db?schema=public"
```

---

## 📝 Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",                    // Desenvolvimento
    "build": "next build",                // Build
    "start": "next start",                // Produção
    "lint": "next lint",                  // Linting
    "test": "vitest --run",               // Testes
    "test:watch": "vitest",               // Testes contínuos
    "db:migrate": "prisma migrate dev",   // Migrações
    "db:seed": "prisma db seed",          // Popular dados
    "db:studio": "prisma studio"          // Dashboard
  }
}
```

---

## 🎯 Checklist de Setup

- [ ] Instalar PostgreSQL (Docker, Local ou Remoto)
- [ ] Configurar `.env.local` com DATABASE_URL
- [ ] Executar `npm run db:migrate`
- [ ] Executar `npm run db:seed`
- [ ] Iniciar com `npm run dev`
- [ ] Testar em `http://localhost:3000/api/projects`
- [ ] Visualizar com `npm run db:studio`

---

## 🆘 Problemas Comuns

**Erro: `Can't reach database server`**
```bash
# Verificar se está rodando
docker ps | grep portfolio-db
# ou para local
sudo service postgresql status
```

**Erro: `Prisma Client validation error`**
```bash
npm run build
```

**Erro: `Database already exists`**
```bash
npx prisma migrate reset --force
# ou delete o banco e recrie
```

**Slug duplicado**
Use um slug único, ex: `meu-projeto-2024`

---

## 🚁 Comandos Úteis

```bash
# Verificar Node
node --version

# Verificar npm
npm --version

# Verificar git
git --version

# Atualizar dependências
npm update

# Instalar dependências
npm install

# Limpar cache npm
npm cache clean --force

# Verificar vulnerabilidades
npm audit
npm audit fix
```

---

**Boa sorte! 🚀**
