# Arborescence FRONT SPA
```bash
lapince-front/
├── src/
│   ├── assets/            # Images, icônes, etc.
│   ├── components/
│   │   ├── common/        # Composants réutilisables (boutons, inputs, etc.)
│   │   ├── layout/        # Header, footer, etc.
│   │   ├── auth/          # Composants liés à l'authentification
│   │   ├── dashboard/     # Composants du dashboard
│   │   ├── budget/        # Composants liés aux budgets
│   │   └── expense/       # Composants liés aux dépenses
│   ├── pages/
│   │   ├── auth/          # Pages d'authentification
│   │   ├── dashboard/     # Pages du dashboard
│   │   └── profile/       # Pages de profil
│   ├── store/             # État global (Redux, Context API, etc.)
│   ├── services/          # Services API
│   ├── utils/             # Fonctions utilitaires
│   ├── types/             # Types TypeScript
│   ├── router/            # Configuration du routeur
│   ├── app.tsx            # Composant racine
│   └── main.tsx           # Point d’entrée de l’appli (ReactDOM.createRoot)
└── index.html             # Point d'entrée HTML
├── .env                     # Variables d’environnement (URL API, etc.)
├── .env.example             # Exemple de configuration .env
├── .gitignore
├── vite.config.ts           # Config Vite
├── tsconfig.json            # Config TypeScript
├── package.json
└── README.md
```
