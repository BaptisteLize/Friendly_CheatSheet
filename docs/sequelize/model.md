# Exemple d'un modèle sequelize

```js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

export class Level extends Model {}

Level.init({
  // id :
  // pas besoin de le faire, c'est déjà intégré dans le core model (Model)
  // le fait que ça soit un entier généré par défaut et clé primaire est déjà pris en charge

  // createdAt et updatedAt
  // également géré par sequelize !

  name: {
    type: DataTypes.TEXT,
    allowNull: false // Pour interdire le champ d'être NULL
  }
}, {
  sequelize, // on fourni l'instance de connexion Sequelize
  tableName: "level", // dans le cadre de ce projet, puisque l'on connecte nos modèles à une BDD déjà existante, on précise vers quelle table ce modèle pointe
});
```
