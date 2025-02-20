```js
// ===== DEMONSTRATION (de cours) des méthodes Sequelize ====
// Note : ESM = top level await = on peut utiliser "await" sans être dans une fonction

import { Level } from "./Level.js";


// ===== Créer un enregistrement (méthode 1) ====
const level1 = new Level({ name: "Facile" }); // pas encore dans la BDD
await level1.save();

// ===== Créer un enregistrement (méthode 2) ====
const level2 = await Level.create({ name: "Moyen" });
console.log(level2);


// ===== Récupérer un enregistrement par son ID ====
const level3 = await Level.findByPk(3);
console.log(level3);
console.log(level3.toJSON()); // Astuce : pour vos console.log, pratique pour observer les données
console.log(JSON.stringify(level3, null, 2)); // Astuce : également
```
