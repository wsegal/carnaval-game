# 🔑 Como Criar um Personal Access Token no GitHub

## Passo a Passo

### 1. Acessar Configurações
1. Fazer login no GitHub (https://github.com)
2. Clicar no seu avatar (canto superior direito)
3. Clicar em **"Settings"**

### 2. Developer Settings
1. No menu lateral esquerdo, rolar até o final
2. Clicar em **"Developer settings"**

### 3. Personal Access Tokens
1. Clicar em **"Personal access tokens"**
2. Clicar em **"Tokens (classic)"**
3. Clicar no botão **"Generate new token"**
4. Escolher **"Generate new token (classic)"**

### 4. Configurar Token
**Note (nome):** `Carnaval Game - ClawdBot`

**Expiration:** 90 days (ou No expiration se preferir)

**Scopes (permissões necessárias):**
- ✅ **repo** (todos os sub-itens)
  - ✅ repo:status
  - ✅ repo_deployment
  - ✅ public_repo
  - ✅ repo:invite
  - ✅ security_events
  
- ✅ **workflow**
- ✅ **write:packages**
- ✅ **delete:packages**

### 5. Gerar e Copiar
1. Rolar até o final da página
2. Clicar em **"Generate token"**
3. ⚠️ **IMPORTANTE:** Copiar o token AGORA
   - Formato: `ghp_xxxxxxxxxxxxxxxxxxxx`
   - Você NÃO poderá ver novamente!
4. Salvar em local seguro (gerenciador de senhas)

---

## Como Usar o Token

### Opção 1: Script PowerShell
```powershell
.\setup-github.ps1
```
Cole o token quando solicitado.

### Opção 2: Manual
```bash
git remote add origin https://github.com/SEU-USER/carnaval-game.git
git push -u origin main --tags

# Quando pedir senha, use o TOKEN (não sua senha)
Username: seu-username
Password: ghp_seu_token_aqui
```

### Opção 3: Git Credential Manager
```bash
git config --global credential.helper manager
git push
```
Na primeira vez, abrirá janela para login. Use o token.

---

## Segurança

⚠️ **NUNCA compartilhe seu token!**
⚠️ **NUNCA commite o token no código!**
⚠️ **Trate como se fosse sua senha!**

✅ Salve em gerenciador de senhas
✅ Use tokens com permissões mínimas necessárias
✅ Defina expiração (90 dias recomendado)
✅ Revogue tokens antigos que não usa mais

---

## Troubleshooting

### "Bad credentials"
- Token expirado ou inválido
- Gere novo token

### "Permission denied"
- Escopo insuficiente
- Gere novo com permissão "repo"

### Token não funciona
- Verifique se copiou completamente
- Não pode ter espaços extras
- Começa com `ghp_`

---

## Alternativa: SSH

Se preferir não usar tokens:

1. Gerar chave SSH
```bash
ssh-keygen -t ed25519 -C "seu-email@example.com"
```

2. Adicionar no GitHub
- Settings → SSH and GPG keys → New SSH key
- Copiar conteúdo de `~/.ssh/id_ed25519.pub`

3. Usar URL SSH
```bash
git remote set-url origin git@github.com:usuario/repo.git
```

---

Pronto! 🎉
