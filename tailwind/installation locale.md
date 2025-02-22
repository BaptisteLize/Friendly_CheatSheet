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
```json
"tailwind": "tailwindcss -i ./public/css/tailwind.css -o ./public/css/styles.css --watch"
```

Utiliser ce nouveau fichier généré dans le head de votre html comme link stylesheet.

*Conseil d'utilisation :

Pour permettre à tailwindcss de fonctionner correction, lancer le script dans une console qui restera ouverte tout le temps du travail sur le projet sans y toucher et travailler avec une autre console pour toutes les autres manipulations.

Si tailwindcss ne peut pas compiler, il ne fonctionne pas.*
