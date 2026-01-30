# 🎭 Carnaval 3D - Sambódromo

## 🚀 MVP - Primeira Demo

Primeira versão funcional do sambódromo 3D com espaços publicitários.

### ✅ Features Implementadas

#### 🏟️ Sambódromo
- Pista central (14m x 80m)
- Arquibancadas laterais (esquerda e direita)
- Iluminação noturna (RGB + lua)
- Chão e céu estrelado

#### 📺 Publicidade
- **20 espaços publicitários** (10 de cada lado)
- Banners de 4m x 2m
- Texturas placeholder coloridas
- Posicionamento estratégico ao longo da pista
- Animação de pulsar (sutil)

#### 🎥 Câmera
- **Modo Fixo:** Visão estática da avenida
- **Modo Seguindo:** Acompanha o desfile
- **Modo Cinemático:** Rotação 360° ao redor

#### 📊 HUD
- Contador de espaços publicitários
- FPS monitor (performance)
- Info do modo de câmera
- Painel de controles

---

## 🎮 Como Usar

### 1. Abrir o Jogo
Basta abrir `index.html` no navegador (Chrome recomendado).

### 2. Controles
- **📹 Câmera:** Alterna entre modos (Fixa / Seguindo / Cinemática)
- **🎊 Iniciar Desfile:** Liga/desliga animação (ainda sem elementos de desfile)
- **🔄 Resetar:** Volta câmera para posição inicial

---

## 🛠️ Tecnologias

- **Three.js r128** - Engine 3D
- **JavaScript Vanilla** - Lógica
- **HTML5 + CSS3** - Interface
- **CDN:** Three.js carregado via CloudFlare

---

## 📊 Performance

- **FPS Target:** 60 (desktop), 30+ (mobile)
- **Polígonos:** ~200 (muito leve!)
- **Texturas:** Canvas geradas dinamicamente (sem arquivos externos)
- **Carregamento:** < 2 segundos

---

## 🎯 Próximos Passos (Sprint 2)

### Elementos do Desfile
- [ ] 3 carros alegóricos (low-poly)
- [ ] Sistema de crowd (100+ passistas)
- [ ] Bateria (80 ritmistas)
- [ ] Animação de movimento (percorrer a pista)
- [ ] Efeitos visuais (confete, fumaça)

### Melhorias de Publicidade
- [ ] Sistema de troca de banners (upload de imagens)
- [ ] Painel admin para gerenciar anúncios
- [ ] Tracking de visualizações

---

## 🐛 Bugs Conhecidos

Nenhum até agora! 🎉

---

## 📝 Notas de Desenvolvimento

- Desenvolvido em **vibecoding 24/7** por ClawdMan AI
- Tempo de desenvolvimento: ~2 horas
- Código limpo e comentado
- Pronto para expandir

---

## 🚀 Testar Agora

```bash
# Opção 1: Abrir direto no navegador
index.html

# Opção 2: Servidor local (Python)
python -m http.server 8000

# Opção 3: Live Server (VSCode)
# Instalar extensão "Live Server" e clicar com botão direito no index.html
```

Acesse: `http://localhost:8000`

---

**Status:** ✅ MVP Funcional  
**Versão:** 0.1.0  
**Data:** 29/01/2026

🎭 Bora pro próximo sprint!
