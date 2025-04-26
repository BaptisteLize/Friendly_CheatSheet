# Modèle type

UUID, createdAt et updatedAt sont gérés automatiquement par sequelize, à vos [**DOCS**](https://sequelize.org/docs/v6/) pour les config du client.

```js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database-client.js";

export class Expense extends Model {}

Expense.init({
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255)
  },
  date: {
    type: DataTypes.DATEONLY
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},

{
  sequelize, // on fourni l'instance de connexion Sequelize
  tableName: "expense",
});
```
