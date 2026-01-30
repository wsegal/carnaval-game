# 🚀 Setup do GitHub - Guia Completo

## ✅ Git Configurado Localmente

Repositório Git já está pronto com:
- [x] Git inicializado
- [x] Commits feitos (3 commits)
- [x] Tag v1.0.0 criada
- [x] Branch `develop` criada
- [x] `.gitignore` configurado
- [x] Documentação completa

---

## 📦 Próximo Passo: Conectar ao GitHub

### 1️⃣ Criar Repositório no GitHub

**Opção A: Via Web (Recomendado)**
1. Ir em: https://github.com/new
2. **Nome:** `carnaval-game` (ou outro nome)
3. **Descrição:** Simulador de escola de samba com versões 2D e 3D
4. **Visibilidade:** Public ou Private (você escolhe)
5. **NÃO marcar** "Initialize with README" (já temos!)
6. Clicar **"Create repository"**

**Opção B: Via GitHub CLI**
```bash
gh repo create carnaval-game --public --source=. --remote=origin
```

---

### 2️⃣ Conectar Repositório Local com GitHub

Após criar o repo no GitHub, copie a URL (ex: `https://github.com/SEU-USER/carnaval-game.git`)

```bash
# Adicionar remote
git remote add origin https://github.com/SEU-USER/carnaval-game.git

# Verificar remote
git remote -v

# Renomear branch para main (padrão GitHub)
git branch -M main

# Push inicial (com tags)
git push -u origin main --tags

# Push branch develop
git push origin develop
```

---

### 3️⃣ Configurar Branch Protegida (Opcional)

No GitHub:
1. Settings → Branches
2. Add rule
3. Branch name pattern: `main`
4. Marcar:
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass
5. Save

---

## 🔄 Workflow Diário

### Trabalhar em Nova Feature

```bash
# 1. Atualizar develop
git checkout develop
git pull origin develop

# 2. Criar branch de feature
git checkout -b feature/nome-da-feature

# 3. Desenvolver (fazer mudanças)
git add .
git commit -m "feat: descrição da mudança"

# 4. Push da feature
git push origin feature/nome-da-feature

# 5. Criar Pull Request no GitHub
# (via interface web)

# 6. Após aprovação e merge, deletar branch local
git checkout develop
git pull origin develop
git branch -d feature/nome-da-feature
```

---

### Fazer Release

```bash
# 1. Merge develop → main
git checkout main
git pull origin main
git merge develop

# 2. Criar tag
git tag -a v1.1.0 -m "v1.1.0 - Descrição do release"

# 3. Push com tags
git push origin main --tags

# 4. Criar Release no GitHub
# Settings → Releases → Draft a new release
# Selecionar tag v1.1.0
# Adicionar notas do release
# Publish release
```

---

### Correção Urgente (Hotfix)

```bash
# 1. Branch de hotfix a partir de main
git checkout main
git checkout -b hotfix/nome-do-fix

# 2. Corrigir bug
git add .
git commit -m "fix: correção urgente"

# 3. Merge para main E develop
git checkout main
git merge hotfix/nome-do-fix
git push origin main

git checkout develop
git merge hotfix/nome-do-fix
git push origin develop

# 4. Tag patch
git tag -a v1.0.1 -m "v1.0.1 - Hotfix"
git push origin main --tags

# 5. Deletar branch
git branch -d hotfix/nome-do-fix
```

---

## 📊 Comandos Úteis

### Ver Status
```bash
git status              # Mudanças locais
git log --oneline -10   # Últimos 10 commits
git branch -a           # Todas as branches
git tag                 # Todas as tags
```

### Comparar Versões
```bash
git diff v1.0.0 v1.1.0  # Diferenças entre tags
git log v1.0.0..HEAD    # Commits desde v1.0.0
```

### Desfazer Mudanças
```bash
git restore arquivo.js           # Descartar mudanças não commitadas
git reset HEAD~1                 # Desfazer último commit (manter mudanças)
git reset --hard HEAD~1          # Desfazer último commit (apagar mudanças)
git revert <commit-hash>         # Reverter commit específico
```

---

## 🔐 Autenticação GitHub

### Via HTTPS (Mais Fácil)
1. Usar Personal Access Token
2. GitHub → Settings → Developer settings → Tokens
3. Generate new token (classic)
4. Copiar token
5. Usar como senha no `git push`

### Via SSH (Mais Seguro)
```bash
# Gerar chave SSH
ssh-keygen -t ed25519 -C "seu-email@example.com"

# Copiar chave pública
cat ~/.ssh/id_ed25519.pub

# Adicionar no GitHub
# Settings → SSH and GPG keys → New SSH key

# Trocar remote para SSH
git remote set-url origin git@github.com:SEU-USER/carnaval-game.git
```

---

## 🌐 Integração com Vercel (Deploy Automático)

1. Conectar Vercel ao GitHub
2. Importar repositório `carnaval-game`
3. Configurar:
   - Framework: Other
   - Root Directory: `carnaval-game-3d`
   - Build Command: (vazio)
   - Output Directory: `./`
4. Deploy!

Resultado: A cada push em `main`, deploy automático! 🚀

---

## 📝 Exemplo de Pull Request

**Título:**
```
feat: adicionar sistema de gacha
```

**Descrição:**
```
## 🎯 Objetivo
Implementar sistema de baús e cartas colecionáveis

## ✨ Mudanças
- Adicionar 50 personagens base
- Sistema de baús (bronze, prata, ouro)
- Drop rates configuráveis
- UI de abertura de baú

## 🧪 Testes
- [x] Testar drop rates
- [x] Testar UI em mobile
- [x] Verificar performance

## 📸 Screenshots
(adicionar imagens)

## 🔗 Issue
Closes #123
```

---

## 🎯 Checklist de Setup

- [ ] Criar repositório no GitHub
- [ ] Conectar remote (`git remote add origin ...`)
- [ ] Push inicial (`git push -u origin main --tags`)
- [ ] Push branch develop
- [ ] Configurar branch protegida (opcional)
- [ ] Adicionar colaboradores (se houver)
- [ ] Configurar deploy automático (Vercel)
- [ ] Adicionar README badges (opcional)

---

## 🆘 Problemas Comuns

### Erro: "remote already exists"
```bash
git remote remove origin
git remote add origin URL-NOVA
```

### Erro: "rejected (non-fast-forward)"
```bash
git pull origin main --rebase
git push origin main
```

### Esqueci de fazer branch de feature
```bash
git stash                          # Salvar mudanças
git checkout -b feature/nome       # Criar branch
git stash pop                      # Recuperar mudanças
```

---

## 📊 Status Atual

```
✅ Git configurado (local)
⏳ Aguardando: Criar repo no GitHub
⏳ Aguardando: Fazer push inicial
```

---

## 🚀 Próxima Ação

**Você precisa:**
1. Criar repositório no GitHub (https://github.com/new)
2. Copiar URL do repositório
3. Executar:
```bash
git remote add origin https://github.com/SEU-USER/carnaval-game.git
git push -u origin main --tags
git push origin develop
```

Depois disso, está tudo pronto! 🎉

---

**Quer que eu crie o repositório via API do GitHub?** (Se você tiver token)
