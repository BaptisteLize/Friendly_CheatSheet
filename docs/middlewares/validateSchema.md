# Validate Schema
```js
export function validate(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, {
      abortEarly: false, //  ne s'arrête pas à la première erreur, renvoie toutes les erreurs de validation
      allowUnknown: false, // rejette les champs inattendus
      stripUnknown: true, // supprime les champs inattendus
    });

    if (validation.error) {
      const messages = validation.error.details.map(detail => detail.message);
      const error = new Error();
      error.statusCode = 400;
      error.details = messages;
      return next(error);
    }

    // remplace req.body par les données validées et nettoyées
    req.body = validation.value;
    next();
  };
}
```
