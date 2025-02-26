# Config VSCode - Extension `.js` sur l'auto-import

Ouvrir la palette de commande : 
- `CTRL + SHIFT + P`

Chercher les preférences VSCode :
- `Preferences: Open User Settings (JSON)`

Rajouter la ligne :
- `"javascript.preferences.importModuleSpecifierEnding": "js",`

A présent, les auto-import devraient ajouter le `.js` automatiquement en fin de nom de fichier importé
