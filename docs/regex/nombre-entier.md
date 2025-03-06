# Vérifier si nombre entier ou non

```js
(\\d+)
```
Exemple d'utilisation : 
```js
router.get("/lists/:id(\\d+)"
```
Bloquera l'accès à l'URL si l'ID fournie n'est pas un nombre entier
