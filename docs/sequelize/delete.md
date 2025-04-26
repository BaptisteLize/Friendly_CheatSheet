# Exemple DELETE avec sequelize

```js
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

Autre syntaxe

```js
export async function deleteOneCategory(req, res, next) {

  const categoryId = req.params.id;
  const deletedCategory = await Category.findByPk(categoryId);

  if (!deletedCategory) {
    const error = new Error("La catégorie que vous souhaitez supprimer est introuvable.");
    error.statusCode = 404;
    return next(error);
  }

  await deletedCategory.destroy();

  res.status(204).end();
}
```
