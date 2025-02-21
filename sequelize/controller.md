# Exemple controller avec sequelize

```js
// import dataMapper from "../database/data-mapper.js"; // (DATAMAPPER)
// import { Level } from "../models/V2/Level.js";       // (ACTIVE RECORD MAISON)
import { Level } from "../models/V3/Level.js";          // (ORM Sequelize)



const levelController = {
  async renderLevelsPage(req, res) {
    // DATAMAPPER
    // const levels = await dataMapper.getAllLevels();

    // ACTIVE RECORD
    // const levels = await Level.findAll();

    // ORM Sequelize
    const levels = await Level.findAll();

    res.render("levels", { levels });
  },

  async createLevel(req, res) {
    // Récupérer le BODY de la requête post
    // console.log(req.body); // { name: "..." }

    // ACTIVE RECORD
    // const level = new Level({ name: req.body.name });
    // await level.insert();

    // ORM Sequelize
    const level = new Level({ name: req.body.name });
    await level.save();

    // On reste sur la page
    res.redirect("/levels");
  }
};

export default levelController;

```
