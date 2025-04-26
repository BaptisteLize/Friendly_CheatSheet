# Exemple controller avec sequelize

```js
import { Budget } from '../models/index.js';

export async function getAllBudgets(req, res, next) {
  const budgets = await Budget.findAll({
    attributes: { exclude: ["created_at", "updated_at"] },
    include: {association: "category", attributes: ["name"]},
    order: [["created_at", "DESC"]]
  });

  if (!budgets || budgets.length === 0) {
    const error = new Error("Aucun budget trouvé.");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json(budgets);
}

export async function createOneBudget(req, res) {
  const { amount, alert, category_id } = req.body;
  const createdBudget = await Budget.create({ amount, alert, category_id });
  res.status(201).json(createdBudget);
}

export async function updateOneBudget(req, res, next) {
  const budgetId = req.params.id;
  const budgetToUpdate = await Budget.findByPk(budgetId);

  if (!budgetToUpdate) {
    const error = new Error("Le budget que vous souhaitez modifier est introuvable.");
    error.statusCode = 404;
    return next(error);
  }

  Object.entries(req.body).forEach(([key, value]) => {
    if (value !== undefined && key in budgetToUpdate) {
      budgetToUpdate[key] = value;
    }
  });

  const updatedBudget = await budgetToUpdate.save();
  res.status(200).json(updatedBudget);
}

export async function deleteOneBudget(req, res, next) {
  const budgetId = req.params.id;
  const deletedBudget = await Budget.destroy({ where: { id: budgetId } });

  if (!deletedBudget) {
    const error = new Error("Le budget que vous souhaitez supprimer est introuvable.");
    error.statusCode = 404;
    return next(error);
  }

  res.status(204).end();
}

```
