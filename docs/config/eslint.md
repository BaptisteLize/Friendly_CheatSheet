# Configuration d'Eslint
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
## Scan + fix à l'installation

- Installation en dev dependencies (-D) : npm i eslint -D 

- Détection des problèmes : npx eslint .

- Fix des problèmes : npm eslint . --fix
