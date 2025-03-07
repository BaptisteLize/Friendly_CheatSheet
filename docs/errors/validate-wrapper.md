# Factorisation des validations
```js
export function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      const validationError = new Error('Validation failed');
      validationError.statusCode = 400;
      validationError.details = errorMessages;

      return next(validationError);
    }

    next();
  };
};
```
