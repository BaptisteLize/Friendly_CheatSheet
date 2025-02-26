# Obtenir l'année actuelle en JS via l'objet Date

```js

<%= new Date().getFullYear() %>

```

## Transformer un timestamp en date lisible 

```js
get localeCreationDate() {
    // Renvoie sous format "Jour XX mois YYYY" la date de création de l'instance
    // (ou utiliser dayJS)
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const displayableDate = this.created_at.toLocaleDateString("fr-FR", options);
    return displayableDate;
  }
```
