la-pince-back/
├── src/
│   ├── config/                # Configs générales
│   │   └── database.js        # Connexion à la BDD avec Sequelize
│   ├── controllers/           # Gestion des requêtes (handlers)
│   ├── middlewares/           # Middlewares Express (auth, erreurs, etc.)
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/                # Modèles Sequelize
│   │   └── index.js           # Associations entre modèles
│   ├── router                # Routes API (Express Router)
│   ├── services/              # Logique métier (ex: userService.js, chiffrement du mot de passe, registerUser(), etc)
|   ├── utils/                 # Snippets réutilisables pour améliorer la DX et simplifier les fichiers
│   └── app.js                 # Setup global de l'app (Express, middlewares, routes)
├── .env                       # Variables d'environnement (port, DB)
├── .env.example               # Modèle de .env pour l'équipe
├── .gitignore
├── package.json
├── README.md
└── server.js                 # Fichier principal qui lance l'app listen
