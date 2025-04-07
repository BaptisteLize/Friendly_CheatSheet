# Fonction avec regex pour transformer une chaîne de caractères en Title Case

```js
function toTitleCaseFr(str) {
  return str.trim().replace(/[\p{L}][\p{L}\p{M}\p{N}'’-]*/gu, (word) =>
    word.charAt(0).toLocaleUpperCase('fr-FR') + word.slice(1).toLocaleLowerCase('fr-FR')
  );
}

```
