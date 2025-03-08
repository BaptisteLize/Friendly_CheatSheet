# Exemple UPDATE avec sequelize
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
