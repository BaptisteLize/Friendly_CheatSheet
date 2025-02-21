# Documentation

<https://sequelize.org/>

## Mise en place

- `npm install sequelize`
- `npm install pg`
- Créer un fichier `sequelize-client.js`

```js
import "dotenv/config";
import { Sequelize } from "sequelize";

// Client de connexion vers la BDD
export const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    createdAt: "created_at", // Mapping du champs createdAt (Sequelize) vers created_at (BDD Postgres)
    updatedAt: "updated_at" // Mapping du champs updatedAt (Sequelize) vers updated_at (BDD Postgres)
  }
});
```

### Types courant pour Sequelize

[Documentation complète](https://sequelize.org/docs/v7/models/data-types/)

| Postgres     | Sequelize   | Explication                         |
| ------------ | ----------- | ----------------------------------- |
| `TEXT`       | `TEXT`      | chaine de caractère illimité        |
| `VARCHAR(N)` | `STRING(N)` | chaine de caractère de maximum N    |
| `CHAR(N)`    | `CHAR(N)`   | chaine de caractère de exactement N |
| `INTEGER`    | `INTEGER`   | entier                              |
| `BOOLEAN`    | `BOOLEAN`   |                                     |
