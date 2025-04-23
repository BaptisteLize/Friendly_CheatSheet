# Arborescence FRONT SPA
```bash
/la-pince-front/
├── public/                   # Fichiers statiques (favicon, images, etc.)
├── src/
│   ├── assets/              # Images, icônes, etc.
│   ├── components/          # Composants UI réutilisables (boutons, inputs, modals, etc.)
│   ├── features/            # Composants + logique métier par fonctionnalité
│   ├── layouts/             # Layouts globaux (avec navbar, sidebar, etc.)
│   ├── pages/               # Pages du routeur (login, register, dashboard, etc.)
│   ├── router/              # Config React Router (routes, guards, etc.)
│   ├── services/            # Appels API (Utilisation d'Axios ou tout en manuel ?)
│   ├── store/               # État global (Zustand recommandé)
│   ├── utils/               # Fonctions utilitaires (ex: formatDate, formatAmount)
│   ├── types/               # Déclarations de types et interfaces globales
│   ├── App.tsx              # Composant racine
│   └── main.tsx            # Point d’entrée de l’appli (ReactDOM.createRoot)
├── .env                     # Variables d'environnement (URL API, etc.)
├── .gitignore
├── vite.config.ts           # Config Vite en TypeScript
├── tsconfig.json            # Config TypeScript
├── package.json
└── README.md
```

Dossier | Rôle | Exemple | Résumé
components/ | Composants UI atomiques et réutilisables | Button, Input | Blocs de base
layouts/ | Structure de page partagée | DashboardLayout | Cadres globaux
pages/ | Pages entières liées au routing | LoginPage, DashboardPage | Routables
features/ | Grouper tout le code métier par fonctionnalité | features/auth/, features/budget/ | Organisé par logique métier
store/ | État global partagé | useAuthStore | Gestion centralisée du state
