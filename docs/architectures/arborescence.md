# Exemple d'arborescence de projet (tree)

project_root/
├── app/
│ ├── controller/
│ │ ├── main.controller.js
│ │ └── authController.js
│ ├── middleware/
│ │ ├── load-user-locals.middleware.js
│ │ ├── not-found.middleware.js
│ │ └── session-setup.middleware.js
│ ├── model/
│ │ ├── associations.js
│ │ ├── ex-level.js
│ │ ├── ex-answer.js
│ │ ├── ex-questions.js
│ │ ├── sequelize-client.js
│ │ └── index.js
│ ├── view/
│ │ ├── partials/
│ │ │ ├── header.ejs
│ │ │ └── footer.ejs
│ │ ├── 404.ejs
│ │ ├── 500.ejs
│ │ ├── home.ejs
│ │ ├── login.ejs
│ │ └── register.ejs
│ ├── router.js
├── data/
│ ├── create_table.sql
│ ├── populate.sql
│ └── config.js
├── docs/
│ ├── project-analyse/
│ ├── project-request/
│ └── integration/
├── node_modules/
├── public/
│ ├── css/
│ │ └── styles.css
│ ├── js/
│ │ └── script.js
│ ├── images/
│ └── index.html
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.js
├── package-lock.json
└── package.json
