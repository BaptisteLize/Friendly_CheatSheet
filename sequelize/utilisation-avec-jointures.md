# Exemples d'utilisation avec jointures

```js
import { Question, Quiz, User } from "./associations.js";

// Je veux récupérer le quiz n°4, avec son auteur, mais également ses tags
const quiz4 = await Quiz.findByPk(4, {
  include: ["author", "tags"],
});

// Je veux récupérer l'utilisateur Chuck, et tous ses quizzes, et les questions de chaque quizz
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

// Je veux récupérer l'utilisateur n°1 mais seulement son nom et prénom
const user1 = await User.findByPk(1, {
  attributes: ["firstname", "lastname"]
});

// Je veux récupérer le quiz n°7 (juste son title et description), son auteur (mais seulement le nom et prénom de l'auteur)
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
## Opérateurs de comparaison

[Documentation pour Opérateurs](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators)

```js
// , ici retourne uniquement les cadeaux
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

## Tri des sorties de données

```js
const tags = await Tag.findAll({
        attributes: ["name"],
        include: {association: "quizzes", attributes: ["id", "title", "description"]},
        order: [["name", "ASC"], ["quizzes", "title", "ASC"]] // dans l'ordre, le tri pour les tag, ensuite l'appel de la table associée via son alias directement et le système de tri souhaité
      });
```

Si cette syntaxe ne fonctionne pas pour le tri il faut forcer la reconnaissance du modèle :
```js
order: [["name", "ASC"], [{ model: Quiz, as: "quizzes" }, "title", "ASC"] 
  ],
```

## Randomiser des sorties de données associées

Sequelize ne tolère pas la randomisation des résultats sortant d'associations *(au 26/02/2025)*.

Il faudra donc récupérer tout ce qui ne sera pas random dans un premier temps puis agir sur l'association en dehors de la première query grâce à une boucle traitant les fonctions asynchrones / await.

**! ATTENTION !** - Cela lancera un deuxième appel BDD dans le même controller, niveau perf, pas dingue, est-ce que ca marche ? Yep !
```js
const quizId = req.params.id;
      const quiz = await Quiz.findByPk(quizId, {
        attributes: ["title", "description", "created_at"],
        include: [
          {association: "author", attributes: ["firstname", "lastname"]},
          {association: "tags", attributes: ["name"]},
          {association: "questions", attributes: ["id", "description", "anecdote", "wiki"],
            include: [
              {association: "level", attributes: ["name"]}
            ]
          }
        ]
      });

for (const question of quiz.questions) {
        question.answers = await Answer.findAll({
          where: { question_id: question.id },
          attributes: ["description", "is_valid"],
          order: sequelize.random()
        });
      }
```

Autre option, via JS directement 

```js
const quizId = req.params.id;
      const quiz = await Quiz.findByPk(quizId, {
        attributes: ["title", "description", "created_at"],
        include: [
          {association: "author", attributes: ["firstname", "lastname"]},
          {association: "tags", attributes: ["name"]},
          {association: "questions", attributes: ["description", "anecdote", "wiki"],
            include: [
              {association: "answers", attributes: ["description", "is_valid"]},
              {association: "level", attributes: ["name"]}
            ]
          }
        ]
      });

quiz.questions.forEach(question => {
        question.answers.sort(() => Math.random() - 0.5);
      });
```

Explications sur la méthode .sort cumulée au Math.random() :
```
Comment fonctionne .sort() en JavaScript ?
La méthode .sort() de JavaScript prend une fonction de comparaison qui détermine l'ordre des éléments. La fonction de comparaison reçoit deux arguments, généralement appelés a et b, et doit retourner :

Un nombre négatif si a doit apparaître avant b.
Un nombre positif si a doit apparaître après b.
0 si a et b sont considérés comme égaux.
Pourquoi Math.random() - 0.5 fonctionne :
Math.random() : Génère un nombre aléatoire entre 0 et 1 (exclus).
Math.random() - 0.5 : Cela déplace la plage des résultats pour qu'elle soit entre -0.5 et 0.5.
Si le résultat est positif (i.e., entre 0 et 0.5), cela signifie que a doit venir après b.
Si le résultat est négatif (i.e., entre -0.5 et 0), cela signifie que a doit venir avant b.
Si le résultat est très proche de 0 (par exemple, entre -0.2 et 0.2), alors a et b sont considérés comme égaux et resteront dans le même ordre relatif.
Exemple :
Math.random() retourne 0.8 → 0.8 - 0.5 = 0.3 → a doit venir après b.
Math.random() retourne 0.2 → 0.2 - 0.5 = -0.3 → a doit venir avant b.
Pourquoi cette méthode est-elle efficace pour randomiser ?
En utilisant Math.random() - 0.5, tu obtiens un nombre aléatoire qui peut être négatif ou positif, ce qui permet de mélanger aléatoirement les éléments du tableau. C'est une manière rapide et pratique de mélanger un tableau sans avoir besoin de logiques supplémentaires complexes.

Résumé :
La méthode .sort() attend une fonction de comparaison qui retourne un nombre positif, négatif ou zéro pour déterminer l'ordre des éléments.
En utilisant Math.random() - 0.5, tu assures que l'ordre des éléments est aléatoire, car le résultat de la comparaison est aléatoire, entraînant ainsi un mélange aléatoire des éléments du tableau.
```
