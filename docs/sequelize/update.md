# UPDATE

Syntaxe Object.entries

```js
async updateOneExpense(req, res, next) {
    
    const expenseId = req.params.id;

    const expenseToUpdate = await Expense.findByPk(expenseId);

    if(!expenseToUpdate) {
      const error = new Error("La dépense que vous souhaitez modifier est introuvable.");
      error.statusCode = 404;
      return next(error);
    }

    Object.entries(req.body).forEach(([key, value]) => {
      if (value !== undefined && key in expenseToUpdate) {
        expenseToUpdate[key] = value;
      }
    });

    const updatedexpense = await expenseToUpdate.save();

    res.status(200).json(updatedexpense);

  },
```

Syntaxe updatedRows/Count

```js
async updateListById(req,res,next){
    const listId = req.params.id;
    const { title, position } = req.body;
    const listToUpdate = await List.update({ title, position }, { where: { id: listId }, returning: true });
    
    if(listToUpdate[0] === 0){
      const error = new Error("La liste que vous souhaitez modifier n'existe pas");
      error.statusCode = 400;
      return next(error);
    }

    res.status(200).json(listToUpdate[1].shift());
  }
  ```
