#!/bin/bash
cd "$(dirname "$0")"
echo "🎮 eSports Manager - Next.js"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale o Node.js 18+"
    exit 1
fi

# Verificar node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Verificar Prisma client
if [ ! -d "node_modules/.prisma" ]; then
    echo "🔧 Gerando cliente Prisma..."
    npx prisma generate
fi

# Verificar banco de dados
if [ ! -f "prisma/dev.db" ]; then
    echo "🗄️  Criando banco de dados..."
    npx prisma db push
    echo "🌱 Populando dados de exemplo..."
    npm run db:seed
fi

echo ""
echo "🚀 Iniciando servidor..."
echo "📱 Acesse: http://localhost:3000"
echo ""
npm run dev
