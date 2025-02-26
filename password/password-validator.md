# Module password-validator

[Documentation](https://www.npmjs.com/package/password-validator)

```js
import PasswordValidator from "password-validator";

const schema = new PasswordValidator()
      .is().min(12)                                   // Minimum length 12
      .is().max(100)                                  // Maximum length 100
      .has().uppercase()                              // Must have uppercase letters
      .has().lowercase()                              // Must have lowercase letters
      .has().digits(1)                                // Must have at least 2 digits
      .has().symbols(1)
      .has().not().spaces();                          // Should not have spaces
    
if (! schema.validate(password)) {
  return res.status(400).render("register", { errorMessage: "Le mot de passe n'est pas suffisamment complexe. Veuillez utiliser au moins 12 caractères, une majuscule, une minuscule, un chiffre et un symbole." });
}
```
