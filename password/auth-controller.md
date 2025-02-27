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
    // Récupérer les données du body dans une/plusieurs variables (Condition : vérifier la présence du body parser en amont du controlleur)
    // firstname, lastname, email, password, confirm
    const { firstname, lastname, email, password, confirm } = req.body;
    // console.log({ firstname, lastname, email, password, confirm });

    // Vérifier que tous les champs sont présents
    if (!firstname || !lastname || !email || !password || !confirm) {
      // --> sinon : 400 (Bad Request)
      res.status(400).render("register", { errorMessage: "Tous les champs sont obligatoires." });
      return;
    }

    // Vérifier que le format des champs est le bon (CF - S12 - Body validation)
    // --> sinon : 400 (Bad Request)

    // Vérifier que le mot de passe et sa confirmation matchent !
    // --> sinon : 400 (Bad Request)
    if (password !== confirm) {
      return res.status(400).render("register", { errorMessage: "Le mot de passe et sa confirmation ne correspondent pas." });
    }

    // Vérifier que le mot de passe est suffisamment complexe
    // - 12 caractères mini (CNIL)
    // - 1 chiffre
    // - 1 majuscule / 1 minuscule
    // - 1 symbole
    // --> sinon : 400 (Bad Request)
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

    // Vérifier si un utilisateur avec le même email n'existe pas déjà en BDD => faire une requête pour récupérer un utilisateur par son email
    const alreadyExistingUser = await User.findOne({ where: { email: email }}); // {...} || null
    // --> sinon : 409 (Conflict)
    if (alreadyExistingUser) {
      return res.status(409).render("register", { errorMessage: "L'email renseigné est déjà utilisé." });
    }

    // Hacher le mot de passe (pour ne pas le sauvegarder en clair)

    // Sauvegarder l'utilisateur en BDD (via le model User)
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

// Question : On peut pas le logger directement en une seule étape avec la création du compte ?
// Réponse : KISS (mais oui on pourrait, mais plutôt mauvaise pratique, sauf cas particulier)
```
