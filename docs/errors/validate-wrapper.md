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

Exemple d'utilisation :
```js
import { Router } from 'express';
import listController from './controllers/listController.js';
import CW from './middlewares/controller-wrapper.js';
import { createListSchema } from './middlewares/schema-validate.js';
import { validate } from './middlewares/validate-wrapper.js';

const router = Router();

router.get("/lists", CW(listController.getAllLists));
router.get("/lists/:id(\\d+)", CW(listController.getListById));
router.post("/lists", validate(createListSchema), CW(listController.createList));
router.patch("/lists/:id(\\d+)", CW(listController.updateListById));
router.delete("/lists/:id(\\d+)", CW(listController.deleteListById));

export { router };
```
