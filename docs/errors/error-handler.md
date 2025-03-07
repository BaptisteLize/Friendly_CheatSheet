# Middleware de gestion des erreurs

```js
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const errorMessages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    500: "Internal Server Error",
  };

  const status = error.statusCode || 500;
  const message = (errorMessages[status] || "Something went wrong") + (error.message ? `: ${error.message}` : "");
  const details = error.details;

  if(!details){
    return res.status(status).json({ status, message});
  }
  return res.status(status).json({ status, message, details });
};

export { errorHandler };
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
