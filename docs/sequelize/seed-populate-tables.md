# Seeding / Populate

Exemple de fichier seedTables.js à utiliser avec un fichier à part seedData.js

```js
import { User, Expense, Category, Budget, sequelize } from "../../models/index.js";
import { budgetData, categoryData, expenseData, userData } from "./seedData.js";

async function seedTables() {
  try {
    await sequelize.sync();
    
    await User.bulkCreate(userData);
    await Category.bulkCreate(categoryData);
    await Expense.bulkCreate(expenseData);
    await Budget.bulkCreate(budgetData);

    await sequelize.query(`
      SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));
      SELECT setval('category_id_seq', (SELECT MAX(id) from "category"));
      SELECT setval('expense_id_seq', (SELECT MAX(id) from "expense"));
      SELECT setval('budget_id_seq', (SELECT MAX(id) from "budget"));
      `);

    console.log("✅ Seeding terminé !");

  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
  }
}

seedTables();
```
