# Error Handler

La première ligne est à conserver si vous utilisez eslint et souhaitez ne pas avoir d'erreur notifiée sur le next
```js
// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {

  const status = error.statusCode || 500;
  const message = error.message || "Une erreur est survenue";
  const details = error.details || [];

  return res.status(status).json({ status, message, details });
};
```


## Exemples d'utilisation dans un controller 

```js
if (!list) {
  const error = new Error("List not found"); // On crée l'instance d'erreur avec message personnalisé
  error.statusCode = 404; // On lui attribue un code HTTP qui fera appel à errorMessages
  return next(error); // On la passe au middleware d'erreur
}

// Autre syntaxe possible :

if (!list) {
  return next(new Error("List not found"), { error.statusCode: 404 });
}
```
Pour respecter les bonnes pratiques API et faciliter le travail du front, les error.details seront toujours un tableau de string.

```js
if (!email) {
  const error = new Error("Email non valide.");
  error.statusCode = 400;
  error.details = ["L'email doit contenir @.", "On peut mettre plein de détails", "Tableau de string standard"];
  return next(error);
}
```
