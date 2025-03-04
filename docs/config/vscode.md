# Config VSCode 

## Extension `.js` sur l'auto-import

Ouvrir la palette de commande : 
`CTRL + SHIFT + P`

Chercher les preférences VSCode :
`Preferences: Open User Settings (JSON)`

Rajouter la ligne :
```json 
"javascript.preferences.importModuleSpecifierEnding": "js",
```

A présent, les auto-import devraient ajouter le `.js` automatiquement en fin de nom de fichier importé

## Gestion simplifiée pour les fichiers markdown

Installer les extensions suivantes :

- Markdown All in One
- Markdown Table
- Markdown Snippets

Ouvrir la palette de commande : 
`CTRL + SHIFT + P`

Chercher les preférences VSCode :
`Preferences: Open User Settings (JSON)`

Rajouter l'ensemble :
```json
"[markdown]": {
  "editor.quickSuggestions": {
    "other": true,
    "comments": false,
    "strings": true
  },
  "editor.suggestOnTriggerCharacters": true,
  "editor.formatOnSave": true
},
```

