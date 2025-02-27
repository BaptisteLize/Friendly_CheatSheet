# Exemple de fichier auth.controller.js

```js
import PasswordValidator from "password-validator";
import { User } from "../models/index.js";

const authController = {
  renderRegisterPage(req, res) {
    res.render("register");
  },

  renderLoginPage(req, res) {
    res.render("login");
  },

  async registerUser(req, res) {
    const { firstname, lastname, email, password, confirm } = req.body;

    if (!firstname || !lastname || !email || !password || !confirm) {
      // --> sinon : 400 (Bad Request)
      res.status(400).render("register", { errorMessage: "Tous les champs sont obligatoires." });
      return;
    }

    if (password !== confirm) {
      return res.status(400).render("register", { errorMessage: "Le mot de passe et sa confirmation ne correspondent pas." });
    }

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

    const alreadyExistingUser = await User.findOne({ where: { email: email }});

    if (alreadyExistingUser) {
      return res.status(409).render("register", { errorMessage: "L'email renseigné est déjà utilisé." });
    }

    await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    });

    // Rediriger vers /login
    res.redirect("/login");
  }
};

export default authController;
```
