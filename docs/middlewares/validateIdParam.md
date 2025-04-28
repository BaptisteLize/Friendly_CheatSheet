# Validate Id Param

Cf. [**Validators**](https://github.com/BaptisteLize/Friendly_CheatSheet/blob/main/docs/javascript/validators.md)

```js
import { isPositiveInteger } from "../utils/validators.js";

export function validateIdParam(req, res, next) {
  
  const { id } = req.params;

  if (!isPositiveInteger(id)) {
    const error = new Error("L'identifiant fourni n'est pas valide.");
    error.details = ["L'identifiant doit être un entier positif, sans espaces ni caractères spéciaux."];
    error.statusCode = 400;
    return next(error);
  }

  req.params.id = Number(id);

  next();
}
```
