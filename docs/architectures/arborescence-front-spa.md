# Arborescence FRONT SPA
```bash
/la-pince-front/
├── src/
│   ├── assets/              # Images, icônes, etc.
│   ├── components/          # Composants UI réutilisables (boutons, inputs, modals, etc.)
│   ├── layouts/             # Layouts globaux (avec navbar, sidebar, etc.)
│   ├── pages/               # Pages du routeur (login, register, dashboard, etc.)
│   ├── router/              # Config React Router (routes, guards, etc.)
│   ├── services/            # Appels API (Utilisation d'Axios ou tout en manuel ?)
│   ├── store/               # État global (Zustand recommandé)
│   ├── utils/               # Fonctions utilitaires (ex: formatDate, formatAmount)
│   ├── types/               # Déclarations de types et interfaces globales
│   ├── App.tsx              # Composant racine
│   └── main.tsx             # Point d’entrée de l’appli (ReactDOM.createRoot)
├── .env                     # Variables d'environnement (URL API, etc.)
├── .env.example             # Variables d'environnement (URL API, etc.)
├── .gitignore
├── vite.config.ts           # Config Vite en TypeScript
├── tsconfig.json            # Config TypeScript
├── package.json
└── README.md
```
