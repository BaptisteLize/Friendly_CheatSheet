# Exemple pour gérer le delete avec sequelize
```js
async deleteCardById(req,res,next){
    const cardId = req.params.id;
    const destroyedCard = await Card.destroy({ where: { id: cardId } });
    if(!destroyedCard){
      const error = new Error("La carte que vous souhaitez supprimer n'existe pas");
      error.statusCode = 400;
      return next(error);
    }
    res.status(204).end();
  },
```
