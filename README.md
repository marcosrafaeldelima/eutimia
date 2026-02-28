# Eutimia — Website

Plataforma de educação corporativa e mentoria de liderança. Gestão do conhecimento para líderes.

## 📂 Estrutura do Projeto

```
eutimia/
├── src/                     # Arquivos publicados no site
│   ├── index.html           # Estrutura HTML principal
│   ├── css/
│   │   └── style.css        # Estilos (CSS puro, design tokens)
│   ├── js/
│   │   └── main.js          # JavaScript interativo
│   └── images/              # 📁 Imagens do site (logos, fotos, banners)
│       ├── logo-transparent.svg
│       ├── logo-dark.svg
│       ├── flavia-conti.jpg
│       └── ...
├── assets/                  # 📁 Arquivos NÃO publicados (referência interna)
│   ├── brandbook.pdf        # Design system, guidelines
│   ├── design-system.figma  # Links/specs
│   ├── content.docx         # Conteúdo editorial
│   └── ...
├── dist/                    # Build output (gerado via npm run build)
├── node_modules/            # Dependências npm (não commitar)
├── package.json             # Dependências e scripts npm
├── package-lock.json        # Lock file (commitar)
├── .gitignore               # Arquivos a ignorar no Git
├── .prettierrc              # Configuração de formatação de código
└── README.md                # Este arquivo
```

## � Guia de Pastas

### `src/` — Arquivos Publicados

Contém **tudo que será publicado** no site (HTML, CSS, JS, imagens):

- **`index.html`** — Página principal
- **`css/style.css`** — Estilos globais
- **`js/main.js`** — JavaScript interativo
- **`images/`** — Logos, fotos, banners, ícones (otimizados para web)

### `assets/` — Arquivos Internos (NÃO Publicados)

Referências, documentação, design system que **não vão para o site**, ex:

- `brandbook.pdf` — Guia de marca
- `design-system.figma` — Link ou arquivo de designs
- `content.docx` — Conteúdo editorial em rascunho
- `wireframes/` — Protótipos
- Qualquer arquivo de referência

**Nota:** A pasta `assets/` está no `.gitignore`, então **não será commitada** (apenas para uso local).

---

## �🚀 Quick Start

### 1. Clonar/Usar este Repositório

```bash
git clone https://github.com/marcosrafaeldelima/eutimia.git
cd eutimia
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Rodar em Desenvolvimento

```bash
npm run dev
```

Isso abrirá um servidor local (geralmente http://localhost:3000).

### 4. Buildar para Produção

```bash
npm run build
```

Os arquivos otimizados ficarão em `dist/`.

### 5. Publicar (GitHub Pages)

1. Certifique-se que o repositório está no GitHub
2. Vá em **Settings → Pages**
3. Selecione branch `main` e pasta `/root`
4. Clique em Save
5. Aguarde ~5 min e acesse: `https://seu-usuario.github.io/eutimia/`

---

## 📋 Scripts Disponíveis

```bash
npm run dev       # Inicia servidor local (http://localhost:3000)
npm run build     # Gera arquivos para produção em dist/
npm run start     # Serve o diretório raiz
npm run format    # Formata código com Prettier
npm run lint      # Verifica formatação do código
```

---

## 🎨 Design Tokens

Toda a paleta de cores, tipografia e espaçamento está definida como **CSS Custom Properties** (variáveis):

### Cores

```css
--orange: #ed9a6d;    /* Laranja Suave  */
--lavender: #b4a0d1;  /* Lilás Mudo     */
--lime: #daf491;      /* Lima Suave     */
--dark: #3c3738;      /* Chumbo         */
--areia: #f4efe8;     /* Areia (fundo)  */
```

### Tipografia

```css
--font-logo: 'Froda', serif;
--font-heading: 'Inter', sans-serif;
--font-body: 'Roboto Mono', monospace;
```

### Espaçamento (8px grid)

```css
--sp-1: 8px;
--sp-2: 16px;
--sp-3: 24px;
--sp-4: 32px;
--sp-5: 40px;
/* ... até --sp-16: 128px */
```

Modifique `src/css/style.css` para ajustar qualquer token globalmente.

---

## 📱 Responsividade

Breakpoint principal: **768px**

- **Desktop**: Layout em grid 2 colunas
- **Mobile**: Stack em 1 coluna

Veja media queries no final de `style.css`.

---

## 🔧 Dependências

### Dev

- **serve** — Servidor HTTP local para desenvolvimento
- **prettier** — Formatador de código

### Production

Nenhuma dependência externa (HTML/CSS/JS puros).

---

## 📝 Como Editar

### Adicionar Nova Seção

1. Crie o HTML em `src/index.html`
2. Adicione estilos em `src/css/style.css`
3. Se precisar de interatividade, adicione JS em `src/js/main.js`

### Exemplo: Nova Seção

```html
<!-- em src/index.html -->
<section id="nova-secao">
  <div class="container">
    <h2 class="h2">Título da Seção</h2>
    <p class="body-copy">Conteúdo aqui...</p>
  </div>
</section>
```

```css
/* em src/css/style.css */
#nova-secao {
  padding: var(--sp-12) 0;
  background: var(--areia);
}
```

---

## 🌐 Publicação em Produção

### GitHub Pages (Gratuito)

1. Certifique-se que `dist/` contém os arquivos atualizados:
   ```bash
   npm run build
   ```

2. Commit e push:
   ```bash
   git add .
   git commit -m "Update site"
   git push origin main
   ```

3. Vá em **Settings → Pages** e configure para usar `/dist` ou `/root` (conforme seu `build`)

4. Site estará disponível em: `https://seu-usuario.github.io/eutimia/`

### Alternativas

- **Netlify**: Conecte seu repo, configure `npm run build` como comando de build
- **Vercel**: Similar ao Netlify, detecção automática
- **Servidor próprio**: Faça upload de `dist/` via FTP/SSH

---

## 🎯 Checklist para Lançamento

- [ ] Atualizar conteúdo em `src/index.html`
- [ ] Verificar links (especialmente em nav e footer)
- [ ] Adicionar imagens reais (logos, fotos)
- [ ] Testar em mobile (`npm run dev` → abrir no celular)
- [ ] Rodar `npm run format` para padronizar código
- [ ] Executar `npm run build` e verificar `dist/`
- [ ] Subir para GitHub e testar GitHub Pages
- [ ] Verificar Performance (Lighthouse)

---

## 📞 Suporte

Para dúvidas ou melhorias:

- **Email**: contato@eutimia.com
- **LinkedIn**: [Flávia Conti](https://linkedin.com/in/flavia-conti)
- **GitHub Issues**: [Reportar bug](https://github.com/marcosrafaeldelima/eutimia/issues)

---

## 📄 Licença

MIT — Veja `LICENSE` para detalhes.

---

**Versão**: 1.0.0  
**Data**: Fevereiro 2025  
**Mantido por**: Marcos Rafael de Lima & Flávia Conti
