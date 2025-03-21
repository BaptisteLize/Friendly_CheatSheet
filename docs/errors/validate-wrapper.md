# Factorisation des validations
Utilisation sous format de wrapper autour de schémas de validation (fonctions)
```js
export function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      const validationError = new Error();
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
import { validate } from './middlewares/validate-wrapper.js';
import { createListSchema, updateListSchema } from './middlewares/schema-validate.js';

const router = Router();

router.get("/lists", CW(listController.getAllLists));
router.get("/lists/:id(\\d+)", CW(listController.getListById));
router.post("/lists", validate(createListSchema), CW(listController.createList));
router.patch("/lists/:id(\\d+)", validate(updateListSchema), CW(listController.updateListById));
router.delete("/lists/:id(\\d+)", CW(listController.deleteListById));

export { router };
```

Exemple de fichier schema-validate.js - Ici avec [Joi](https://joi.dev/) :
```js
import Joi from 'joi';

export const createListSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Le titre doit être une chaîne de caractères.',
      'string.min': 'Le titre doit comporter au moins 3 caractères.',
      'string.max': 'Le titre doit comporter au maximum 100 caractères.',
      'any.required': 'Le titre est obligatoire.'
    }),
  position: Joi.number()
    .required()
    .messages({
      'number.base': 'La position doit être un nombre.',
      'any.required': 'La position est obligatoire.'
    }),
});

export const updateListSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .messages({
      'string.base': 'Le titre doit être une chaîne de caractères.',
      'string.min': 'Le titre doit comporter au moins 3 caractères.',
      'string.max': 'Le titre doit comporter au maximum 100 caractères.'
    }),
  position: Joi.number()
    .greater(0)
    .messages({
      'number.base': 'La position doit être un nombre.',
    }),
});
```
