# 🎯 ROADMAP - Carnaval Game 3D (Monetização)

## 💰 Objetivo Principal

Transformar o jogo em **3D** para criar **espaços publicitários** e monetizar via:
- Banners nas arquibancadas
- Publicidade nos camarotes
- Potencial para anúncios de vídeo
- Microtransações (skins, escolas especiais, etc.)

---

## 🎮 Visão do Jogo 3D

### Câmera e Perspectiva
- **Vista principal:** Perspectiva 3D da Marquês de Sapucaí
- **Câmera dinâmica:** Acompanha o desfile
- **Modo replay:** Permite ver de diferentes ângulos
- **Zoom nos detalhes:** Foco em alegorias, fantasias, bateria

### Elementos 3D Necessários

#### 🏟️ Sambódromo
- Arquibancadas laterais (L + R)
- Frisas e camarotes
- Pista central (80m de comprimento)
- Iluminação dinâmica
- Céu estrelado / ambiente noturno

#### 📺 Espaços Publicitários
**Arquibancadas:**
- Banners laterais (20+ posições)
- Painéis LED gigantes (2-3 principais)
- Telas de replay com ads

**Camarotes:**
- Branding nas fachadas
- Logos de patrocinadores
- Espaços VIP com marcas

**Durante Desfile:**
- Banner rotativo na parte inferior da tela
- Ads de vídeo entre rounds
- Product placement em alegorias (opcional)

#### 🎭 Elementos do Desfile
- Carros alegóricos (3-5 modelos)
- Passistas (animados, crowd system)
- Bateria (80-200 ritmistas)
- Comissão de frente
- Porta-bandeira e mestre-sala
- Efeitos: confete, fumaça, fogos

---

## 🛠️ Tecnologias Recomendadas

### Opção 1: **Three.js** ⭐ (Recomendado)
**Prós:**
- JavaScript puro (fácil de integrar com código atual)
- Grande comunidade
- Performance boa
- Funciona em mobile

**Contras:**
- Precisa construir tudo do zero
- Curva de aprendizado média

**Quando usar:** Controle total, performance otimizada

---

### Opção 2: **Babylon.js**
**Prós:**
- Engine completa (física, colisão, etc.)
- Editor visual integrado
- Sistema de iluminação avançado

**Contras:**
- Mais pesada que Three.js
- Overkill para esse projeto

**Quando usar:** Jogos complexos com física

---

### Opção 3: **Unity + WebGL Export**
**Prós:**
- Editor visual profissional
- Asset store (modelos prontos)
- Performance excelente

**Contras:**
- Build pesado para web
- Requer Unity (software extra)
- Curva de aprendizado alta

**Quando usar:** Projeto grande, time com experiência em Unity

---

### ✅ **Recomendação Final: Three.js**
Melhor custo-benefício para web, mobile, e monetização rápida.

---

## 📋 Plano de Implementação

### **FASE 1: Prova de Conceito (MVP 3D)** 🚀
*Tempo estimado: 2-3 semanas*

**Objetivo:** Criar o sambódromo básico com câmera e banners estáticos

**Tarefas:**
- [ ] Setup inicial do Three.js
- [ ] Criar cena 3D (céu, chão, iluminação)
- [ ] Modelar arquibancadas básicas (cubos texturizados)
- [ ] Adicionar 10 banners estáticos (texturas de teste)
- [ ] Câmera que percorre a avenida
- [ ] Testar performance (FPS)

**Entrega:** Demo funcional com espaços publicitários visíveis

---

### **FASE 2: Desfile Básico** 🎭
*Tempo estimado: 3-4 semanas*

**Objetivo:** Adicionar elementos do desfile (alegorias, passistas)

**Tarefas:**
- [ ] Criar 3 modelos de carros alegóricos
- [ ] Sistema de crowd (passistas como instanced meshes)
- [ ] Animação de movimento (desfile percorre a avenida)
- [ ] Adicionar bateria (80-200 ritmistas)
- [ ] Efeitos visuais (confete, luzes piscando)
- [ ] Sincronizar som com desfile

**Entrega:** Desfile completo com elementos visuais

---

### **FASE 3: Integração com Sistema Atual** 🔄
*Tempo estimado: 2 semanas*

**Objetivo:** Conectar o 3D com a lógica de jogo existente

**Tarefas:**
- [ ] Interface 2D sobreposta no 3D (HUD)
- [ ] Dashboard de gestão (mantém o 2D atual)
- [ ] Trigger de desfile inicia a cena 3D
- [ ] Passar dados (qualidade dos setores → visual 3D)
- [ ] Sistema de notas (aparece durante o desfile)

**Entrega:** Jogo completo 2D + 3D integrado

---

### **FASE 4: Monetização** 💰
*Tempo estimado: 2 semanas*

**Objetivo:** Implementar sistema de anúncios

**Tarefas:**
- [ ] Sistema de troca de banners (API ou manual)
- [ ] Integração com Google AdSense / AdMob
- [ ] Anúncios de vídeo (antes/depois do desfile)
- [ ] Analytics (rastrear visualizações de banners)
- [ ] Sistema de clique em banners (tracking)
- [ ] Painel admin para gerenciar anunciantes

**Entrega:** Sistema de monetização funcional

---

