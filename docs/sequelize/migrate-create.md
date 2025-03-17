# Migration avec Sequelize

Exemple de fichier createTables.js (ou migrateTables.js)
```js
import { sequelize } from "./sequelize-client.js";
import "./associations.js";

(async () => {
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
})();
```
**🔹 Explication rapide :**

- `force: true` recrée les tables,
- `alter: true` adapte sans perte de données.

Utiliser en fonction le bon format.

