# Gestion des utilisateurs par des middlewares
***pré requis :***

***- avoir récupérer l'id du user***
```js
app.use(async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId, { attributes: { exclude: "password" }});
    res.locals.user = user;
  }
  next();
});
```
