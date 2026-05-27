# 🎮 eSports Manager - Backend (FastAPI)

Backend modernizado do eSports Manager, migrado de Flask para FastAPI.

## 🚀 Por que FastAPI?

| Recurso | Flask | FastAPI |
|---------|-------|---------|
| Performance | Síncrono (WSGI) | Assíncrono (ASGI) |
| Documentação | Manual | Swagger/ReDoc automático |
| Validação | Manual | Pydantic nativo |
| Type Hints | Opcional | Nativo |
| Auto-complete IDE | Ruim | Excelente |

## 📁 Estrutura

```
backend/
├── main.py              # Aplicação principal
├── requirements.txt     # Dependências
├── esports.db          # Banco SQLite (existente)
└── README.md
```

## 🛠️ Instalação

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## ▶️ Executar

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 5000
```

Acesse:
- API: http://localhost:5000
- Documentação Swagger: http://localhost:5000/docs
- Documentação ReDoc: http://localhost:5000/redoc

## 📡 Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/colocacoes` | Listar colocações |
| POST | `/api/colocacoes` | Criar colocação |
| PUT | `/api/colocacoes/{id}` | Atualizar colocação |
| DELETE | `/api/colocacoes/{id}` | Deletar colocação |
| GET | `/api/jogadores` | Listar jogadores |
| POST | `/api/jogadores` | Criar jogador |
| PUT | `/api/jogadores/{id}` | Atualizar jogador |
| DELETE | `/api/jogadores/{id}` | Deletar jogador |
| GET | `/api/stats` | Estatísticas gerais |
| GET | `/api/dashboard` | Dados para gráficos |
| GET | `/api/export/sql` | Exportar SQL |
| GET | `/api/export/csv` | Exportar CSV |

## 🔒 Validação Pydantic

Todas as entradas são validadas automaticamente:
- `Dia`: entre 1 e 31
- `Q1_Pos`, `Q2_Pos`, `Q3_Pos`: entre 1 e 20
- `Q1_Kills`, `Q2_Kills`, `Q3_Kills`: >= 0
- Strings não vazias com limites de tamanho
