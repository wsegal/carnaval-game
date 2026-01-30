# 🔄 Guia de Versionamento - Carnaval Game

## 📋 Estratégia de Branches

### Branch Principal
```
main (produção estável)
  ↓
develop (desenvolvimento ativo)
  ↓
feature/* (novas features)
```

---

## 🌿 Estrutura de Branches

### `main`
- **Produção estável**
- Sempre deployável
- Apenas merge via Pull Request
- Protected branch

### `develop`
- **Desenvolvimento ativo**
- Integração contínua
- Base para novas features
- Merge quando feature completa

### `feature/nome-da-feature`
- **Novas funcionalidades**
- Baseadas em `develop`
- Merge para `develop` quando pronta
- Deletar após merge

Exemplos:
- `feature/gacha-system`
- `feature/battle-pass`
- `feature/pvp-arena`

### `hotfix/nome-do-fix`
- **Correções urgentes**
- Baseadas em `main`
- Merge direto para `main` e `develop`
- Deletar após merge

Exemplos:
- `hotfix/crash-desfile`
- `hotfix/payment-bug`

---

## 🏷️ Versionamento Semântico

Formato: `vMAJOR.MINOR.PATCH`

### MAJOR (v2.0.0)
- Mudanças incompatíveis
- Reformulação completa
- Breaking changes

Exemplo: V1 → V2 (sistema gacha)

### MINOR (v1.1.0)
- Novas features (compatível)
- Adições importantes
- Sem quebrar existente

Exemplo: v1.0.0 → v1.1.0 (adicionar rankings)

### PATCH (v1.0.1)
- Bug fixes
- Pequenas melhorias
- Correções

Exemplo: v1.0.0 → v1.0.1 (corrigir crash)

---

## 📅 Roadmap de Versões

### ✅ v1.0.0 (30/01/2026) - MVP 3D
- Sambódromo 3D completo
- 20 espaços publicitários
- Integração 2D ↔ 3D
- Sistema de tracking básico

### 📋 v1.1.0 (Planejado) - Melhorias V1
- Sons do desfile
- Mais carros alegóricos
- Sistema de replay
- Google AdSense integrado

### 🚀 v2.0.0 (Em planejamento) - Reformulação Completa
- Sistema Gacha (200+ personagens)
- Progressão Idle
- PvP e Rankings
- Battle Pass
- Eventos limitados
- **Potencial: R$ 50k-1M/mês**

### 🔮 v2.1.0 (Futuro)
- Clãs/Blocos
- Chat integrado
- Mercado de trading
- Cross-platform (mobile)

### 🌟 v3.0.0 (Futuro distante)
- Multiplayer real-time
- VR/WebXR
- Streaming de desfiles
- NFTs (?)

---

## 🔧 Workflow de Desenvolvimento

### 1. Criar Feature
```bash
git checkout develop
git pull origin develop
git checkout -b feature/nova-feature
```

### 2. Desenvolver
```bash
# Fazer mudanças
git add .
git commit -m "feat: adicionar nova feature"
```

### 3. Finalizar
```bash
git checkout develop
git merge feature/nova-feature
git push origin develop
git branch -d feature/nova-feature
```

### 4. Release
```bash
git checkout main
git merge develop
git tag -a v1.1.0 -m "v1.1.0 - Descrição"
git push origin main --tags
```

---

## 📝 Convenção de Commits

### Formato:
```
tipo(escopo): descrição curta

[corpo opcional]

[rodapé opcional]
```

### Tipos:
- `feat:` - Nova feature
- `fix:` - Bug fix
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Tarefas gerais

### Exemplos:
```bash
feat(gacha): adicionar sistema de baús premium
fix(desfile): corrigir crash ao pausar
docs(readme): atualizar guia de instalação
style(ui): ajustar cores do botão
refactor(game): otimizar loop de animação
```

---

## 🏷️ Tags Existentes

### v1.0.0 (30/01/2026)
- MVP 3D completo
- Sistema de monetização básico
- Integração 2D ↔ 3D

---

## 📊 Checklist de Release

Antes de fazer release (main):

- [ ] Todos os testes passando
- [ ] Documentação atualizada
- [ ] CHANGELOG.md atualizado
- [ ] README.md revisado
- [ ] Performance testada (mobile + desktop)
- [ ] Sem bugs críticos
- [ ] Aprovado pelo owner (Segal)

---

## 🚀 Deploy Automático (Futuro)

### GitHub Actions (planejado)
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: vercel --prod
```

---

## 📞 Dúvidas?

Consultar ClawdMan AI para ajustes na estratégia de versionamento!

---

**Última atualização:** 30/01/2026
