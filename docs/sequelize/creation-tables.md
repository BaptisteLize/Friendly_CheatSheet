# Process complet de création de tables en BDD uniquement avec sequelize

Exemple d'un fichier type, tout est dans la même page, ne respecte pas le SoC mais montre bien toutes les étapes

```js
// 📌 CONFIGURATION SEQUELIZE
import { Sequelize, DataTypes, Model } from "sequelize";
const sequelize = new Sequelize("postgres://user:pass@localhost:5432/dbname", {
  dialect: "postgres",
  logging: false,
});

// 📌 EXEMPLES MODÈLES
class Test1 extends Model {}
Test1.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Test1", tableName: "test_1" }
);

class Test2 extends Model {}
Test2.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "Test2", tableName: "test_2" }
);

// 📌 EXEMPLES ASSOCIATIONS
Test1.hasMany(Post, { foreignKey: "test1Id", onDelete: "CASCADE" });
Test2.belongsTo(User, { foreignKey: "test1Id" });

// 📌 EXEMPLE SYNCHRONISATION
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion OK");
    await sequelize.sync({ force: true }); // Recrée les tables
    console.log("✅ Base de données synchronisée");
  } catch (error) {
    console.error("❌ Erreur :", error);
  } finally {
    await sequelize.close();
  }
})();


🔹 Explication rapide :
Connexion : Instancie Sequelize avec PostgreSQL.
Modèles : Définit User et Post.
Associations : Un User peut avoir plusieurs Post.
Synchronisation : force: true recrée les tables, alter: true adapte sans perte de données.
Cette fiche tient sur une seule page et couvre l’essentiel ! 🚀
```
