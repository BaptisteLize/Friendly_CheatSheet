# Exemples d'utilisation avec jointures

```js
import { Question, Quiz, User } from "./associations.js";

// Récupérer le quiz n°4, avec son auteur et ses tags
const quiz4 = await Quiz.findByPk(4, {
  include: ["author", "tags"],
});

// Récupérer l'utilisateur Chuck, et tous ses quizzes, et les questions de chaque quiz
const chuck = await User.findOne({
  where: { firstname: "Chuck" },
  include: { association: "quizzes", include: "questions" }
});

// Récupérer la question n°11, ses réponses, son niveau, son quiz, ainsi que l'auteur du quiz
const question = await Question.findByPk(11, {
  include: [
    { association: "answers" },
    { association: "level" },
    { association: "quiz", include: "author" }
  ]
});

// Récupérer l'utilisateur n°1 (seulement son nom et prénom)
const user1 = await User.findByPk(1, {
  attributes: ["firstname", "lastname"]
});

// Récupérer le quiz n°7 (seulement son titre et description), son auteur (seulement le nom et prénom de l'auteur)
const quiz7 = await Quiz.findByPk(7, {
  attributes: ["title", "description"],
  include: { association: "author", attributes: ["firstname", "lastname"] }
});
```

## Exemples supplémentaires, syntaxe différente

```js
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
```
