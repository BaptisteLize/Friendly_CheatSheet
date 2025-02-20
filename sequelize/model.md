```js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

// On étend le "core model" de Sequelize
export class Level extends Model {}

// On paramètre notre modèle
// Level.init(ATTRIBUTS, CONFIGURATION)

Level.init({
  // id :
  // pas besoin de le faire, c'est déjà intégré dans le core model (Model)
  // le fait que ça soit un entier généré par défaut et clé primaire est déjà pris en charge

  // created_at et updated_at
  // également géré par sequelize !

  // name :
  name: {
    type: DataTypes.TEXT,
    allowNull: false // Pour interdire le champ d'être NULL
  }
}, {
  sequelize, // on fourni l'instance de connexion Sequelize
  tableName: "level", // dans le cadre de ce projet, puisque l'on connecte nos modèles à une BDD déjà existante, on précise vers quelle table ce modèle pointe

  createdAt: "created_at", // faire correspondre le champs createdAt (Sequelize) au champ created_at (notre BDD)
  updatedAt: "updated_at" // faire correspondre le champs updatedAt (Sequelize) au champ updated_at (notre BDD)
});

// TESTER NOTRE MODÈLE
// const levels = await Level.findAll();
// console.log(levels);

```
