@echo off
chcp 65001 >nul
echo.
echo 🚀 PUSH PARA GITHUB - wsegal/carnaval-game
echo ============================================
echo.
echo ✅ Remote configurado: https://github.com/wsegal/carnaval-game.git
echo.
echo 📝 IMPORTANTE: Quando pedir senha, use seu Personal Access Token!
echo    (NÃO use sua senha do GitHub)
echo.
echo    Username: wsegal
echo    Password: ghp_seu_token_aqui
echo.
echo 💡 Se não tem token, veja: GITHUB-TOKEN-GUIDE.md
echo.
pause

echo.
echo ⬆️ Fazendo push da branch main...
git push -u origin main --tags

echo.
echo ⬆️ Fazendo push da branch develop...
git push origin develop

echo.
echo ⬆️ Fazendo push da branch feature/v2-mvp-base...
git push origin feature/v2-mvp-base

echo.
echo.
echo ✅ PRONTO!
echo    Acesse: https://github.com/wsegal/carnaval-game
echo.
pause
