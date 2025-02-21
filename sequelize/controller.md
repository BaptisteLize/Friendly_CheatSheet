# Exemple controller avec sequelize

```js
import { Level } from "../models/Level.js"; 

const levelController = {
    const levels = await Level.findAll();

    res.render("levels", { levels });
  },

  async createLevel(req, res) {
    const level = new Level({ name: req.body.name });
    await level.save();

    res.redirect("/levels");
  }
};

export default levelController;

```
