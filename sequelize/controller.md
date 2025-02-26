# Exemple controller avec sequelize

```js
import { Quiz } from "../models/index.js";

const mainController = {

  async renderHomePage(req, res) {
    try {
      
      const quizzes = await Quiz.findAll({
        order: [["title", "ASC"]],
        attributes: ["id", "title", "description"],
        include: [
          {association: "author", attributes: ["firstname", "lastname"]},
          {association: "tags", attributes: ["name"]}
        ]
      });      

      if(!quizzes) {
        res.status(404).render("404");
        return;
      };

      res.render("home", { quizzes });
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
    
  }

};

export default mainController;

```
