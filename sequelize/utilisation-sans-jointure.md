# Exemples d'utilisation sans jointure

```js
import { Op } from "sequelize";
import { Level } from "./Level.js";

===== Créer un enregistrement (méthode 1) ====
const level1 = new Level({ name: "Facile" });
await level1.save();

// ===== Créer un enregistrement (méthode 2) ====
const level2 = await Level.create({ name: "Moyen" });
console.log(level2);

// ==== Modifier un enregistrement (méthode 1) ====
const hardLevel = await Level.create({ name: "hard" });
hardLevel.name = "Hard Core";
await hardLevel.save();


// ==== Modifier un enregistrement (méthode 2) ====
const easylevel = await Level.create({ name: "easy" });
await easylevel.update({ name: "Very easy !"});


// ==== Modifier un enregistrement (méthode 1) ====
const hardLevel = await Level.create({ name: "hard" });
hardLevel.name = "Hard Core";
await hardLevel.save();


// ==== Modifier un enregistrement (méthode 2) ====
const easylevel = await Level.create({ name: "easy" });
await easylevel.update({ name: "Very easy !"});


// ==== Supprimer un enregistrement ====
const toDeleteLevel = await Level.create({ name: "A supprimer" });
await toDeleteLevel.destroy();


// ===== Récupérer un enregistrement par son ID ====
const level3 = await Level.findByPk(3);

console.log(level3); // Level{...}
console.log(level3.toJSON()); // Astuce : pour vos console.log, pratique pour observer les données
console.log(JSON.stringify(level3, null, 2)); // Astuce : également

console.log(level3.id); // 3
console.log(level3.name); // Expert

// ===== Récupérer tous les enregistrements ====
const levels = await Level.findAll();
console.log(levels); // [Level{...}, Level{...}, Level{...}]
console.log(levels.map(level => level.toJSON()));
console.log(JSON.stringify(levels, null, 2));

// ===== Récupérer un enregistrement par un autre champ que l'ID ====
const expertLevel = await Level.findOne({ where: { name: "Expert" } }); // SELECT * FROM "level" WHERE "name" = 'Expert' LIMIT 1;
console.log(expertLevel.toJSON()); // Level{...}

// ===== Récupérer tous les enregistrement par un autre champs que l'ID ====
// Exemple : récupérer tous les niveaux avec le name "Moyen"
const mediumLevel = await Level.findAll({ where: { "name": "Moyen" }});
console.log(mediumLevel.length);

// Exemple : récupérer les 5 premiers niveaux par ordre alphabétique
const fiveFirstLevels = await Level.findAll({
  attributes: ["id", "name"],
  order: [["name", "ASC"]]/* Comment filtrer par ordre croissant ? */,
  limit: 5
});
// SELECT "id", "name" FROM "level" ORDER BY "name" ASC LIMIT 5;
console.log(JSON.stringify(fiveFirstLevels, null, 2));


// Exemple : récupérer tous les niveaux qui contienne la lettre "e"
const levelsContainingLetterE = await Level.findAll({
  where: {
    name: {
      [Op.iLike]: '%e%'
    }
  }
});

// SELECT * FROM "level" WHERE "name" ILIKE '%e%';
console.log(
  levelsContainingLetterE.map(level => level.name)
);

```
