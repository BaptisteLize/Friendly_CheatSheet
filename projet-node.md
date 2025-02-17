# Projet Node.js (Express, EJS, PostgreSQL)

1. Initilisation du projet : `npm init -y`
2. Installation des dépendances souhaitées : `npm i express ejs pg dotenv`
3. Installation des dev dependencies (-D) : `npm i eslint -D` - Détection des problèmes : `npx eslint .` - Fix des problèmes : `npm eslint . --fix`
4. Vérification du fichier package.json : `"type": "module"` doit être présent
5. Vérification des scripts de base dans le package.json :
   <details><summary>Scripts</summary>

    - `"start": "node index.js"`
    - `"dev": "node --watch index.js"`
    </details>
6. Création du fichier eslint.config.js :
    <details><summary>Configuration de base</summary>

    ```js
    import js from "@eslint/js";
    import globals from "globals";
    export default [
    js.configs.recommended,
    {
        languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node
        },
         },
        rules: {
        "semi": "error",
        "indent": ["error", 2],
        }
    }
    ];
    ```

    </details>
7. Création du fichier .env à la racine
8. Définition du PORT et du PG_URL dans le fichier .env
   <details><summary>Exemples de données</summary>

    - `PORT=3000`
    - `PG_URL=postgres://nomdatabase:motdepasse@localhost:5432/nomdatabase`
    </details>
9. Création du fichier .env.example pour la DX (dev exp) / Pour copier ce fichier si existant : `cp .env.example .env`
10. Création du .gitignore :
    <details><summary>Dossiers / fichiers obligatoirement ignorés</summary>

      - node_modules/
      - .env
    </details>
11. Création fichier index.js
    <details><summary>Étapes de création</summary>

    - Importation des fonctions obligatoires pour le fonctionnement dans l'index.js :
       - `import "dotenv/config";`
       - `import express from "express";`
       - `import path from "node:path";`
       - `import router from "./router.js";`
    - Création du serveur de l'app dans l'index.js : `const app = express();`
    - Configuration du moteur de rendu (view engine) dans l'index.js : `app.set("view engine", "ejs");`
    - Configuration de la localisation du dossier des vues dans l'index.js : `app.set("views", path.join(import.meta.dirname, "views"));`
    - Configuration du dossier d'assets statiques (public) dans l'index.js : `app.use(express.static(path.join(import.meta.dirname, "public")));`
    - Configuration bodyparser pour express (rendre le req.body récupérable) dans l'index.js : `app.use(express.urlencoded({ extended: true }));`
    - Utilisation du router dans l'index.js : `app.use(router);`
    - Lancement du serveur avec fallback de secours dans l'index.js : `const port = process.env.PORT || 3000;` // process.env.PARAM permet de faire appel à tout paramètre défini dans le .env
    - Mise en place de l'écoute de serveur dans l'index.js : ``app.listen(port, () => { console.log(`Server started at http://localhost:${port}`); });``
    </details>
12. Création fichier router.js :
    <details><summary>Étapes de création</summary>

    ```js
    // Import du système de router
    import { Router } from "express";

    // PRE-REQUIS=CONTROLLERS - Import des méthodes de controlleurs 
    import * as mainController from "./controllers/main.controller.js";
    import * as promoController from "./controllers/promos.controller.js";
    import * as studentController from "./controllers/students.controller.js";

    // Créer un routeur
    const router = Router();

    // Exemples de configurations du routeur
    router.get("/", mainController.renderHomePage);

    router.get("/admin/promos/add", promoController.renderPromoCreationPage);
    router.post("/admin/promos/add", promoController.handlePromoForm);

    // 404 Middleware - APRES les routes (possibilité de l'ajouter dans l'index.js APRES le routeur)
    router.use((req, res) => {
      res.status(404).render("404");
    });

    // Exporter le router
    export default router;
    ```

    </details>
13. Création fichier database-client.js :
    <details><summary>Configuration de base</summary>

    ```js
    // Charge les variables d'environnement
    import "dotenv/config";

    // Import du module PG
    import pg from "pg";

    // Créer un client de connexion (tunnel) vers notre base de données PostgreSQL
    const client = new pg.Client(process.env.PG_URL);

    // Ouvrir la connexion
    client.connect();

    // Exporter cette connexion, pour s'en servir dans d'autres fichiers
    export default client;
    ```

    </details>
14. Création fichier data-mapper.js avec le client : `import client from "./database-client.js";`
15. Création dossier public
    <details><summary>Sous dossiers / fichiers</summary>

      - dossier css
      - dossier images
      - fichier favicon.ico
    </details>
16. Création dossier views
    <details><summary>Sous dossiers / fichiers</summary>

      - dossier partials
      - fichiers views
    </details>
17. Création dossier data
18. Création dossier controllers
19. Création dossier docs
