# Setup: LinkedIn Feed com Backend Seguro

Este guia explica como configurar a integração segura com o LinkedIn.

## Como funciona?

```
Flávia posta no LinkedIn
        ↓
Backend Node.js (Vercel) busca posts
        ↓
API retorna JSON (token NUNCA é exposto)
        ↓
Frontend carrega e mostra os posts
```

---

## 📋 Passo a Passo

### 1. Obter Access Token de Flávia

1. Vá para: https://www.linkedin.com/developers/apps
2. Crie uma app ou use uma existente
3. Em **"Auth"**, copie:
   - **Access Token**: (se não tiver, gere um)
   - Formato: `AQVr...` (long string)

### 2. Obter Profile ID de Flávia

1. Vá ao perfil: https://www.linkedin.com/in/flaviaconti/
2. A URL contém o ID: `flaviaconti`
3. OU use esta API para pegar o ID único:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://api.linkedin.com/v2/me
   ```
   - Copie o `id` retornado (ex: `1234567890`)

### 3. Configurar Variáveis de Ambiente

**Localmente (desenvolvimento):**

1. Copie o arquivo `.env.example` → `.env.local`
   ```bash
   cp .env.example .env.local
   ```

2. Preencha com seus dados:
   ```env
   LINKEDIN_ACCESS_TOKEN=seu_access_token_aqui
   LINKEDIN_PROFILE_ID=seu_profile_id_aqui
   ```

3. **IMPORTANTE**: Nunca commite `.env.local`!

### 4. Deploy no Vercel (Grátis)

1. Vá para: https://vercel.com
2. Conecte seu GitHub
3. Importe o repositório `eutimia`
4. Em **Environment Variables**, adicione:
   - `LINKEDIN_ACCESS_TOKEN`
   - `LINKEDIN_PROFILE_ID`
5. Deploy!

---

## 🔐 Segurança

✅ **Token é guardado do lado do servidor**
- Nunca exposto no navegador
- Nunca aparece no código-fonte
- Só acessível via `/api/linkedin-posts`

✅ **Sem credenciais no Git**
- `.env.local` está no `.gitignore`
- Arquivo `.env.example` é apenas modelo

✅ **Rate Limiting**
- Frontend faz cache por 1 hora
- Evita excesso de chamadas

---

## 📝 Testando Localmente

```bash
# 1. Instale dependências
npm install

# 2. Crie .env.local com suas credenciais
# (veja passo 3 acima)

# 3. Rode Vercel localmente
npx vercel dev

# 4. Acesse: http://localhost:3000
# A função da API estará em: http://localhost:3000/api/linkedin-posts
```

---

## 🚨 Troubleshooting

| Problema | Solução |
|----------|---------|
| "Carregando publicações..." (infinito) | Verifique `.env.local` está correto |
| 401 Unauthorized | Access Token expirou - gere um novo |
| 404 Profile not found | Profile ID errado - verifique URL |
| CORS error | Backend e frontend devem estar no mesmo host (Vercel resolve) |

---

## ⏰ Atualizações Futuras

- [ ] Adicionar UI para admin editar token
- [ ] Suportar múltiplos perfis
- [ ] Webhook para atualizar em tempo real
- [ ] Cache em database (Redis)

---

**Pronto!** O feed agora está seguro e automático 🚀
