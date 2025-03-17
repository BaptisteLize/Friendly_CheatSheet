# Migration avec Sequelize
```js
// 📌 EXEMPLE SYNCHRONISATION
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion OK");
    await sequelize.sync({ force: true }); // Recrée les tables
  // Mettre alter: true si modification de la structure souhaitée sans modification des données
    console.log("✅ Base de données synchronisée");
  } catch (error) {
    console.error("❌ Erreur :", error);
  } finally {
    await sequelize.close();
  }
})();
```
**🔹 Explication rapide :**

`force: true` recrée les tables, `alter: true` adapte sans perte de données.

