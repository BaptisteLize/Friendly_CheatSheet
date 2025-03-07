# Factorisation du try / catch pour les controllers
**Wrapper sans middleware de gestion des erreurs**
```js
export default function controllerWrapper(middlewareFunction) {
  return async (req, res, next) => {
    try {
      await middlewareFunction(req, res, next);
    } catch (error) {
      return res.status(500).render("500")
    }
  };
}
```
**Wrapper avec middleware de gestion des erreurs**
```js
export default function controllerWrapper(middlewareFunction) {
  return async (req, res, next) => {
    try {
      await middlewareFunction(req, res, next);
    } catch (error) {
      return next(error); 
    }
  };
}
```
## Exemple d'utilisation

```js
router.get("/tests", controllerWrapper(nomController.renderAllTestsPage));
router.get("/tests/:id", controllerWrapper(nomController.renderTestPage));
```
