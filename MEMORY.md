# MEMORY.md - Memória de Longo Prazo do ClawdMan

## 🧠 Contexto Geral

Assistente IA do Segal, analista senior de cyber security brasileiro morando em Portugal. Timezone: Europe/Lisbon.

---

## 📚 Projetos Criados

### 1. 🎯 Threat Intelligence Feed - Axur (n8n)

**Data:** Janeiro 2026  
**Status:** Setup completo, documentado

**Objetivo:**  
Workflow automatizado no n8n que busca threat intelligence da Axur e envia relatórios ao Teams.

**Features:**
- Executa toda segunda-feira às 9h
- Busca IOCs, TTPs, vulnerabilidades e threat actors
- Filtra por produtos relevantes (Fortigate, Palo Alto, Microsoft, Mimecast, Netskope, Sentinel One, Exabean, N8N)
- **Detecta zero-days** e envia alerta imediato
- Relatório semanal formatado enviado ao Teams

**Arquivos:**
- `threat-intel-setup.md` - Guia completo de configuração
- `threat-intel-workflow.json` - Workflow do n8n (pronto para importar)

**Tecnologias:**
- n8n (automação)
- Axur API (TAXII 2.1)
- Microsoft Teams (webhooks)

**Próximos passos sugeridos:**
- Integrar com SIEM (Sentinel, Splunk)
- Automação de resposta (bloqueio automático no firewall)
- Histórico de IOCs em banco de dados

---

### 2. 🎉 Carnaval Game

**Data:** Janeiro 2026  
**Status:** ✅ v1.0.0 (3D) COMPLETO | v1.1.1 (2D) Integrado

**Objetivo de Negócio:**  
💰 **Monetização via anúncios e microtransações** - ✅ IMPLEMENTADO

**Versão 3D (Nova!):**
- Sambódromo completo em Three.js
- 3 carros alegóricos + 120 passistas + 80 ritmistas
- **20 espaços publicitários com tracking**
- Sistema de cliques e receita (R$ 0.50/click)
- Integração perfeita com jogo 2D
- Performance otimizada (60 FPS desktop, 30+ mobile)
- Mobile responsivo

**Versão 2D (Existente):**  
Simulador de escola de samba - gestão, desfile, progressão entre grupos.
Agora com botão "Desfile 3D" integrado.

**Arquivos:**
- `carnaval-game-3d/` - Jogo 3D completo (52KB)
- `carnaval-game/` - Jogo 2D original

**Tecnologias:**
- Three.js r128 (engine 3D)
- JavaScript Vanilla
- LocalStorage (bridge)
- Canvas API (texturas)

**Desenvolvimento:**
- Método: Vibecoding 24/7
- Tempo: 3 horas (5 sprints completos)
- Status: Pronto para produção

**Arquivos principais:**
- `index.html` - Interface do jogo
- `game.js` - Lógica do jogo (22kb)
- `style.css` - Estilos
- `test-sound.html` - Testes de áudio

**Documentação:**
- `README.md` - Instruções gerais
- `CHANGELOG.md` - Histórico de mudanças
- `COMO-PUBLICAR.md` - Guia de publicação
- `MELHORIAS-v1.1.md` - Melhorias implementadas
- `CORRECOES-v1.1.1.md` - Correções da versão
- `DEBUG.md` - Troubleshooting

**Versão atual:** v1.1.1 (com correções de bugs)

---

## 🔧 Tecnologias & Skills

- **Cyber Security:** Threat Intelligence, IOCs, TTPs, MITRE ATT&CK
- **Automação:** n8n workflows
- **Desenvolvimento Web:** HTML, CSS, JavaScript
- **Integrações:** APIs REST, Webhooks, TAXII 2.1
- **Ferramentas:** Axur API, Microsoft Teams

---

## 📝 Convenções

- Documentação em português BR
- Commits descritivos
- READMEs sempre atualizados
- Separação clara entre setup e implementação

---

*Última atualização: 29/01/2026*
