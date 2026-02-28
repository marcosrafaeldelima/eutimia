# 🔐 Guia: Como Obter Access Token do LinkedIn

> **Cache**: Posts atualizam 1x por dia. Feed mais rápido e economiza requisições!

---

## 📋 Passo a Passo COMPLETO

### PASSO 1: Entrar no LinkedIn Developer Portal

1. Abra: https://www.linkedin.com/developers/apps
2. Clique em **"Sign in"** (se não estiver logado)
3. Use a conta de Flávia para fazer login

---

### PASSO 2: Criar uma Aplicação (ou usar existente)

**Se não tiver app:**
1. Clique em **"Create app"** (canto superior direito)
2. Preencha o formulário:
   - **App name**: `Eutimia Feed`
   - **LinkedIn Page**: Selecione ou crie uma página
   - **App logo**: Upload da logo Eutimia
   - **Legal agreement**: Marque as checkboxes ✓
3. Clique em **"Create app"**

**Se já tiver app:**
1. Navegue até a app existente
2. Vá para a aba **"Settings"**

---

### PASSO 3: Ativar as Permissões Certas

Ainda na dashboard da app:

1. Vá para aba **"Products"** (menu superior)
2. Procure por **"Sign In with LinkedIn"**
3. Clique em **"Request access"** (se ainda não tiver)
4. Aguarde aprovação (geralmente instantâneo)

---

### PASSO 4: Gerar o Access Token

Agora vem a parte importante:

1. **Vá para aba "Auth"** (menu superior)
2. Role para baixo até **"OAuth 2.0 credentials"**
3. Copie o **"Client ID"** (salve em lugar seguro)
4. Copie o **"Client Secret"** (salve em lugar seguro)

---

### PASSO 5: Gerar Access Token (Método Rápido)

**Via cURL (terminal):**

```bash
# Substitua CLIENT_ID e CLIENT_SECRET pelos seus valores

curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "scope=r_liteprofile%20r_basicprofile"
```

**Resposta será algo como:**
```json
{
  "access_token": "AQVr3kP5x...",
  "expires_in": 5184000,
  "scope": "r_liteprofile,r_basicprofile"
}
```

✅ Copie o `access_token` (aquele longo string começando com `AQVr`)

---

### PASSO 6: Obter Profile ID de Flávia

Existem 2 formas:

**Forma A - Rápida (sem API):**
1. Vá ao perfil: https://www.linkedin.com/in/flaviaconti/
2. O ID é o texto entre `/in/` e `/`
3. Neste caso: **`flaviaconti`** (username)
4. COPIE: `flaviaconti`

**Forma B - Via API (mais preciso):**

```bash
# Use o token que você gerou acima

curl -H "Authorization: Bearer AQVr3kP5x..." \
  https://api.linkedin.com/v2/me \
  -H "LinkedIn-Version: 202401"
```

Procure no resultado por `"id": "1234567890"`

✅ Copie o **ID numérico** (ex: `1234567890`)

---

## 🎯 Resumo: O que você precisa

Após completar os passos, você terá:

| Variável | Valor | Exemplo |
|----------|-------|---------|
| `LINKEDIN_ACCESS_TOKEN` | Token gerado no PASSO 5 | `AQVr3kP5x7y8z...` |
| `LINKEDIN_PROFILE_ID` | ID de Flávia do PASSO 6 | `flaviaconti` ou `1234567890` |

---

## 📝 Configurar Variáveis de Ambiente

### Localmente (desenvolvimento):

1. Abra `.env.local` na raiz do projeto (ou crie se não existir)

2. Cole:
```env
LINKEDIN_ACCESS_TOKEN=AQVr3kP5x7y8z_seu_token_aqui
LINKEDIN_PROFILE_ID=flaviaconti
```

3. **Salve e NÃO commite** (está no `.gitignore`)

### No Vercel (produção):

1. Vá ao dashboard: https://vercel.com
2. Selecione o projeto `eutimia`
3. Vá em **Settings** → **Environment Variables**
4. Adicione:
   - Nome: `LINKEDIN_ACCESS_TOKEN`
   - Valor: `AQVr3kP5x...`
5. Clique "Add"
6. Repita para `LINKEDIN_PROFILE_ID`
7. **Deploy** (automático)

---

## ✅ Testar Localmente

```bash
# 1. Instale dependências
npm install

# 2. Configure .env.local (veja acima)

# 3. Rode Vercel localmente
npx vercel dev

# 4. Abra: http://localhost:3000
# 5. Role até "Feed LinkedIn"
# Pronto! Posts de Flávia devem aparecer
```

---

## 🚨 Troubleshooting

| Erro | Solução |
|------|---------|
| "Carregando..." (infinito) | Token expirou? Gere um novo |
| 401 Unauthorized | Access token incorreto - verifique `.env.local` |
| Profile not found | Profile ID errado - tente com username `flaviaconti` |
| CORS error | Rodando localmente? Use `npx vercel dev` |

---

## ⏰ Renovar Token (quando expirar)

LinkedIn tokens têm validade. Para renovar:

1. Volte ao PASSO 5
2. Gere um novo token
3. Atualize `.env.local` (local) ou Vercel (produção)

---

**Pronto!** Qualquer dúvida é só chamar 🚀
