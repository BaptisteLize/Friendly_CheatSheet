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
