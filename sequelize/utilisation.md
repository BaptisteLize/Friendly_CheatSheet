# Exemple d'utilisation de sequelize

```js
// ===== DEMONSTRATION (de cours) des méthodes Sequelize ====
// Note : ESM = top level await = on peut utiliser "await" sans être dans une fonction

import { Op } from "sequelize";
import { Level } from "./Level.js";


// ===== Créer un enregistrement (méthode 1) ====
const level1 = new Level({ name: "Facile" }); // pas encore dans la BDD
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


// ==== Supprimer un enregistrement // ==== Modifier un enregistrement (méthode 1) ====
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
## Usage avec **include**

```js
import { Question, Quiz, User } from "./associations.js";

// Je veux récupérer le quiz n°4, avec son auteur, mais également ses tags
const quiz4 = await Quiz.findByPk(4, {
  include: ["author", "tags"],
});

console.log(quiz4.toJSON()); // { id, title, description, created_at, updated_at, author: {}, tags: [{}] }
console.log(quiz4.author.firstname); // Philippe
quiz4.tags.forEach(tag => { console.log(tag.name); }); // Cinema

// Je veux récupérer l'utilisateur Chuck, et tous ses quizzes, et les questions de chaque quizz
const chuck = await User.findOne({
  where: { firstname: "Chuck" },
  include: { association: "quizzes", include: "questions" }
});
console.log(chuck.toJSON(), "\n\n");

console.log(chuck.firstname);
chuck.quizzes.forEach(quiz => {
  console.log("- " + quiz.title);
  quiz.questions.forEach(question => {
    console.log("  - " + question.description);
  });
});


// Récupérer la question n°11, ses réponses, son niveau, son quiz, ainsi que l'auteur du quiz
const question = await Question.findByPk(11, {
  include: [
    { association: "answers" },
    { association: "level" },
    { association: "quiz", include: "author" }
  ]
});
console.log(question.toJSON());

// Je veux récupérer l'utilisateur n°1 mais seulement son nom et prénom
const user1 = await User.findByPk(1, {
  attributes: ["firstname", "lastname"]
}); // SQL : SELECT "firstname", "lastname" FROM "user" WHERE "id" = 1;
console.log(user1.toJSON());

// Je veux récupérer le quiz n°7 (juste son title et description), son auteur (mais seulement le nom et prénom de l'auteur)
const quiz7 = await Quiz.findByPk(7, {
  attributes: ["title", "description"],
  include: { association: "author", attributes: ["firstname", "lastname"] }
});
console.log(quiz7.toJSON());
```
