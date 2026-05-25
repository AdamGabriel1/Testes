#!/bin/bash
cd "$(dirname "$0")"
echo "🎮 eSports Manager - Iniciando Backend..."
echo ""

# Verificar se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 não encontrado. Instale o Python 3.8+"
    exit 1
fi

# Criar venv se não existir
if [ ! -d "venv" ]; then
    echo "📦 Criando ambiente virtual..."
    python3 -m venv venv
fi

# Ativar venv
echo "🔌 Ativando ambiente virtual..."
source venv/bin/activate

# Instalar dependências
echo "📥 Instalando dependências..."
pip install -r requirements.txt

# Iniciar servidor
echo ""
echo "🚀 Servidor iniciando em http://localhost:5000"
echo "📱 Abra o esports_api.html no navegador"
echo ""
python app.py
