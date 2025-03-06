# Vérification nombre entier

```js
(\\d+)
```
Exemple d'utilisation : 
```js
router.get("/lists/:id(\\d+)"
```
- Bloquera l'accès à l'URL si l'ID fournie n'est pas un nombre entier
- Déclenchera une erreur 404 en cas de non respect de la vérification
