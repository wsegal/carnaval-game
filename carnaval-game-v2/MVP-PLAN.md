# 🎯 MVP V2.0 - Plano de Desenvolvimento

## 🎮 Objetivo
Criar versão viciante com potencial real de monetização.

**Foco:** Elementos que fazem jogadores voltarem TODO DIA.

---

## 🏗️ Arquitetura (Orçamento Zero)

### Stack Tecnológico
- **HTML5** - Estrutura
- **CSS3** - Interface (sem frameworks, puro)
- **JavaScript Vanilla** - Lógica (sem dependências)
- **LocalStorage** - Save system
- **Canvas/SVG** - Gráficos procedurais

### Arte Placeholder
- **Emojis** - Personagens (🥁💃🎤🎨🎭)
- **Gradientes CSS** - Cartas e UI
- **Formas geométricas** - Ícones
- **Cores vibrantes** - Visual atrativo
- **Animações CSS** - Transições suaves

---

## 📋 MVP Features (Fase 1 - Semana 1)

### 🎴 SISTEMA GACHA (Prioridade 1)
**Objetivo:** Vício por colecionismo + monetização

- [ ] 30 personagens iniciais
  - 5 tipos: Ritmista, Passista, Carnavalesco, Compositor, Destaque
  - 4 raridades: Comum (60%), Raro (25%), Épico (12%), Lendário (3%)
  
- [ ] Sistema de Baús
  - Baú Bronze (grátis 1x/dia)
  - Baú Prata (100 gemas)
  - Baú Ouro (300 gemas)
  - Baú Lendário (1000 gemas, lendário garantido)
  
- [ ] Animação de abertura
  - Efeito de "reveal"
  - Partículas de celebração
  - Som de sucesso (web audio)

- [ ] Coleção visual
  - Grid de cartas
  - % de completude
  - Filtros por tipo/raridade

---

### 💎 MOEDAS E ECONOMIA (Prioridade 1)

**Duas moedas:**
1. **Estrelinhas ⭐** (grátis)
   - Ganhar por desfiles
   - Ganhar offline
   - Comprar upgrades básicos

2. **Gemas 💎** (premium)
   - Comprar baús
   - Acelerar tempo
   - Comprar com dinheiro real
   - Pequena quantidade grátis (login rewards)

**Preços iniciais:**
- Baú Prata: 100 💎
- Baú Ouro: 300 💎
- Acelerar 1h: 50 💎
- Energia +5: 20 💎

**Pacotes de Gemas:**
- 100 gemas: R$ 4,99
- 500 gemas: R$ 19,99 (melhor valor)
- 1200 gemas: R$ 39,99
- 3000 gemas: R$ 79,99

---

### 📈 PROGRESSÃO IDLE (Prioridade 1)

**Sistema de "Escola Idle":**
- Ganha ⭐ por segundo (idle income)
- Upgrades aumentam ganho/seg
- Máximo 12h de ganho offline
- Recompensa ao voltar ao jogo

**Níveis infinitos:**
- XP por desfile
- Level up → recompensas
- Cada 5 níveis → baú grátis
- Cada 10 níveis → gemas

**Prestigio (futuro):**
- Recomeçar mais forte
- Multiplicadores permanentes
- Skin exclusiva

---

### 🎁 LOGIN REWARDS (Prioridade 2)

**Recompensas Diárias:**
- Dia 1: 50 ⭐
- Dia 2: 100 ⭐
- Dia 3: 10 💎
- Dia 4: Baú Bronze
- Dia 5: 200 ⭐
- Dia 6: 20 💎
- Dia 7: Baú Prata + Personagem Épico

**Streak contador:**
- Visual chamativo
- "Não perca sua sequência!"
- Notificação se não jogar

---

### 🏆 RANKING BÁSICO (Prioridade 2)

**Tipos de Ranking:**
1. **Nível da Escola** (global)
2. **Total de Personagens** (colecionadores)
3. **Desfiles Vencidos** (competitivo)

**Recompensas:**
- Top 10: 500 💎
- Top 50: 200 💎
- Top 100: 100 💎
- Resets semanais

---

### 🎭 DESFILES SIMPLIFICADOS (Prioridade 3)

**Novo Sistema:**
1. Montar equipe (5 personagens)
2. Clicar "Desfilar" (automático)
3. Ver resultado (vitória/derrota)
4. Ganhar recompensas

**Recompensas:**
- ⭐ Estrelinhas
- XP para escola
- XP para personagens
- Chance de drop de baú

