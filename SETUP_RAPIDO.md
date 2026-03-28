# 🗄️ Setup PostgreSQL + Prisma - Guia Rápido

## Opção 1: PostgreSQL com Docker (RECOMENDADO PARA TESTE RÁPIDO)

```bash
# Criar e rodar container PostgreSQL
docker run --name portfolio-db \
  -e POSTGRES_PASSWORD=senha123 \
  -e POSTGRES_DB=portfolio_db \
  -p 5432:5432 \
  -d postgres:15

# Verificar se está rodando
docker ps | grep portfolio-db
```

## Opção 2: PostgreSQL Local - Linux/Ubuntu

```bash
# Instalar
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Iniciar
sudo service postgresql start

# Conectar e criar banco
sudo -u postgres psql

# No psql:
CREATE DATABASE portfolio_db;
\q
```

## Opção 3: PostgreSQL Local - macOS

```bash
# Instalar com Homebrew
brew install postgresql@15

# Iniciar
brew services start postgresql@15

# Criar banco
createdb portfolio_db
```

## Opção 4: PostgreSQL Remoto - Supabase (RECOMENDADO)

1. Vá para https://supabase.com
2. Crie uma conta/projeto
3. Copie a `DATABASE_URL` fornecida
4. Cole em `.env.local`

---

## 🔧 Setup do Projeto

### 1. Configurar `.env.local`

```bash
# Para Docker/Local:
DATABASE_URL="postgresql://postgres:senha123@localhost:5432/portfolio_db?schema=public"

# Para Supabase: colar a URL fornecida
```

### 2. Executar Migrações

```bash
npm run db:migrate
```

Quando perguntado:
- Digite um nome para a migração: `init`
- Pressione Enter

### 3. Popular com Dados

```bash
npm run db:seed
```

Verá: `✅ Seeded 3 projects`

### 4. Verificar Dados (Opcional)

```bash
npm run db:studio
# Abrirá em http://localhost:5555
```

---

## 🚀 Iniciar o Projeto

```bash
npm run dev
# Acesse http://localhost:3000
```

---

## 📡 Testar a API

```bash
# Listar projetos
curl http://localhost:3000/api/projects

# Criar novo projeto
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "novo",
    "title": "Novo",
    "shortDescription": "Desc",
    "fullDescription": "Descrição completa",
    "technologies": ["Next.js"],
    "category": "web",
    "thumbnail": "https://example.com/img.jpg"
  }'
```

---

## 🛠️ Troubleshooting

| Erro | Solução |
|------|---------|
| `Can't reach database` | Verifique se PostgreSQL está rodando: `sudo service postgresql status` |
| `ECONNREFUSED` | Mude DATABASE_URL em `.env.local` |
| `Database already exists` | Use outro nome ou execute `npm run db:reset` |
| `Prisma Client error` | Execute `npm run build` |
| Sementes não carregadas | Tente `npm run db:seed` novamente |

---

## 📚 Próximos Passos

- Integrar API em seus componentes
- Usar `src/lib/api-examples.ts` como referência
- Criar página admin com `ProjectsManager.tsx`
- Adicionar autenticação conforme necessário

---

**Tudo pronto! Aproveite sua API de projetos! 🎉**
