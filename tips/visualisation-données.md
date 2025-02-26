# Visualisation de données brutes suivant les environnements

## View EJS

À noter tout en haut du fichier pour visualier un élément récuperer dans le render :
```js
<pre><code><%= JSON.stringify(NOM_ELEMENT, null, 2) %></code></pre>
```

## Console.log

console.log(level3.toJSON()); // Astuce : pour vos console.log, pratique pour observer les données
console.log(JSON.stringify(level3, null, 2)); // Astuce : également
