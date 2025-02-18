Pour intégrer Tailwind CSS dans un projet Express, voici les étapes à suivre :
Installer Tailwind CSS et PostCSS via npm : npm install tailwindcss postcss @tailwindcss/postcss postcss-cli
Créer une vue pour les tests, ainsi qu'un dossier public contenant un sous-dossier styles avec deux fichiers : style.css et tailwind.css.
Dans le fichier tailwind.css, ajouter : @import "tailwindcss";
Créer un fichier postcss.config.js avec le contenu suivant:
 export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
Créer un fichier tailwind.config.js avec la configuration suivante :
export default {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
Configurer le serveur Express :
import express from "express";
import path from "path";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(import.meta.dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started at 
http://localhost
:${port}`);
});
Lancer le serveur avec la commande suivante :
node --watch index.js
Dans un autre terminal, exécuter la commande suivante pour générer le fichier CSS final :
npx tailwindcss -i ./public/styles/tailwind.css -o ./public/styles/style.css --watch
Et voilà, le tour est joué ! :tada:
Pour tester, insérez le code suivant dans votre vue EJS :
<h1 class="text-3xl uppercase underline">Hello world!</h1>
Le titre devrait s'afficher avec un soulignement, indiquant que Tailwind CSS est correctement intégré.
À vous de jouer !

------

🚀 Installation Rapide de Tailwind CSS avec npm

💡 Objectif : Installer Tailwind proprement et tester une classe basique. Temps estimé : 15-20 min max.

1️⃣ Créer un dossier de test
Dans ton terminal, place-toi où tu veux et lance :

```bash
mkdir tailwind-test && cd tailwind-test
```

2️⃣ Initialiser un projet Node.js

```bash
npm init -y
```

Ça va créer un package.json pour gérer les dépendances.

3️⃣ Installer Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
```

Puis, génère le fichier de configuration Tailwind :

```bash
npx tailwindcss init -p
```

Ça va créer :

- tailwind.config.js (config de Tailwind)
- postcss.config.js (pour PostCSS, on touche pas pour l’instant)

4️⃣ Configurer Tailwind
Ouvre tailwind.config.js et remplace le contenu par :

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
Cette ligne content: ["./*.html"] permet à Tailwind de scanner les fichiers HTML et d’inclure uniquement les classes utilisées.

5️⃣ Ajouter Tailwind dans un fichier CSS
Crée un fichier styles.css et ajoute dedans :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6️⃣ Compiler Tailwind
Lance cette commande :

```bash
npx tailwindcss -i ./styles.css -o ./output.css --watch
```

Ça génère un fichier output.css qui contient toutes les classes nécessaires. --watch permet de mettre à jour le fichier en temps réel.

7️⃣ Tester Tailwind dans un fichier HTML
Crée un fichier index.html et mets ce contenu :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Tailwind</title>
    <link href="output.css" rel="stylesheet">
</head>
<body class="bg-gray-100 text-center p-10">
    <h1 class="text-3xl font-bold text-blue-500">Hello Tailwind 🚀</h1>
</body>
</html>
```

Ouvre index.html dans ton navigateur, et tu devrais voir le texte "Hello Tailwind 🚀" en bleu et bien stylisé !
