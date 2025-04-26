# Migration ou Création avec Sequelize

Exemple de fichier createTables.js (ou migrateTables.js)

```js
import { sequelize } from "../../models/index.js";

async function createTables() {

  try {
    await sequelize.authenticate();
    console.log("✅ Connexion OK");

    await sequelize.sync({ force: true });
    console.log("✅ Base de données synchronisée");

  } catch (error) {
    console.error(error);

  } finally {
    await sequelize.close();
  }

}

createTables();
```

**🔹 Explication rapide :**

- `force: true` recrée les tables,
- `alter: true` adapte sans perte de données.

Utiliser en fonction le bon format.
