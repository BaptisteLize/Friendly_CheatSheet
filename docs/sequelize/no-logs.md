# Enlever les logs de query de la console

Ajouter ceci au sequelize.client : `logging: false,`

```js
import "dotenv/config";
import { Sequelize } from "sequelize";

// Client de connexion vers la BDD
export const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    createdAt: "created_at", // Mapping du champs createdAt (Sequelize) vers created_at (BDD Postgres)
    updatedAt: "updated_at" // Mapping du champs updatedAt (Sequelize) vers updated_at (BDD Postgres)
  }
  logging: false,
});
``
