# **[Joi](https://joi.dev/)**

```js
import Joi from 'joi';

export const createTeamSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(255)
    .required()
    .pattern(/^(?!\s*$).+/)
    .messages({
      'string.base': 'Le nom doit être une chaîne de caractères',
      'string.max': 'Le nom doit comporter au maximum 255 caractères',
      'string.empty': "Le nom est obligatoire",
      'any.required': 'Le nom est obligatoire',
      'string.pattern.base': 'Le nom ne peut pas contenir uniquement des espaces'
    }),
  description: Joi.string()
    .trim()
    .optional()
    .allow("")
    .pattern(/^(?!\s*$).+/)
    .messages({
      'string.base': 'La description doit être une chaîne de caractères',
      'string.pattern.base': 'La description ne peut pas contenir uniquement des espaces'
    })
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
