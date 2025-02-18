# Étape 1 : Installer Tailwind CSS globalement

Ouvre ton terminal et exécute cette commande pour installer Tailwind CSS globalement sur ta VM :

```bash
npm install -g tailwindcss
```
👉 Cela installe Tailwind CSS de manière globale, ce qui te permettra de l'utiliser depuis n'importe quel projet sans avoir besoin de l'installer localement à chaque fois.

## Étape 2 : Vérifier l'installation

Pour vérifier que l'installation a bien fonctionné, exécute cette commande :

```bash
tailwindcss -v
```

➡️ Cela te renverra la version de Tailwind CSS installée si l'installation a réussi.

## Étape 3 : Utiliser Tailwind CSS dans ton projet

Une fois Tailwind installé globalement, utilise la commande suivante pour exécuter Tailwind dans ton projet :

```bash
tailwindcss -i ./styles.css -o ./output.css --watch
```

➡️ Cela compile ton fichier CSS (styles.css) en un fichier optimisé (output.css) et regarde les changements automatiquement (--watch).

### Si tu veux désinstaller Tailwind globalement

Si tu rencontres un souci ou si tu veux désinstaller Tailwind, utilise cette commande :

```bash
npm uninstall -g tailwindcss
```

➡️ Cela désinstalle la version globale de Tailwind CSS.

### Pour mettre à jour Tailwind CSS globalement :

Si tu veux mettre à jour Tailwind à une version plus récente, utilise la commande suivante :

```bash
npm install -g tailwindcss@latest
```

➡️ Cela mettra Tailwind à jour vers la dernière version disponible.
