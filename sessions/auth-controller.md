# Exemple de fichier `auth.controller.js`

```js
import PasswordValidator from "password-validator";
import argon2 from "argon2";
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

    const hash = await argon2.hash(password);

    await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hash
    });

    res.render("login", { successMessage: "Veuillez à présent vous authentifier." });;
  },

  async loginUser(req, res) {
    
    const { email, password } = req.body;

    if (! email || ! password) {
      return res.status(400).render("login", { errorMessage: "Tous les champs sont obligatoires." });
    }

    const user = await User.findOne({ where: { email : email } });

    if (!user) {
      return res.status(400).render("login", { errorMessage: "L'email et le mot de passe fournis ne correspondent pas." });
    }

    const rawPassword = password;

    const hashedPassword = user.password;

    const isMatching = await argon2.verify(hashedPassword, rawPassword);
    
    if (! isMatching) {
      return res.status(400).render("login", { errorMessage: "L'email et le mot de passe fournis ne correspondent pas." });
    }

    req.session.userId = user.id;

    res.redirect("/");
  },

  async logoutUser(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
};

export default authController;
```
## Toast error & success associés
(Bootstrap Classes)
```ejs
<!-- Toast en cas d'erreur  -->
  <% if (locals.errorMessage) { %>
    <div class="alert alert-danger" role="alert">
      <%= errorMessage %>
    </div>
  <% } %>

  <!-- Toast en cas de succès  -->
  <% if (locals.successMessage) { %>
    <div class="alert alert-success" role="alert">
      <%= successMessage %>
    </div>
  <% } %>
```
