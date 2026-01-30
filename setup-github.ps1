# 🚀 Script de Setup Automático do GitHub

Write-Host "🎭 CARNAVAL GAME - Setup do GitHub" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está no diretório correto
if (-not (Test-Path ".git")) {
    Write-Host "❌ Erro: Não está em um repositório Git!" -ForegroundColor Red
    Write-Host "Execute este script na pasta: C:\Users\stefa\clawd" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Repositório Git encontrado!" -ForegroundColor Green
Write-Host ""

# Pedir informações
Write-Host "📋 Informações necessárias:" -ForegroundColor Yellow
Write-Host ""

$username = Read-Host "Seu username do GitHub (ex: segaltech)"
$token = Read-Host "Seu Personal Access Token (ou deixe vazio para criar manualmente)" -AsSecureString
$tokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($token))

$repoName = Read-Host "Nome do repositório (padrão: carnaval-game)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "carnaval-game"
}

$visibility = Read-Host "Visibilidade: (1) Public (2) Private (padrão: 1)"
if ([string]::IsNullOrWhiteSpace($visibility)) {
    $visibility = "1"
}
$isPrivate = if ($visibility -eq "2") { "true" } else { "false" }

Write-Host ""
Write-Host "📊 Configuração:" -ForegroundColor Cyan
Write-Host "  Username: $username"
Write-Host "  Repositório: $repoName"
Write-Host "  Visibilidade: $(if ($isPrivate -eq 'true') { 'Private' } else { 'Public' })"
Write-Host ""

$confirm = Read-Host "Confirma? (S/n)"
if ($confirm -eq "n" -or $confirm -eq "N") {
    Write-Host "❌ Cancelado pelo usuário" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "🚀 Iniciando configuração..." -ForegroundColor Green
Write-Host ""

# Criar repositório no GitHub (se token fornecido)
if (-not [string]::IsNullOrWhiteSpace($tokenPlain)) {
    Write-Host "📦 Criando repositório no GitHub via API..." -ForegroundColor Yellow
    
    $body = @{
        name = $repoName
        description = "Simulador de escola de samba com versões 2D e 3D"
        private = ($isPrivate -eq "true")
        has_issues = $true
        has_projects = $true
        has_wiki = $true
    } | ConvertTo-Json
    
    try {
        $headers = @{
            Authorization = "Bearer $tokenPlain"
            Accept = "application/vnd.github.v3+json"
        }
        
        $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" `
            -Method Post `
            -Headers $headers `
            -Body $body `
            -ContentType "application/json"
        
        Write-Host "✅ Repositório criado com sucesso!" -ForegroundColor Green
        Write-Host "   URL: $($response.html_url)" -ForegroundColor Cyan
        
        $repoUrl = $response.clone_url
    }
    catch {
        Write-Host "❌ Erro ao criar repositório via API" -ForegroundColor Red
        Write-Host "   Erro: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "💡 Crie manualmente em: https://github.com/new" -ForegroundColor Yellow
        $repoUrl = Read-Host "Cole a URL do repositório criado (ex: https://github.com/$username/$repoName.git)"
    }
}
else {
    Write-Host "⚠️ Token não fornecido. Criando URL manualmente..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📌 AÇÃO NECESSÁRIA:" -ForegroundColor Cyan
    Write-Host "   1. Abra: https://github.com/new" -ForegroundColor White
    Write-Host "   2. Nome: $repoName" -ForegroundColor White
    Write-Host "   3. Descrição: Simulador de escola de samba com versões 2D e 3D" -ForegroundColor White
    Write-Host "   4. Visibilidade: $(if ($isPrivate -eq 'true') { 'Private' } else { 'Public' })" -ForegroundColor White
    Write-Host "   5. NÃO marque 'Initialize with README'" -ForegroundColor Yellow
    Write-Host "   6. Clique 'Create repository'" -ForegroundColor White
    Write-Host ""
    
    $continue = Read-Host "Criou o repositório? (S para continuar)"
    if ($continue -ne "S" -and $continue -ne "s") {
        Write-Host "❌ Cancelado. Execute novamente quando criar o repo." -ForegroundColor Red
        exit 0
    }
    
    $repoUrl = "https://github.com/$username/$repoName.git"
}

Write-Host ""
Write-Host "🔗 Conectando repositório local ao GitHub..." -ForegroundColor Yellow

# Adicionar remote
try {
    git remote add origin $repoUrl 2>$null
    Write-Host "✅ Remote 'origin' adicionado" -ForegroundColor Green
}
catch {
    Write-Host "⚠️ Remote já existe, atualizando..." -ForegroundColor Yellow
    git remote set-url origin $repoUrl
}

# Verificar branch atual
$currentBranch = git branch --show-current

# Renomear para main se necessário
if ($currentBranch -ne "main") {
    Write-Host "🔄 Renomeando branch $currentBranch para main..." -ForegroundColor Yellow
    git branch -M main
    Write-Host "✅ Branch renomeada" -ForegroundColor Green
}

# Push inicial
Write-Host ""
Write-Host "⬆️ Fazendo push inicial..." -ForegroundColor Yellow
try {
    git push -u origin main --tags
    Write-Host "✅ Push realizado com sucesso!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Erro no push. Tentando com credenciais..." -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Se pedir senha, use seu Personal Access Token" -ForegroundColor Yellow
    git push -u origin main --tags
}

# Push branch develop
Write-Host ""
Write-Host "⬆️ Fazendo push da branch develop..." -ForegroundColor Yellow
try {
    git push origin develop
    Write-Host "✅ Branch develop enviada!" -ForegroundColor Green
}
catch {
    Write-Host "⚠️ Branch develop não existe ou já foi enviada" -ForegroundColor Yellow
}

# Push branch feature
Write-Host ""
Write-Host "⬆️ Fazendo push da branch feature/v2-mvp-base..." -ForegroundColor Yellow
try {
    git push origin feature/v2-mvp-base
    Write-Host "✅ Branch feature enviada!" -ForegroundColor Green
}
catch {
    Write-Host "⚠️ Branch feature não existe ou já foi enviada" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 CONFIGURAÇÃO COMPLETA!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Resumo:" -ForegroundColor Cyan
Write-Host "  ✅ Repositório: https://github.com/$username/$repoName" -ForegroundColor White
Write-Host "  ✅ Remote configurado" -ForegroundColor White
Write-Host "  ✅ Push realizado" -ForegroundColor White
Write-Host "  ✅ Tags enviadas" -ForegroundColor White
Write-Host "  ✅ Branches enviadas" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Acesse seu repositório:" -ForegroundColor Cyan
Write-Host "   https://github.com/$username/$repoName" -ForegroundColor Yellow
Write-Host ""
Write-Host "📚 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Configurar branch protection (Settings → Branches)" -ForegroundColor White
Write-Host "   2. Adicionar colaboradores (se houver)" -ForegroundColor White
Write-Host "   3. Configurar deploy automático (opcional)" -ForegroundColor White
Write-Host ""
Write-Host "✨ Pronto para desenvolver!" -ForegroundColor Green
