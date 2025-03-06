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

  res.status(status).json({
    status,
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred" // En prod, on masque le détail
        : errorMessages[status] || error.message || "Something went wrong", // En dev, on affiche plus d'infos
    details: error.details || null, // Si on veut envoyer des détails d'erreur spécifiques
  });
};

export { errorHandler };
```
## Exemple d'utilisation dans un controller 

```js
if (!list) {
    const error = new Error(); // On crée l'instance de l'erreur (ajouter simplement "votre message" si besoin d'un message personnalisé)
    error.statusCode = 404; // On lui attribue un code HTTP qui fera appel à errorMessages
    return next(error); // On la passe au middleware d'erreur
}
```
