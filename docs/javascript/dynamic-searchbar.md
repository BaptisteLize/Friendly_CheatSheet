# Barre de recherche dynamique

```js
setSearchBar() {
    const searchInput = document.getElementById("search-input");

    searchInput.addEventListener("input", () => {
      const pkmCards = document.querySelectorAll(".pkm-card");
      const searchTerm = searchInput.value.toLowerCase();
      pkmCards.forEach(card => {
        const pokemonName = card.getAttribute("data-name").toLowerCase();
        pokemonName.includes(searchTerm) ? card.classList.remove("hidden") : card.classList.add("hidden");
      });
    });
  },

// Si vous avez plusieurs attributs à récupérer, plutôt que d'identifier chaque attribut sur sa ligne utilisez cette méthode :
// const searchAttributes = ["data-name", "data-type"];
// if (searchAttributes.some(attr => card.getAttribute(attr).toLowerCase().includes(searchTerm))
```
