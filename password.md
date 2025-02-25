# Bcrypt

Middleware Bcrypt 

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
