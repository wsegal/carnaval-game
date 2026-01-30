# 🎯 Setup - Feed de Threat Intelligence Axur

## 📋 Resumo

Workflow automatizado que:
- **Executa toda segunda-feira às 9h**
- Busca IOCs, TTPs, vulnerabilidades e threat actors da Axur
- Filtra por produtos usados na empresa (Fortigate, Palo Alto, Microsoft, etc.)
- Detecta **zero-days** e envia alerta imediato
- Envia relatório semanal formatado ao Teams

---

## 🔧 Passo 1: Descobrir o Collection ID

Antes de importar o workflow, você precisa descobrir o `collectionId` correto da Axur.

### Opção 1: Via cURL
```bash
curl -X GET "https://api.axur.com/gateway/1.0/taxii2/1/collections/" \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Accept: application/taxii+json;version=2.1"
```

### Opção 2: Via Postman
1. GET `https://api.axur.com/gateway/1.0/taxii2/1/collections/`
2. Headers:
   - `Authorization: Bearer <API_KEY>`
   - `Accept: application/taxii+json;version=2.1`

**Resultado esperado:**
```json
{
  "collections": [
    {
      "id": "abc123...",
      "title": "Axur Threat Intel Feed",
      "can_read": true,
      "can_write": false
    }
  ]
}
```

**Copie o `id` da coleção!**

---

## 🔧 Passo 2: Importar o Workflow no n8n

1. Abra o n8n
2. Clique em **"Import from File"**
3. Selecione `threat-intel-workflow.json`
4. Workflow será importado

---

## 🔧 Passo 3: Configurar Variáveis

Você precisa substituir 3 placeholders no workflow:

### 1. API_KEY da Axur
No nó **"Buscar Threat Intel"**, substitua:
```
{{API_KEY}}
```
Por sua chave real da Axur.

### 2. Collection ID
No nó **"Prepara Parâmetros"**, substitua:
```javascript
collectionId: "{{COLLECTION_ID}}"
```
Por:
```javascript
collectionId: "abc123..."  // O ID que você copiou no Passo 1
```

### 3. Webhooks do Teams

#### Criar Webhook no Teams:
1. Abra o canal do Teams
2. Clique em **"..."** → **"Connectors"**
3. Busque **"Incoming Webhook"**
4. Configure e copie a URL

#### No n8n:
- **Nó "Webhook - Urgente Teams"**: substitua `{{TEAMS_WEBHOOK_URGENT}}` pela URL
- **Nó "Webhook - Semanal Teams"**: substitua `{{TEAMS_WEBHOOK_WEEKLY}}` pela URL

*(Pode usar o mesmo webhook para ambos se quiser)*

---

## 🔧 Passo 4: Ajustar Produtos Monitorados (Opcional)

No nó **"Prepara Parâmetros"**, você pode adicionar/remover produtos:

```javascript
const vendors = [
  "Fortigate", "Fortinet",
  "Palo Alto", "PaloAlto",
  "Microsoft", "Windows", "Azure", "M365",
  "Mimecast",
  "Netskope",
  "Sentinel One", "SentinelOne",
  "Exabean",
  "N8N"
  // Adicione mais aqui!
];
```

---

## 🔧 Passo 5: Testar

1. Clique em **"Execute Workflow"** manualmente
2. Verifique se os dados chegam do Axur
3. Confira se o relatório foi enviado ao Teams

---

## 🎯 Como Funciona

### Fluxo Normal (Semanal):
```
Schedule (Segunda 9h)
  → Buscar últimos 7 dias de Threat Intel
  → Filtrar por produtos (Fortigate, Palo Alto, etc.)
  → Verificar se tem zero-day
  → [NÃO] → Enviar relatório semanal
  → [SIM] → Enviar alerta urgente + relatório
```

### Estrutura do Relatório Semanal:
```
📊 Relatório Semanal - Threat Intelligence
Data: 27/01/2026
Período: Últimos 7 dias

🔴 Vulnerabilidades (X)
• CVE-2026-XXXX - Fortinet FortiGate RCE
  Produtos: Fortigate, Fortinet

⚠️ Indicadores de Compromisso - IOCs (X)
• 192.168.1.100 - C2 Server
  Produtos: Palo Alto

☠️ Malware (X)
• DarkGate v5
  Produtos: Microsoft, Windows

👤 Threat Actors (X)
• APT29 (Cozy Bear)
  Produtos: Microsoft

🎯 TTPs / MITRE ATT&CK (X)
• T1190 - Exploit Public-Facing Application
  Produtos: Fortigate
```

---

## ⚠️ Troubleshooting

### Erro: "Invalid collection ID"
- Execute o Passo 1 novamente
- Verifique se o `collectionId` está correto

### Erro: "Unauthorized"
- Verifique a API Key
- Teste a API Key via cURL primeiro

### Nenhum dado retornado
- Verifique se há IOCs novos na última semana
- Ajuste o filtro de produtos (pode estar muito restritivo)

### Teams não recebe mensagem
- Teste o webhook diretamente via cURL:
```bash
curl -X POST "https://outlook.office.com/webhook/..." \
  -H "Content-Type: application/json" \
  -d '{"text": "Teste de webhook"}'
```

---

## 📝 Notas

- O workflow busca apenas **dados dos últimos 7 dias**
- Limita a **1000 objetos** por busca (ajustável no nó "Buscar Threat Intel")
- Zero-days são detectados por:
  - Tipo = `vulnerability`
  - Nome contém "zero-day"
- Mensagens do Teams têm **limite de tamanho** — relatórios muito grandes podem ser truncados

---

## 🚀 Próximos Passos

1. **Integrar com SIEM**: Enviar IOCs direto pro Sentinel, Splunk, etc.
2. **Automação de resposta**: Bloquear IPs maliciosos automaticamente no firewall
3. **Histórico**: Salvar IOCs em banco de dados para análise de tendências
4. **Notificações personalizadas**: Alertas diferentes para cada produto/equipe

---

Feito! 🎉

Qualquer dúvida, só chamar.
