# 🐛 Guia de Debug - Sistema de Som e Eventos

## 🔊 TESTANDO O SOM

### Passo 1: Abrir o Console do Navegador
1. Aperte **F12** (ou Ctrl+Shift+I / Cmd+Option+I no Mac)
2. Clique na aba **Console**

### Passo 2: Verificar Logs
Ao abrir o jogo, você deve ver:
```
🎮 Jogo inicializado!
🔊 Sistema de som: ATIVADO
```

### Passo 3: Testar Som Manualmente
No console, digite:
```javascript
game.playSound('click')
```

Se funcionar, você ouvirá um "beep" curto.

### Passo 4: Verificar AudioContext
No console, digite:
```javascript
game.audioContext
```

Você deve ver algo como:
```
AudioContext {state: "running", ...}
```

**Se aparecer "suspended"**, digite:
```javascript
await game.initAudio()
```

### Problemas Comuns:

#### ❌ Som não toca
**Causa:** Navegadores bloqueiam som até interação do usuário
**Solução:** 
1. Clique em qualquer botão do jogo primeiro
2. Depois teste o som novamente

#### ❌ Erro "AudioContext is not defined"
**Causa:** Navegador muito antigo
**Solução:** Use Chrome, Firefox ou Edge atualizado

#### ❌ "AudioContext is suspended"
**Causa:** Política do navegador
**Solução:** 
```javascript
await game.audioContext.resume()
```

---

## 🌧️ TESTANDO EVENTOS ALEATÓRIOS

### Verificar Logs Durante Desfile

Quando você clicar em "Iniciar Desfile", verá no console:

```
🎊 Iniciando desfile...
📢 Comentário 1: A escola está entrando na avenida...
📢 Comentário 2: A bateria está dando um show!
📢 Comentário 3: As alegorias impressionam o público!
📢 Comentário 4: A comissão de frente encanta os jurados!
🎲 Tentando evento aleatório...
```

**Se evento acontecer:**
```
⚡ EVENTO: 🌧️ CHUVA! Efeito: -5
```

**Se não acontecer:**
```
❌ Nenhum evento desta vez
```

### Forçar Evento Manualmente

No console, antes de clicar em "Iniciar Desfile":

```javascript
// Forçar evento específico
game.state.currentEvent = game.randomEvents[0]  // Chuva
game.state.currentEvent = game.randomEvents[1]  // Apagão
game.state.currentEvent = game.randomEvents[2]  // Problema no som
game.state.currentEvent = game.randomEvents[3]  // Surpresa positiva
game.state.currentEvent = game.randomEvents[4]  // Desfile perfeito
```

Depois clique em "Iniciar Desfile" e veja o efeito nas notas!

### Verificar Lista de Eventos

No console:
```javascript
game.randomEvents
```

Você verá os 5 eventos disponíveis.

### Chance de Eventos

Atualmente: **50% de chance** de algum evento acontecer.

Se você desfilar 10 vezes, deve ver eventos em ~5 desfiles.

---

## 🎵 TESTANDO SAMBAS

### Ver Biblioteca de Sambas
```javascript
game.sambaLibrary
```

Deve mostrar 18 sambas.

### Forçar Qualidade de Samba
```javascript
game.state.sections.samba.quality = 95
game.state.sections.samba.chosen = true
game.state.sections.samba.name = "Teste"
```

---

## 📊 TESTANDO DIFICULDADE

### Verificar Grupo Atual
```javascript
game.state.group
```

### Mudar de Grupo Manualmente
```javascript
game.state.group = 'acesso'        // Fácil
game.state.group = 'serie-a'       // Médio
game.state.group = 'serie-especial' // Difícil
```

### Ver Penalidade do Grupo
No console, após calcular notas:
```
// Acesso: sem penalidade
// Série A: -0.3 nas notas
// Especial: -0.5 nas notas
```

---

## 🧪 TESTES RÁPIDOS

### Teste Completo de Som
```javascript
await game.playSound('click')
await game.playSound('invest')
await game.playSound('parade')
await game.playSound('success')
await game.playSound('fail')
```

### Resetar Jogo
```javascript
localStorage.clear()
location.reload()
```

### Ver Estado Completo
```javascript
game.state
```

### Adicionar Dinheiro
```javascript
game.state.money = 999999
game.updateDashboard()
```

### Maximizar Todos Setores
```javascript
game.state.sections.alegoria.quality = 100
game.state.sections.bateria.quality = 100
game.state.sections.comissao.quality = 100
game.state.sections.fantasia.quality = 100
game.state.sections.harmonia.quality = 100
game.updateDashboard()
```

---

## 📋 CHECKLIST DE DEBUG

- [ ] Console aberto (F12)
- [ ] Logs aparecem ao iniciar jogo
- [ ] `game.audioContext` existe
- [ ] `game.audioContext.state === 'running'`
- [ ] Som toca ao clicar em botões
- [ ] Eventos aparecem no console durante desfile
- [ ] Eventos aparecem visualmente (texto colorido)
- [ ] Eventos afetam nota final
- [ ] Sambas diferentes aparecem a cada escolha

---

## 🆘 PRECISA DE AJUDA?

1. Tire um print do console
2. Mostre os logs
3. Descreva o que aconteceu vs o que esperava

**Logs importantes:**
- 🎮 Jogo inicializado
- 🔊 Sistema de som
- 🎊 Iniciando desfile
- 🎲 Tentando evento
- ⚡ EVENTO (se houver)

---

## ✅ CORREÇÕES APLICADAS NA v1.1.1

1. **Som:** Adicionado `async/await` e `resume()` para AudioContext
2. **Eventos:** Mudado de chances individuais para 50% geral + escolha aleatória
3. **Logs:** Console.log em todas ações importantes
4. **Visual:** Evento mostrado na tela de resultados
5. **Debug:** Este arquivo criado!

---

**Versão:** 1.1.1 (Debug Edition)
**Data:** 2026-01-29
