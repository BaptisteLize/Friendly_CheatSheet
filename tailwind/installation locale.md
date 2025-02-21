# Intégrer Tailwind CSS en local (usage PostCSS)

- Initialiser son projet avec npm init -y

- Voici les dépendances et dev dépendances à retrouver avant le npm i :
```json
"devDependencies": {
    "postcss": "^8.5.3",
    "tailwindcss": "^3.4.17"
  }
```

Créer un fichier tailwind.css, ajouter : 
```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Créer un fichier postcss.config.js avec cette config :
```bash
 export const plugins = {
  tailwindcss: {},
  autoprefixer: {},
};
```

Créer un fichier tailwind.config.js avec cette config (vérifier le chemin de vos dossiers respectifs) :
```bash
/** @type {import('tailwindcss').Config} */
export const content = ["./app/**/*.{html,js,ejs}", "./public/**/*.{css,js}"];
export const theme = {
  extend: {},
};
export const plugins = [];
```

Éxécuter le script suivant pour générer le fichier CSS final (choisissez le nom de votre futur fichier) :
```bash
npx tailwindcss -i tailwind.css -o nom_du_fichier_ici.css --watch
```
