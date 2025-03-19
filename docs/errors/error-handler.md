# Middleware de gestion des erreurs

```js
// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {

  const status = error.statusCode || 500;
  let message = error.message;

  if (error.details) {
    message = `${message} ${error.details.join(" ")}`;
  }

  return res.status(status).json({ status, message });
};
```
## Exemples d'utilisation dans un controller 

```js
if (!list) {
  const error = new Error("List not found"); // On crée l'instance d'erreur avec message personnalisé
  error.statusCode = 404; // On lui attribue un code HTTP qui fera appel à errorMessages
  return next(error); // On la passe au middleware d'erreur
}
```
```js
if (!email) {
  const error = new Error(); // On crée l'instance d'erreur sans message personnalisé
  error.statusCode = 400;
  error.details = { missingField: "email" }; // On ajoute des détails à l'erreur
  return next(error);
}
```
