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
❗️**features/**
C’est normal que ça te paraisse redondant au début, mais c’est une logique différente :

On découpe par "fonctionnalité métier", pas par "type de fichier".

Exemple concret :
Tu as une fonctionnalité “transactions” qui contient :

Un TransactionsList.tsx (un composant métier, pas atomique, spécifique à cette feature)

Un TransactionForm.tsx (pour ajouter/modifier une transaction)

Un hook useTransactions.ts (fetch + gestion des transactions)

Un service transactions.api.ts (appel à /api/transactions)

Des types spécifiques : Transaction.ts

👉 Tout ça va ensemble dans :
features/transactions/

Pourquoi c’est utile ?
Tu groupes tout ce qui concerne une fonctionnalité.

Tu minimises les dépendances croisées.

Ton projet reste lisible même avec 15 fonctionnalités.

Un dev peut bosser sur "transactions" sans fouiller tout le projet.

Donc non, ce n’est pas redondant avec components/, car ici ce sont des composants métiers, spécifiques à une logique (pas génériques et réutilisables comme un <Button>).
