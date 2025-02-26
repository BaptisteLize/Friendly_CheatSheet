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
## Exemple d'utilisation

```js
router.get("/tests", controllerWrapper(nomController.renderAllTestsPage));
router.get("/tests/:id", controllerWrapper(nomController.renderTestPage));

router.get("/blablas", json(), controllerWrapper(nomController.renderAllBlablasPage));
router.get("/blablas/:id", json(), controllerWrapper(nomController.renderBlablaPage));
```
