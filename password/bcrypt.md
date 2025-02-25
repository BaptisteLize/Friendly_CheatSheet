# Bcrypt

Middleware
```js

import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors du hash du mot de passe :", error);
  }
};

export default hashPassword;

```

Contexte d'utilisation :

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
