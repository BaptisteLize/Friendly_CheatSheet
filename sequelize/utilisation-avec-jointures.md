# Exemples d'utilisation avec jointures

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

## Exemples supplémentaires, syntaxe différente

````js
// Retourne le bon de commande n°1 avec : 
  // - son lutin responsable (seulement son surnom) !
  // - la liste des cadeaux associés (seulement leur nom)
  //   - pour chaque cadeau la liste des labels associés (seulement leurs noms)

const order1 = await Order.findByPk(1, {
    include: [
      {association: "elf", attributes: ["surname"]},
      {association: "presents", attributes: ["name"], 
        include: {association: "labels", attributes: ["name"]}}
    ]
  });
  return order1;
}

// Retourne uniquement les surnoms des elfes ayant un chapeau vert,
// Utilise un système de gestion des tableau pour la lecture directe à la place d'un tableau d'objet

const greenHatElves = await Elf.findAll({
    where: {
      hat_color: "green"
    },
    attributes: ["surname"]
  });
  return greenHatElves.map(elf => elf.surname);
}

// Opérateur de comparaison, ici retourne uniquement les cadeaux
// dont le temps de fabriquation est supérieur à cinq jours
// CF : [Doc. Opérateurs](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators)

const fiveDaysPresent = await Present.findAll({
    where: {
      craft_time_in_days: { [Op.gt]: 5 }
    }
  });
  return fiveDaysPresent;
}
```
