# 🚀 DEPLOY NO VERCEL - GUIA RÁPIDO

## Método 1: Via Interface Web (Mais Fácil)

### 1. Prepare o Projeto
```bash
# Se ainda não instalou as dependências:
npm install

# Teste localmente (opcional):
npm run dev
# Abra http://localhost:3000
```

### 2. Suba para o GitHub

1. Crie um repositório no GitHub
2. Faça upload do projeto:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/nexor-finance.git
git push -u origin main
```

### 3. Deploy no Vercel

1. Acesse: https://vercel.com
2. Faça login (pode usar conta do GitHub)
3. Clique em **"Add New" → "Project"**
4. Selecione seu repositório `nexor-finance`
5. **Framework Preset**: Next.js (já detecta automaticamente)
6. **Build Command**: `npm run build` (já preenchido)
7. **Output Directory**: `out` (já preenchido)
8. Clique em **"Deploy"**
9. Aguarde 2-3 minutos
10. **PRONTO!** Seu app está no ar!

URL será algo como: `https://nexor-finance.vercel.app`

---

## Método 2: Via CLI (Mais Rápido)

```bash
# 1. Instale o Vercel CLI
npm install -g vercel

# 2. Faça login
vercel login

# 3. Deploy
vercel --prod

# Responda as perguntas:
# - Set up and deploy? → Y
# - Which scope? → Sua conta
# - Link to existing project? → N
# - Project name? → nexor-finance
# - Directory? → ./ (enter)

# 4. Aguarde o deploy
# URL será mostrada no terminal!
```

---

## 📱 CONVERTER EM APK

Após o deploy, você terá uma URL tipo:
`https://nexor-finance.vercel.app`

### Use o PWABuilder:

1. Acesse: https://www.pwabuilder.com
2. Cole sua URL
3. Clique em **"Start"**
4. Aguarde a análise
5. Clique em **"Package For Stores"**
6. Escolha **"Android"**
7. Configure:
   - **Package ID**: `com.nexor.finance`
   - **App name**: NΞXOR FINANCE
   - **Version**: 1.0.0
8. Clique em **"Generate"**
9. Baixe o APK gerado
10. Transfira para o celular e instale!

---

## 🔧 PROBLEMAS COMUNS

### Erro no Build
```bash
# Limpe e reinstale:
rm -rf node_modules .next out
npm install
npm run build
```

### Ícones Não Aparecem
1. Crie os ícones (ver instruções no README)
2. Coloque em `/public/icon-192.png` e `/public/icon-512.png`
3. Faça novo deploy

### PWABuilder não encontra o manifest
- Verifique se `public/manifest.json` existe
- Acesse `https://sua-url.vercel.app/manifest.json`
- Deve mostrar o JSON do manifest

---

## ✅ CHECKLIST

- [ ] Projeto testou localmente (`npm run dev`)
- [ ] Build funcionou (`npm run build`)
- [ ] Subiu no GitHub
- [ ] Conectou no Vercel
- [ ] Deploy concluído
- [ ] App abre no navegador
- [ ] Converteu em APK
- [ ] Instalou no celular
- [ ] Testou offline

---

## 🎯 PRÓXIMOS PASSOS

1. **Personalizar domínio** (opcional)
   - No Vercel: Settings → Domains
   - Adicione seu domínio customizado

2. **Configurar Analytics** (opcional)
   - Vercel Analytics já está integrado
   - Veja estatísticas de acesso

3. **Atualizar o App**
   ```bash
   # Faça mudanças no código
   git add .
   git commit -m "Atualização"
   git push
   # Vercel faz deploy automático!
   ```

---

**IMPORTANTE**: Quando converter em APK, os dados ficam salvos na memória do celular usando LocalStorage. Funciona 100% offline!

🎉 **Boa sorte!**