### **FASE 5: Polimento e Otimização** ✨
*Tempo estimado: 2 semanas*

**Objetivo:** Performance, mobile, UX

**Tarefas:**
- [ ] Otimizar modelos 3D (low-poly)
- [ ] LOD (Level of Detail) para mobile
- [ ] Compressão de texturas
- [ ] Loading screen bonito
- [ ] Controles touch para mobile
- [ ] Testes cross-browser
- [ ] Ajustes visuais finais

**Entrega:** Jogo pronto para produção

---

## 💵 Modelos de Monetização

### 1. **Anúncios Estáticos** (Mais Fácil)
- Vender espaços fixos por mês
- Banners nas arquibancadas
- Logos nos camarotes
- **Preço:** R$ 500 - R$ 2.000/mês por espaço

### 2. **Anúncios Dinâmicos via Google AdSense**
- Banners rotativos (mudando a cada partida)
- CPM (custo por mil impressões)
- Fácil de implementar
- **Receita estimada:** Depende do tráfego

### 3. **Vídeos Remunerados**
- Anúncio antes/depois do desfile
- Integração com Google AdMob (mobile)
- **Receita:** R$ 5 - R$ 50 por 1.000 visualizações

### 4. **Microtransações (Cash no Jogo)**
- Comprar verba extra (R$ 2,99)
- Desbloquear sambas especiais (R$ 1,99)
- Skins de fantasias premium (R$ 4,99)
- Carros alegóricos exclusivos (R$ 9,99)
- **Potencial:** Maior receita por usuário

### 5. **Patrocínios Diretos**
- Empresas reais patrocinam escolas
- Branding em alegorias
- Naming rights de setores
- **Preço:** R$ 5.000 - R$ 50.000/ano

---

## 📊 Estimativas

### Custos de Desenvolvimento
- **Freelancer (Three.js):** R$ 5.000 - R$ 15.000 (3 meses)
- **Developer interno:** R$ 10.000 - R$ 30.000 (3 meses)
- **Modelos 3D (comprar pronto):** R$ 500 - R$ 2.000
- **Hospedagem + CDN:** R$ 50 - R$ 200/mês

### Potencial de Receita (estimativa conservadora)
**Cenário 1: Jogo de Nicho (1.000 usuários/mês)**
- Anúncios: R$ 200 - R$ 500/mês
- Microtransações (2% conversion): R$ 100 - R$ 400/mês
- **Total:** R$ 300 - R$ 900/mês

**Cenário 2: Jogo Popular (10.000 usuários/mês)**
- Anúncios: R$ 2.000 - R$ 5.000/mês
- Microtransações (2% conversion): R$ 1.000 - R$ 4.000/mês
- Patrocínios: R$ 1.000 - R$ 5.000/mês
- **Total:** R$ 4.000 - R$ 14.000/mês

**Cenário 3: Viral (100.000 usuários/mês)**
- Anúncios: R$ 20.000 - R$ 50.000/mês
- Microtransações: R$ 10.000 - R$ 40.000/mês
- Patrocínios: R$ 10.000 - R$ 50.000/mês
- **Total:** R$ 40.000 - R$ 140.000/mês

---

## 🎯 Próximos Passos Imediatos

### 1. **Decidir Stack Tecnológico** ⭐
- [ ] Confirmar Three.js como engine
- [ ] Setup ambiente de dev

### 2. **Criar Protótipo Rápido**
- [ ] Sambódromo simples (cubos + texturas)
- [ ] 5 banners de teste
- [ ] Câmera animada
- [ ] Tempo: 1 semana

### 3. **Validar Viabilidade**
- [ ] Testar performance (FPS em mobile)
- [ ] Mostrar para potenciais anunciantes
- [ ] Decidir se vale a pena continuar

### 4. **Buscar Investimento / Parcerias** (Opcional)
- [ ] Pitch para empresas de publicidade
- [ ] Buscar desenvolvedores 3D
- [ ] Potenciais patrocinadores

---

## 📚 Recursos Úteis

### Tutoriais Three.js
- [Three.js Journey](https://threejs-journey.com/) - Curso completo
- [Three.js Docs](https://threejs.org/docs/) - Documentação oficial
- [Discover Three.js](https://discoverthreejs.com/) - Livro gratuito

### Modelos 3D
- [Sketchfab](https://sketchfab.com/) - Modelos prontos (alguns free)
- [TurboSquid](https://www.turbosquid.com/) - Marketplace 3D
- [Blender](https://www.blender.org/) - Software gratuito para criar modelos

### Monetização
- [Google AdSense](https://www.google.com/adsense/) - Anúncios web
- [Google AdMob](https://admob.google.com/) - Anúncios mobile
- [Unity Ads](https://unity.com/products/unity-ads) - Alternativa

---

## ✅ Decisão Necessária

**Segal, para seguir em frente, preciso saber:**

1. **Você quer fazer o 3D você mesmo ou contratar alguém?**
2. **Prazo desejado?** (1 mês? 3 meses? 6 meses?)
3. **Orçamento disponível?** (R$ 0 = DIY / R$ 10k+ = contratar)
4. **Prioridade 1:** Lançar rápido (MVP simples) ou fazer bem-feito?

Com essas respostas, posso criar um plano de ação mais específico! 🚀
