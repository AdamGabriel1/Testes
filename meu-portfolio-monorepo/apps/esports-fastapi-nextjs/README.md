# 🎮 eSports Manager - FastAPI + Next.js

Projeto completo de gerenciamento de estatísticas de eSports, migrado de Flask + HTML vanilla para **FastAPI + Next.js** separados.

## 🏗️ Arquitetura

```
esports-fastapi-nextjs/
├── backend/                 # FastAPI (Python)
│   ├── main.py             # API REST completa
│   ├── requirements.txt    # Dependências Python
│   ├── esports.db         # Banco SQLite (copiar do projeto original)
│   └── README.md
│
└── frontend/               # Next.js 15 (React + TypeScript)
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx        # App completo (Colocações, Jogadores, Dashboard)
    │   └── globals.css
    ├── lib/
    │   └── utils.ts        # Tipos, API client, utilitários
    ├── next.config.js      # Proxy para API
    ├── package.json
    └── README.md
```

## 🚀 Por que essa arquitetura?

| Aspecto | Antes (Flask + HTML) | Agora (FastAPI + Next.js) |
|---------|---------------------|---------------------------|
| **Performance** | Síncrono, bloqueante | Assíncrono, não-bloqueante |
| **Documentação** | Nenhuma | Swagger/ReDoc automático |
| **Validação** | Manual | Pydantic nativo |
| **Type Safety** | Nenhuma | TypeScript + Pydantic |
| **SSR/SEO** | Não | Next.js App Router |
| **Componentes** | HTML vanilla | React reutilizáveis |
| **Gráficos** | Chart.js manual | Recharts integrado |
| **Escalabilidade** | Monolito | Backend/Frontend separados |

## 🛠️ Setup Completo

### 1. Backend (FastAPI)

```bash
cd backend

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Copiar o banco de dados do projeto original
cp /caminho/do/projeto/original/esports.db .

# Iniciar servidor
uvicorn main:app --reload --host 0.0.0.0 --port 5000
```

### 2. Frontend (Next.js)

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### 3. Acessar

- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000
- **Docs Swagger**: http://localhost:5000/docs
- **Docs ReDoc**: http://localhost:5000/redoc

## 📡 API Endpoints

Todos os endpoints retornam JSON e possuem validação automática via Pydantic:

### Colocações
- `GET /api/colocacoes?mes=&search=` - Listar com filtros
- `POST /api/colocacoes` - Criar (body: ColocacaoCreate)
- `PUT /api/colocacoes/{id}` - Atualizar
- `DELETE /api/colocacoes/{id}` - Deletar

### Jogadores
- `GET /api/jogadores?mes=&time=&search=` - Listar com filtros
- `POST /api/jogadores` - Criar (body: JogadorCreate)
- `PUT /api/jogadores/{id}` - Atualizar
- `DELETE /api/jogadores/{id}` - Deletar

### Dashboard & Export
- `GET /api/stats` - Estatísticas gerais
- `GET /api/dashboard` - Dados para gráficos
- `GET /api/export/sql` - Exportar SQL
- `GET /api/export/csv` - Exportar CSV

## 🎨 Funcionalidades do Frontend

- **3 Abas**: Colocações, Jogadores, Dashboard
- **CRUD Completo**: Criar, editar, excluir com modal
- **Filtros**: Busca textual + filtro por mês/time
- **Ordenação**: Clique nos headers das tabelas
- **Dashboard**: 4 gráficos interativos (Recharts)
- **Exportação**: SQL e CSV com um clique
- **Status API**: Indicador visual online/offline
- **Toast Notifications**: Feedback em tempo real
- **Design Dark**: Tema escuro moderno com Tailwind

## 🔒 Validação de Dados

### FastAPI (Pydantic)
```python
class ColocacaoCreate(BaseModel):
    Mes: str = Field(..., min_length=1, max_length=20)
    Dia: int = Field(..., ge=1, le=31)
    Time: str = Field(..., min_length=1, max_length=100)
    Q1_Pos: int = Field(..., ge=1, le=20)
    # ... validação automática!
```

### TypeScript
```typescript
type Colocacao = {
  id: number;
  Mes: string;
  Dia: number;
  Time: string;
  Q1_Pos: number;
  Q2_Pos: number;
  Q3_Pos: number;
};
```

## 🔄 Fluxo de Dados

```
┌─────────────┐     HTTP/JSON      ┌─────────────┐
│  Next.js    │ ◄────────────────► │   FastAPI   │
│  (Frontend) │    fetch()         │  (Backend)  │
│  localhost  │                    │  localhost  │
│   :3000     │                    │   :5000     │
└─────────────┘                    └──────┬──────┘
                                          │
                                    ┌─────┴─────┐
                                    │ SQLite    │
                                    │ esports.db│
                                    └───────────┘
```

## 🚢 Deploy

### Backend (Railway/Render/Fly.io)
```bash
# Dockerfile simples
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend (Vercel)
```bash
# Push para GitHub e conectar na Vercel
# ou
vercel --prod
```

## 📚 Recursos

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Pydantic](https://docs.pydantic.dev/)
