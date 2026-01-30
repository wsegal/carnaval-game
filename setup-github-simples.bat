@echo off
chcp 65001 >nul
echo.
echo 🎭 CARNAVAL GAME - Setup Rápido do GitHub
echo ==========================================
echo.

set /p username="Seu username do GitHub: "
set /p reponame="Nome do repositório (padrão: carnaval-game): "

if "%reponame%"=="" set reponame=carnaval-game

echo.
echo 📋 Configuração:
echo   Username: %username%
echo   Repositório: %reponame%
echo.
echo ⚠️ IMPORTANTE: Crie o repositório no GitHub primeiro!
echo    URL: https://github.com/new
echo    Nome: %reponame%
echo    NÃO marque "Initialize with README"
echo.
pause

echo.
echo 🔗 Conectando...
git remote add origin https://github.com/%username%/%reponame%.git

echo.
echo 🔄 Renomeando branch...
git branch -M main

echo.
echo ⬆️ Fazendo push...
git push -u origin main --tags

echo.
echo ⬆️ Enviando branch develop...
git push origin develop

echo.
echo ⬆️ Enviando branch feature...
git push origin feature/v2-mvp-base

echo.
echo ✅ PRONTO!
echo    https://github.com/%username%/%reponame%
echo.
pause
