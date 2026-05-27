# 🎮 eSports Manager - Frontend (Next.js 15)

Frontend moderno do eSports Manager, construído com Next.js 15, React 19, Tailwind CSS e Recharts.

## 🚀 Stack Tecnológico

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Next.js | 15.1 | Framework React com App Router |
| React | 19.0 | UI Library |
| TypeScript | 5.7 | Tipagem estática |
| Tailwind CSS | 4.0 | Estilização utility-first |
| Recharts | 2.15 | Gráficos e visualizações |
| Lucide React | 0.46 | Ícones |

## 📁 Estrutura

```
frontend/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Página principal (todas as abas)
│   └── globals.css      # Estilos globais + Tailwind
├── lib/
│   └── utils.ts         # Utilitários + tipos + API client
├── components/
│   └── ui/              # Componentes reutilizáveis (futuro)
├── public/              # Assets estáticos
├── next.config.js       # Config + proxy para API
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Instalação

```bash
cd frontend
npm install
# ou
yarn install
# ou
pnpm install
```

## ▶️ Executar

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build
npm start
```

Acesse: http://localhost:3000

## 🔗 Proxy para API

O `next.config.js` já configura um proxy para redirecionar chamadas `/api/*` para o backend FastAPI em `localhost:5000`:

```js
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:5000/api/:path*',
    },
  ];
}
```

Isso evita problemas de CORS em desenvolvimento.

## 🎨 Design System

- **Cores**: Paleta slate (fundo) + indigo/purple (acentos)
- **Cards**: `bg-slate-800/70` com `backdrop-blur-sm` e borda sutil
- **Botões**: Gradientes indigo→purple para primário, slate para secundário
- **Tabelas**: Hover suave com `bg-indigo-500/5`
- **Gráficos**: Recharts com tema escuro customizado

## 📱 Funcionalidades

- ✅ **Colocações**: CRUD completo com filtros e ordenação
- ✅ **Jogadores**: CRUD completo com filtros por mês e time
- ✅ **Dashboard**: 4 gráficos (barras, pizza, linha)
- ✅ **Exportação**: SQL e CSV via backend
- ✅ **Status da API**: Indicador online/offline
- ✅ **Toast notifications**: Feedback de operações
- ✅ **Modal**: Criação e edição unificada