**Energia:**
- 10 energia máxima
- 1 desfile = 1 energia
- Regenera 1/30min
- Comprar energia: 20 💎 = +5

---

### 🎨 UI/UX VICIANTE (Prioridade 1)

**Princípios:**
1. **Clareza** - Saber o que fazer em 3 segundos
2. **Feedback** - Toda ação tem resposta visual
3. **Recompensas** - Números grandes, satisfação
4. **Urgência** - Timers, eventos limitados
5. **Progresso** - Barras, percentuais, próximo objetivo

**Telas principais:**
- 🏠 Home (status, ações rápidas)
- 🎴 Coleção (cartas)
- 🎁 Baús (gacha)
- 🎭 Desfiles (jogar)
- 🏆 Rankings
- 💎 Loja (monetização)
- ⚙️ Config

---

## 💰 SISTEMA DE MONETIZAÇÃO (Prioridade 2)

### Integração de Pagamentos

**Opção 1: Mercado Pago (Brasil)**
```javascript
// Checkout transparente
MercadoPago.setPublishableKey("PUBLIC_KEY");
// Processa pagamento
```

**Opção 2: Stripe (Global)**
```javascript
// Stripe Checkout
stripe.redirectToCheckout({
  lineItems: [{price: 'price_xxx', quantity: 1}]
});
```

**Opção 3: PayPal**
- SDK mais simples
- Confiável

**Para MVP:** Simular compras (localStorage), integrar pagamentos depois.

---

### Anúncios (Google AdMob Web)

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
```

**Implementação:**
- Anúncio rewarded (assistir = recompensa)
- Máximo 5x/dia
- Dobrar recompensa de desfile
- Ganhar 10 💎

---

## 📊 MÉTRICAS DE SUCESSO (MVP)

### KPIs Principais:
- **DAU** (Daily Active Users)
- **Retenção D1** (voltam no dia seguinte)
- **Retenção D7** (voltam após 1 semana)
- **Session Length** (tempo médio de jogo)
- **Conversion Rate** (% que compram)

### Metas MVP:
- 100 jogadores beta
- 40%+ retenção D1
- 20%+ retenção D7
- 10 min+ session length
- 2%+ conversion (aspiracional)

---

## 🗓️ CRONOGRAMA (3 Semanas)

### SEMANA 1: Core Loop
- [ ] Sistema de cartas/personagens (data)
- [ ] Sistema gacha (abertura de baús)
- [ ] UI básica (home, coleção, baús)
- [ ] Sistema de moedas
- [ ] Save/Load (LocalStorage)

### SEMANA 2: Progressão & Retenção
- [ ] Idle income
- [ ] Login rewards
- [ ] Energia & desfiles
- [ ] Níveis & XP
- [ ] Ranking básico

### SEMANA 3: Polimento & Monetização
- [ ] UI refinada
- [ ] Animações
- [ ] Sons (opcional)
- [ ] Loja de gemas (simulada)
- [ ] Anúncios (opcional)
- [ ] Balanceamento
- [ ] Testes

---

## 🎯 O Que NÃO Vai no MVP

**Deixar para V2.1+:**
- ❌ PvP real-time
- ❌ Clãs/Blocos
- ❌ Chat
- ❌ Eventos sazonais
- ❌ Battle Pass completo
- ❌ Sistema de crafting
- ❌ Mercado/trading
- ❌ Mais de 30 personagens
- ❌ Gráficos 3D
- ❌ Multiplayer

**Foco:** Gacha + Idle + Login Rewards + Rankings

---

## 📈 Roadmap Pós-MVP

### V2.1 (Semana 4-5)
- Eventos semanais
- 50 novos personagens
- Sistema de equipes (formação)
- Melhorias visuais

### V2.2 (Semana 6-8)
- Battle Pass
- PvP assíncrono
- Clãs básicos
- Melhorias de balanceamento

### V2.3 (Semana 9-12)
- Mobile app (PWA ou React Native)
- Integração pagamentos real
- Sistema de notificações
- Cross-platform sync

---

## 🚀 PRÓXIMA AÇÃO IMEDIATA

Criar estrutura base:
1. `index.html` - Interface principal
2. `game.js` - Lógica do jogo
3. `data.js` - Personagens & configurações
4. `ui.js` - Interface & animações
5. `storage.js` - Save system
6. `style.css` - Visual

**COMEÇANDO AGORA!** 🔥
