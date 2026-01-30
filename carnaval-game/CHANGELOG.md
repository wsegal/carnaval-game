# 📝 Changelog - Simulador de Escola de Samba

## [1.1.1] - 2026-01-29

### 🔧 Correções Críticas

#### Sistema de Som
- Adicionado `async/await` para inicialização do AudioContext
- Implementado `resume()` para contexts suspensos
- Verificação de estado antes de tocar som
- Console.log para debug em todas operações de som

#### Eventos Aleatórios
- Simplificado sistema de probabilidade (50% geral + escolha aleatória)
- Adicionado console.log detalhado durante desfile
- Melhorado feedback visual (cor + negrito por 3 segundos)
- Evento agora aparece na tela de resultados com detalhes

### 📚 Documentação
- Adicionado `DEBUG.md` - guia completo de troubleshooting
- Adicionado `test-sound.html` - teste isolado do sistema de som
- Adicionado `CORRECOES-v1.1.1.md` - detalhes das correções

### 🎨 Melhorias
- Indicador visual de evento nos resultados
- Dica no menu para abrir console (F12)
- Logs coloridos com emojis para debug
- Reset de estilos entre comentários do desfile

---

## [1.1.0] - 2026-01-29

### ✨ Novas Features

#### 🎵 Sistema de Som
- Adicionado efeitos sonoros usando Web Audio API
- Sons para: cliques, investimentos, desfile, sucesso e falha
- Botão para ligar/desligar som no menu principal
- Estado do som é salvo no localStorage

#### 📜 Mais Sambas-Enredo
- Expandido de 4 para **18 sambas únicos** na biblioteca
- 4 sambas aleatórios são apresentados a cada escolha
- Nomes mais variados e criativos

#### 🌧️ Eventos Aleatórios
- Sistema de eventos durante o desfile
- **5 tipos de eventos:**
  - 🌧️ **Chuva** (15% chance) → -5% nas notas
  - ⚡ **Apagão** (10% chance) → -8% nas notas
  - 🎤 **Problema no Som** (12% chance) → -6% nas notas
  - 🎭 **Surpresa Positiva** (8% chance) → +4% nas notas
  - 🔥 **Desfile Perfeito** (5% chance) → +6% nas notas
- Eventos são exibidos com cores especiais durante o desfile

#### 📈 Dificuldade Progressiva
- **Grupo de Acesso:** Jurados padrão
- **Série A:** Jurados 30% mais críticos (-0.3 nas notas base)
- **Grupo Especial:** Jurados 50% mais críticos (-0.5 nas notas base)
- Qualidade base dos sambas aumenta por grupo (60% → 70% → 80%)

### 🔧 Melhorias
- Melhor feedback visual nos eventos
- Sons contextuais para cada ação
- Save automático ao escolher samba
- Código refatorado e otimizado

### 📚 Documentação
- README atualizado com novas features
- Adicionado CHANGELOG.md

---

## [1.0.0] - 2026-01-29

### 🎉 Lançamento Inicial

#### ✅ Features Implementadas
- Sistema completo de criação de escola
- 6 quesitos para investir
- Progressão entre 3 grupos
- Sistema de save/load
- Interface responsiva
- Animações de desfile
- Avaliação dos jurados
- Sistema de classificação

#### 🎮 Mecânicas
- Gestão de recursos (dinheiro)
- Escolha de samba-enredo
- Investimento em setores
- Cálculo de notas baseado em qualidade
- Sistema de promoção/rebaixamento

#### 🎨 Visual
- Interface com tema de Carnaval
- Gradientes e animações
- Cores personalizáveis para escola
- Barras de progresso
- Feedback visual

---

## 🚀 Próximas Versões Planejadas

### [1.2.0] - A definir
- [ ] Músicas de samba reais (MP3)
- [ ] Mais quesitos (Enredo, Mestre-Sala)
- [ ] Sistema de patrocínios
- [ ] Carnavalescos e compositores famosos

### [2.0.0] - A definir
- [ ] Ranking de escolas (IA)
- [ ] Conquistas e desafios
- [ ] Versão mobile otimizada
- [ ] Multiplayer online
