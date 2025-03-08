# Exemple de put avec sequelize
- Cas d'une relation Many to Many 
- Ajout d'un Tag a une Carte
- 
```js
async linkTagToCard(req,res,next){
    const { card_id: cardId, tag_id: tagId } = req.params;
    const [card, tag] = await Promise.all([ Card.findByPk(cardId, {include: "tags"}), Tag.findByPk(tagId) ]);
    if (!card || !tag) {
      const error = new Error(!card 
        ? "La carte que vous souhaitez modifier n'existe pas" 
        : "Le label que vous souhaitez ajouter n'existe pas");
      error.statusCode = 400;
      return next(error);
    }
    await card.addTag(tag);
    await card.reload({ include: "tags"});
    res.status(200).json(card);
  },
```
