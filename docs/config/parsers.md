# Parsers (traducteurs)

## API REST, requêtes AJAX

Format accepté : JSON

```js
app.use(express.json());
```

## Formulaires HTML

Format accepté : application/x-www-form-urlencoded

```js
app.use(express.urlencoded({ extended: true }));
```

👉 Si l'application doit gérer les deux types de requêtes, il est courant d'utiliser les deux middlewares ensemble.