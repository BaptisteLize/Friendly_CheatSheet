# Git / Github

- Créer une nouvelle branche
  - `git checkout -b NOM_BRANCHE`
  - note : une branche est une version du code (avec des fichiers / lignes de codes en plus ou en moins)

- Changer de branche 
  - `git checkout NOM_BRANCHE`
  - note : on retrouve le code dans l'état de la branche que l'on vise
 
- Push une nouvelle branche sur le dépôt Github
  - `git push --set-upstream origin NOM_BRANCHE`
  - note : `git push` suffit les fois suivantes
  - note : si on fait juste `git push` la première fois, on nous suggère la commande complète

- Savoir sur quelle branche on est : 
  - `git branch` puis `Q` pour quitter
  - `git branch --show-current`
 
- Merger une branche dans une autre : 
  - Retourner sur la branche cible 
    - `git checkout main`
  - Merger la branche choisie dans la branche courante :
    - `git merge NOM_BRANCHE`

  - Supprimer une branche
  - en local : `git branch -D NOM_BRANCHE`
    - attention, s'assurer que cette branche ne serve plus
  - sur GitHub : voir dans l'interface pour supprimer la branche
    - en général, on fait le nettoyage automatiquement au moment du merge

