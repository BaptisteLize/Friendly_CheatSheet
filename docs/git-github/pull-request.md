# Pull Request

Généralement, si on travaille à plusieurs, on ne merge pas directement sur `main` sans consulter les collègues.

Voilà la logique régulièrement utilisée :

- Créer une branche et se placer dessus :
  - `git checkout -b NOM_BRANCHE`

- Push la branche :
  - `git push --set-upstream origin NOM_BRANCHE`

- Commit et push régulièrement

- Créer une `Pull Request` (**PR**), ie. `Merge Request`
  - demande d'intégration du code de la branche vers la branche principale
  - via l'interface de GitHub

- La PR est ensuite relue et approuvé
  - si besoin de modification complémentaire, on peut push du code sur la branche et la PR se met à jour.

- On MERGE la PR avec un bouton sur l'interface GitHub

- Puis on met à jour la branche principale en local,
  - on retourne sur la branche principale :
    - `git checkout main`
  - on récupère les commits mergés :
    - `git pull`
