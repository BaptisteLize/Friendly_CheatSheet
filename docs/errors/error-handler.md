# Middleware de gestion des erreurs

```js
const errorMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  500: "Internal Server Error",
};

const errorHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;

  const message = (errorMessages[status] || null) + (error.message ? `: ${error.message}` : "");

  res.status(status).json({
    status,
    message: errorMessages[status] || error.message || "Something went wrong", // En dev, on affiche plus d'infos
    details: error.details || null, // Si on veut envoyer des détails d'erreur spécifiques
  });
};

export { errorHandler };
```
## Exemples d'utilisation dans un controller 

```js
if (!list) {
  const error = new Error(); // On crée l'instance d'erreur (ajouter simplement "votre message" si besoin d'un message personnalisé)
  error.statusCode = 404; // On lui attribue un code HTTP qui fera appel à errorMessages
  return next(error); // On la passe au middleware d'erreur
}
```
```js
if (!email) {
  const error = new Error();
  error.statusCode = 400;
  error.details = { missingField: "email" };
  return next(error);
}
```
