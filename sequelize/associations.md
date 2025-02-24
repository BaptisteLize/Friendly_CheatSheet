```js
import { Answer } from "./Answer.js";
import { Question } from "./Question.js";
import { Quiz } from "./Quiz.js";
import { Level } from "./Level.js";
import { User } from "./User.js";
import { Tag } from "./Tag.js";

// Doc : https://sequelize.org/docs/v6/core-concepts/assocs/
// Plusieurs manières de faire en Sequelize

// 3 types d'associations : 
// - One-To-One : hasOne + belongsTo
// - One-To-Many : hasMany + belongsTo
// - Many-To-Many : belongsToMany + belongsToMany


// User <--> Quiz (One-To-Many)
User.hasMany(Quiz, {
  foreignKey: "author_id",
  as: "quizzes" // lorsque je requête un user, je veux récupérer... ses quizzes
});
Quiz.belongsTo(User, {
  foreignKey: "author_id",
  as: "author" // lorsque je requête un quiz, je veux récupérer... son author
});

// Quiz <--> Question (One-To-Many)
Quiz.hasMany(Question, {
  foreignKey: "quiz_id", // clé étrangère
  as: "questions" // lorsque je requête un Quiz, je veux récupérer... ses questions
});
Question.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  as: "quiz" // lorsque je requête une Question, je veux récupérer... son quiz
});


// Question <--> Level (One-To-Many)
Level.hasMany(Question, {
  foreignKey: "level_id",
  as: "questions"
});
Question.belongsTo(Level, {
  foreignKey: "level_id",
  as: "level"
});


// Question <--> Answer (One-To-Many)
Question.hasMany(Answer, {
  foreignKey: "question_id",
  as: "answers" // on peut aussi nommer "propositions" ou "suggestions"
});
Answer.belongsTo(Question, {
  foreignKey: "question_id",
  as: "question"
});

// Quiz <--> Tag (Many-To-Many)
Quiz.belongsToMany(Tag, {
  through: "quiz_has_tag", // nom de la table de liaison
  as: "tags",
  foreignKey: "quiz_id",
  otherKey: "tag_id"
});
Tag.belongsToMany(Quiz, {
  through: "quiz_has_tag",
  as: "quizzes",
  foreignKey: "tag_id",
  otherKey: "quiz_id"
});

/*
A.belongsToMany(B, {
  foreignKey: 'A_id',
  otherKey: 'B_id'
})

B.belongsToMany(A, {
  foreignKey: 'B_id',
  otherKey: 'A_id'
})
*/


export { User, Quiz, Tag, Level, Answer, Question };

```
