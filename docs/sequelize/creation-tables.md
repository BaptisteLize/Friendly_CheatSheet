# Process complet de création de tables en BDD uniquement avec sequelize

Exemple d'un fichier type, tout est dans la même page, montre bien toutes les étapes

```js
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

// 📌 EXEMPLE ASSOCIATION
Test1.hasMany(Test2, { foreignKey: "test1Id", onDelete: "CASCADE" });
Test2.belongsTo(Test1, { foreignKey: "test1Id" });

// 📌 EXEMPLE SYNCHRONISATION
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion OK");
    await sequelize.sync({ force: true }); // Recrée les tables - Mettre alter: true si modification de la structure souhaitée sans modification des données
    console.log("✅ Base de données synchronisée");
  } catch (error) {
    console.error("❌ Erreur :", error);
  } finally {
    await sequelize.close();
  }
})();


🔹 Explication rapide :
Modèles : Définit User et Post.
Associations : Un User peut avoir plusieurs Post.
Synchronisation : force: true recrée les tables, alter: true adapte sans perte de données.
Cette fiche tient sur une seule page et couvre l’essentiel ! 🚀
```
