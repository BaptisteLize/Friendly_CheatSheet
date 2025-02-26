# Exemples d'un fichier d'associations

```js
import { Answer } from "./Answer.js";
import { Question } from "./Question.js";
import { Quiz } from "./Quiz.js";
import { Level } from "./Level.js";
import { User } from "./User.js";
import { Tag } from "./Tag.js";

// User <--> Quiz (One-To-Many)
User.hasMany(Quiz, {
  foreignKey: "author_id",
  as: "quizzes"
});
Quiz.belongsTo(User, {
  foreignKey: "author_id",
  as: "author"
});

// Quiz <--> Question (One-To-Many)
Quiz.hasMany(Question, {
  foreignKey: "quiz_id", // clé étrangère
  as: "questions"
});
Question.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  as: "quiz"
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
  as: "answers"
});
Answer.belongsTo(Question, {
  foreignKey: "question_id",
  as: "question"
});

// Quiz <--> Tag (Many-To-Many)
Quiz.belongsToMany(Tag, {
  through: "quiz_has_tag",
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

export { User, Quiz, Tag, Level, Answer, Question };

```
