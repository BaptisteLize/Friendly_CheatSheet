```html
<!-- Formulaire de filtrage amélioré -->
    <form id="filter-form" action="/search/categorie" method="GET">
        <fieldset>
            <legend>Filtrer par catégorie</legend>
            <div class="filter-options">
                <select name="characteristic" id="filter">
                    <option value="">Toutes les catégories</option>
                    <option value="Corsé">Corsé</option>
                    <option value="Acide">Acide</option>
                    <option value="Fruité">Fruitée</option>
                    <option value="Doux">Doux</option>
                    <option value="Chocolaté">Chocolaté</option>
                    <option value="Épicé">Épicé</option>
                </select>
                <button type="submit" class="btn-primary">Filtrer</button>
            </div>
        </fieldset>
    </form>
```

```css    
/* ✅ Conteneur du formulaire */
#filter-form {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
}

/* ✅ Style du fieldset */
#filter-form fieldset {
  border: 2px solid var(--bulma-primary);
  border-radius: 10px;
  padding: var(--spacing-md);
  background: var(--bulma-main-background);
  text-align: center;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* ✅ Légende du formulaire */
#filter-form legend {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--bulma-primary);
  padding: 5px 10px;
  background: var(--bulma-main-background);
  border-radius: 5px;
}

/* ✅ Conteneur des options */
.filter-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
}

/* ✅ Select */
.filter-options select {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 2px solid var(--bulma-primary);
  border-radius: 5px;
  background: white;
  cursor: pointer;
}

/* ✅ Bouton de filtrage */
.filter-options .btn-primary {
  background: var(--bulma-primary);
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease-in-out;
  border: none;
  cursor: pointer;
}

.filter-options .btn-primary:hover {
  background: var(--bulma-text);
}

/* 📌 Responsive */
@media (max-width: 768px) {
  .filter-options {
      flex-direction: column;
      gap: var(--spacing-sm);
  }

  .filter-options select {
      width: 100%;
  }
}
```
