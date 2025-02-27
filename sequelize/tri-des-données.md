# Tri des sorties de données

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

## Random sort - Rendre aléatoires les sorties de données associées

Sequelize ne tolère pas le tri aléatoire des résultats sortant d'associations *(au 26/02/2025)*.

Il faudra donc récupérer tout ce qui ne sera pas random dans un premier temps puis agir sur l'association en dehors de la première query grâce à une boucle traitant les fonctions asynchrones / await.

**! ATTENTION !** - Cela lancera un deuxième appel BDD dans le même controller, niveau perf, pas dingue, est-ce que ca marche ? Yep !
```js
const quizId = parseInt(req.params.id);
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

Autre option, via JS directement - cf : [Méthode sort](https://github.com/BaptisteLize/CheatSheet_BaptisteLize/blob/df223f9744205c23a472affe53eba17de0abbc70/objets-methodes/sort.md)

```js
const quizId = parseInt(req.params.id);
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
