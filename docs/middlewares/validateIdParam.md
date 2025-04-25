# Validate Id Param
```js
export function validateIdParam(req, res, next) {

  const id = parseInt(req.params.id, 10);

  if (isNaN(id) || id <= 0) {
    const error = new Error("L'identifiant fourni n'est pas valide.");
    error.details = "L'id doit être un entier positif.";
    error.statusCode = 400;
    return next(error);
  }

  req.params.id = id;

  next();
}

// On parse l'id pour en faire un entier en base 10 (système décimal classique)
// Le deuxième argument "10" garantit que l'interprétation se fait bien en base décimale
```
