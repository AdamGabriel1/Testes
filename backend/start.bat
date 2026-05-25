@echo off
echo 🎮 eSports Manager - Iniciando Backend...
echo.

REM Verificar Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python não encontrado. Instale o Python 3.8+
    exit /b 1
)

REM Criar venv
if not exist "venv" (
    echo 📦 Criando ambiente virtual...
    python -m venv venv
)

REM Ativar e instalar
echo 🔌 Ativando ambiente virtual...
call venv\Scripts\activate.bat
echo 📥 Instalando dependências...
pip install -r requirements.txt

echo.
echo 🚀 Servidor iniciando em http://localhost:5000
echo 📱 Abra o esports_api.html no navegador
echo.
python app.py
