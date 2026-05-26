# 🎮 eSports Manager - Next.js

Versão completa do projeto eSports Manager migrada para **Next.js 15** com **App Router**, **Prisma ORM** e **SQLite**.

## 📁 Estrutura do Projeto

```
esports-nextjs/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── colocacoes/
│   │   │   │   ├── route.ts          # GET, POST
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts      # PUT, DELETE
│   │   │   ├── jogadores/
│   │   │   │   ├── route.ts          # GET, POST
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts      # PUT, DELETE
│   │   │   ├── stats/
│   │   │   │   └── route.ts          # GET estatísticas
│   │   │   ├── dashboard/
│   │   │   │   └── route.ts          # GET dados dos gráficos
│   │   │   └── export/
│   │   │       ├── sql/
│   │   │       │   └── route.ts      # GET export SQL
│   │   │       └── csv/
│   │   │           └── route.ts      # GET export CSV
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── StatsCards.tsx
│   │   ├── ColocacoesTab.tsx
│   │   ├── JogadoresTab.tsx
│   │   ├── DashboardTab.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── TabButton.tsx
│   └── lib/
│       ├── prisma.ts                 # Cliente Prisma singleton
│       └── utils.ts                  # Utilitários (cn)
├── prisma/
│   ├── schema.prisma                 # Schema do banco
│   └── seed.ts                       # Dados de exemplo
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── .env
```

## 🚀 Como Rodar

### 1. Instalar dependências
```bash
cd esports-nextjs
npm install
```

### 2. Configurar o banco de dados
```bash
# Gerar o cliente Prisma e criar o banco
npx prisma db push

# Popular com dados de exemplo (opcional)
npm run db:seed
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

Acesse: **http://localhost:3000**

## 🛠️ Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run db:push` | Sincroniza schema com o banco |
| `npm run db:studio` | Abre Prisma Studio (GUI do banco) |
| `npm run db:seed` | Popula com dados de exemplo |

## 📊 Funcionalidades

- ✅ **Colocações**: CRUD completo de posições dos times (Q1, Q2, Q3)
- ✅ **Jogadores**: CRUD completo de estatísticas de kills
- ✅ **Dashboard**: Gráficos interativos com Recharts
- ✅ **Filtros**: Busca por texto, filtro por mês e time
- ✅ **Ordenação**: Clique nos headers das tabelas
- ✅ **Exportação**: SQL e CSV
- ✅ **Design**: Interface dark mode com Tailwind CSS

## 🔄 Comparação com a versão original (Flask)

| Aspecto | Flask (Original) | Next.js (Nova) |
|---------|------------------|----------------|
| Backend | Flask + SQLite manual | Next.js API Routes + Prisma |
| Frontend | HTML + JS vanilla | React + TypeScript |
| Estilização | Tailwind CDN | Tailwind CSS v4 |
| Gráficos | Chart.js | Recharts |
| Ícones | Font Awesome | Lucide React |
| ORM | SQL manual | Prisma |
| Type Safety | ❌ | ✅ TypeScript |
| SSR/SSG | ❌ | ✅ Next.js App Router |

## 📝 Licença

MIT
