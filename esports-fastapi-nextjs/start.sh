#!/bin/bash

# ============================================================
# eSports Manager - Start Script (Linux/Ubuntu)
# Inicia backend (FastAPI) e frontend (Next.js) simultaneamente
# ============================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🎮 eSports Manager - Iniciando...${NC}"
echo ""

# Verificar diretórios
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}❌ Erro: Diretórios 'backend' e/ou 'frontend' não encontrados.${NC}"
    echo -e "${YELLOW}💡 Execute na raiz do projeto.${NC}"
    exit 1
fi

# Verificar python3 e node
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python3 não encontrado. Instale: sudo apt install python3 python3-pip${NC}"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado.${NC}"
    exit 1
fi

# Criar venv se não existir
if [ ! -d "backend/venv" ]; then
    echo -e "${YELLOW}🔧 Criando ambiente virtual Python...${NC}"
    cd backend && python3 -m venv venv && cd ..
fi

# Instalar dependências do backend
echo -e "${BLUE}📥 Instalando dependências do backend...${NC}"
cd backend
source venv/bin/activate
pip install -q -r requirements.txt
cd ..

# Instalar dependências do frontend
echo -e "${BLUE}📥 Instalando dependências do frontend...${NC}"
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

echo -e "${GREEN}✅ Dependências OK!${NC}"
echo ""

# Função para parar tudo ao sair
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Parando servidores...${NC}"
    [ -n "$BACKEND_PID" ] && kill $BACKEND_PID 2>/dev/null || true
    [ -n "$FRONTEND_PID" ] && kill $FRONTEND_PID 2>/dev/null || true
    echo -e "${GREEN}👋 Pronto!${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Iniciar backend
echo -e "${GREEN}🚀 Iniciando Backend (FastAPI) na porta 5000...${NC}"
cd backend
source venv/bin/activate
python -m uvicorn main:app --host 0.0.0.0 --port 5000 --reload &
BACKEND_PID=$!
cd ..

sleep 3

if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${RED}❌ Falha ao iniciar o backend!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Backend rodando (PID: $BACKEND_PID)${NC}"
echo ""

# Iniciar frontend
echo -e "${GREEN}🚀 Iniciando Frontend (Next.js) na porta 3000...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

sleep 5

if ! kill -0 $FRONTEND_PID 2>/dev/null; then
    echo -e "${RED}❌ Falha ao iniciar o frontend!${NC}"
    cleanup
    exit 1
fi

echo -e "${GREEN}✅ Frontend rodando (PID: $FRONTEND_PID)${NC}"
echo ""

echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  🎮 eSports Manager está rodando!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  ${BLUE}Backend:${NC}  http://localhost:5000"
echo -e "  ${BLUE}Docs:${NC}     http://localhost:5000/docs"
echo -e "  ${BLUE}Frontend:${NC} http://localhost:3000"
echo ""
echo -e "  ${YELLOW}Pressione Ctrl+C para parar ambos${NC}"
echo ""

# Tornar portas públicas no Codespaces (se gh CLI estiver disponível)
if command -v gh &> /dev/null && [ -n "$CODESPACE_NAME" ]; then
    echo -e "${BLUE}🔓 Tornando portas públicas no Codespaces...${NC}"
    gh codespace ports visibility 5000:public -c $CODESPACE_NAME 2>/dev/null || true
    gh codespace ports visibility 3000:public -c $CODESPACE_NAME 2>/dev/null || true
    echo -e "${GREEN}✅ Portas públicas!${NC}"
fi

# Aguardar ambos os processos
wait $BACKEND_PID
wait $FRONTEND_PID
