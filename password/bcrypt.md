# Bcrypt

[Documentation](https://www.bcrypt.io/)

## Middleware
```js

import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors du hash du mot de passe :", error);
  }
};

export const comparePasswords = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    if(result){
      return result;
    } else {
      console.log("Mots de passe différents");
      return;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Problème dans le comparatif", error);
  }
};
```

### Contexte d'utilisation enregistrement en BDD

```js

async handleSignupForm(req,res){
    try {
      const { firstname, lastname, email, password } = req.body;

      const hashedPassword = await hashPassword(password);
      
      const newUser = await User.create({firstname, lastname, email, password: hashedPassword});
      
      req.session.user = {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email
      },

      res.redirect("/signup/?success=true");
    } catch (error) {
      console.error(error);
      res.redirect("/signup/?fail=true");
    }
  },

```

### Contexte d'utilisation vérification à la connexion

```js
async handleLoginForm(req, res) {
    try {
      const { email, password } = req.body;

      const connectedUser = await User.findOne({
        where: {
          email: email 
        }
      });

      if(!connectedUser){
        res.redirect("/login/?fail=true");
        return;
      }

      const validPassword = await comparePasswords(password, connectedUser.password);

      if(!validPassword){
        res.redirect("/login/?fail=true");
        return;
      }

      req.session.user = {
        id: connectedUser.id,
        firstname: connectedUser.firstname,
        lastname: connectedUser.lastname,
        email: connectedUser.email,
      },

      res.redirect("/login/?success=true");

    } catch (error) {
      console.error(error);
      res.redirect("/login/?fail=true");
    }
  },

```
