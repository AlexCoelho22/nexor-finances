# NΞXOR FINANCE - Versão Web (PWA)

## 🎯 SOBRE

Versão web do NΞXOR FINANCE que pode ser convertida em APK e instalada no celular.

**TODOS os dados são salvos na memória do celular** usando LocalStorage - funciona 100% offline!

## ✨ FUNCIONALIDADES

✅ Dashboard com gráficos interativos
✅ Gerenciamento de Ativos (Ações, FIIs, Bitcoin, Crypto)
✅ Calendário de Renda Passiva
✅ Projeções com Juros Compostos
✅ Modo Disciplina (Gamificação)
✅ Base de Conhecimento (6 aulas)
✅ Sistema de Metas
✅ Login/Cadastro
✅ Easter Egg (10 cliques em "NΞXOR FINANCE")
✅ PWA - Funciona Offline
✅ **Dados salvos na memória do celular**

## 🚀 COMO USAR

### Opção 1: Hospedar no Vercel (Recomendado)

1. **Instale as dependências:**
```bash
npm install
```

2. **Teste localmente:**
```bash
npm run dev
```
Abra: http://localhost:3000

3. **Faça o build:**
```bash
npm run build
```

4. **Hospede no Vercel:**

**Via Interface Web:**
1. Acesse https://vercel.com
2. Clique em "Add New" → "Project"
3. Importe este repositório
4. Deixe as configurações padrão
5. Clique em "Deploy"
6. Pronto! Seu app estará no ar

**Via CLI:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Opção 2: Hospedar em Outro Lugar

Após `npm run build`, os arquivos estarão em `/out/`

Pode hospedar em:
- **Netlify**: Arraste a pasta `/out`
- **GitHub Pages**: Faça push da pasta `/out`
- **Firebase Hosting**: `firebase deploy`

## 📱 CONVERTER EM APK

Depois de hospedar, use um desses sites para converter em APK:

### 1. PWABuilder (Recomendado) ⭐

1. Acesse: https://www.pwabuilder.com
2. Cole a URL do seu app (ex: https://seu-app.vercel.app)
3. Clique em "Start"
4. Clique em "Package For Stores"
5. Escolha "Android"
6. Clique em "Generate"
7. Baixe o APK gerado

### 2. Bubble.io PWA to APK

1. Acesse: https://bubble.io/pwa-to-apk
2. Cole a URL do app
3. Configure nome e ícone
4. Gere o APK
5. Baixe

### 3. WebToApp

1. Acesse: https://webtoapp.design
2. Cole a URL
3. Personalize
4. Gere APK
5. Baixe

## 📦 INSTALAR O APK NO CELULAR

1. Transfira o arquivo `.apk` para o celular
2. Abra o arquivo no celular
3. Permita "Instalar de fontes desconhecidas" nas configurações
4. Instale
5. Pronto! O app está instalado

## 💾 ARMAZENAMENTO DE DADOS

**IMPORTANTE**: Todos os dados ficam salvos no celular!

- Usa `LocalStorage` do navegador
- Quando convertido em APK, os dados ficam na memória do celular
- Funciona 100% offline
- Dados persistem mesmo fechando o app

**Estrutura de Dados:**
- `nexor_user` - Dados do usuário
- `nexor_assets` - Ativos/investimentos
- `nexor_goals` - Metas financeiras
- `nexor_lesson_progress` - Progresso nas aulas
- `nexor_logged_in` - Status de login

## 🎨 PERSONALIZAÇÃO (Opcional)

### Mudar Cores

Edite `tailwind.config.ts`:
```typescript
colors: {
  background: '#0B0B0F',        // Fundo
  'primary-purple': '#7B2CBF',  // Roxo principal
  'electric-purple': '#9D4EDD', // Roxo elétrico
}
```

### Mudar Nome/Ícone

Edite `public/manifest.json`:
```json
{
  "name": "SEU NOME AQUI",
  "short_name": "NOME",
  "description": "Sua descrição"
}
```

Substitua os ícones em `/public/`:
- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)

## 🔧 ESTRUTURA DO PROJETO

```
nexor-finance-web/
├── app/
│   ├── components/
│   │   ├── Login.tsx          # Tela de login + Easter Egg
│   │   ├── Dashboard.tsx      # Layout principal
│   │   └── tabs/              # Abas do app
│   │       ├── DashboardTab.tsx
│   │       ├── AssetsTab.tsx
│   │       ├── PassiveIncomeTab.tsx
│   │       ├── DisciplineTab.tsx
│   │       ├── KnowledgeTab.tsx
│   │       └── GoalsTab.tsx
│   ├── lib/
│   │   ├── storage.ts         # Sistema de LocalStorage
│   │   ├── utils.ts           # Cálculos e fórmulas
│   │   └── lessons.ts         # Conteúdo das aulas
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   ├── layout.tsx
│   ├── page.tsx               # Splash screen + routing
│   └── globals.css
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service Worker
│   └── icons/                 # Ícones do app
└── package.json
```

## 🧮 FÓRMULAS IMPLEMENTADAS

Todas implementadas em `app/lib/utils.ts`:

```typescript
// Total Investido
totalInvested = quantidade × preçoMédio

// Valor Atual
currentValue = quantidade × preçoAtual

// Lucro/Prejuízo
profitLoss = valorAtual - totalInvestido

// Renda Mensal (varia por frequência)
monthlyIncome = {
  MENSAL: quantidade × dividendo
  TRIMESTRAL: (quantidade × dividendo) / 3
  SEMESTRAL: (quantidade × dividendo) / 6
  ANUAL: (quantidade × dividendo) / 12
}

// Dividend Yield
dividendYield = (dividendoAnual / preçoAtual) × 100

// Projeção com Reinvestimento (Juros Compostos)
Para cada mês M:
  capital[M] = capital[M-1] × (1 + 0.005) + aporteMensal
```

## 🎮 EASTER EGG

Na tela de login, clique 10 vezes rápidas em "NΞXOR FINANCE" para ver a mensagem especial!

## 📊 TECNOLOGIAS

- **Next.js 14** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilização
- **Chart.js** - Gráficos
- **PWA** - Progressive Web App
- **LocalStorage** - Armazenamento local

## 🐛 PROBLEMAS COMUNS

### "npm install" falha
```bash
rm -rf node_modules package-lock.json
npm install
```

### Dados não salvam
- Verifique se o navegador permite LocalStorage
- Não use modo privado/anônimo
- Limpe o cache e teste novamente

### APK não funciona offline
- Certifique-se que converteu com PWABuilder
- Verifique se o service worker foi incluído

## 📞 SUPORTE

Problemas? Verifique:
1. Console do navegador (F12)
2. Se LocalStorage está habilitado
3. Se a URL está acessível

## 🎯 PRÓXIMOS PASSOS

1. ✅ Hospedar no Vercel
2. ✅ Converter em APK
3. ✅ Instalar no celular
4. ✅ Adicionar seus investimentos
5. ✅ Acompanhar sua renda passiva!

---

**Desenvolvido por Alex Coelho**
**Versão Web 1.0.0**

🎉 **APROVEITE O NΞXOR FINANCE!** 🎉
