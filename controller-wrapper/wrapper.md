# Factorisation du try / catch pour les controllers

```js

function controllerWrapper(middlewareFunction) {
  return async (req, res, next) => {
    try {
      await middlewareFunction(req, res, next);
    } catch (error) {
      res.status(500).render("500")
    }
  }
}
```
