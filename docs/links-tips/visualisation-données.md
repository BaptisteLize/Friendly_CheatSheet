# Visualisation de données brutes suivant les environnements

[Documentation](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

## View EJS

À noter tout en haut du fichier pour visualier un élément récuperer dans le render :
```js
<pre><code><%= JSON.stringify(NOM_ELEMENT, null, 2) %></code></pre>
```

## Console.log

Pour un tableau :
```js
console.log(level3.toJSON());
```
Pour un objet :
```js
console.log(JSON.stringify(level3, null, 2));
```
