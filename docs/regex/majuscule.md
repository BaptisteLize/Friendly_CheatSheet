# Usage de Regex pour transformation ou contrôle sur les MAJUSCULES 

## Mettre en majuscule la première lettre du mot

```js
.replace(/\b\w/, x => x.toUpperCase())
// Il suffirait d'ajouter un g après le dernier slash pour que toutes les premières lettres de chaque mot soient en majuscule
```

## Vérification contient une majuscule

```js
/[A-Z]/.test(string)

// La petite soeur pour les minuscules :
// /[a-z]/.test(string)

// La dernière pour les chiffres de 0 à 9 ?
// /\d/.test(string)
```
