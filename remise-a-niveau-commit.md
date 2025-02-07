# Faire une remise à niveau en fonction d'un commit

## Trouver le hash du commit concerné

`git log --reverse`

Présenté sous ce format : a1b2c3d4e5f6g7h8i9j0k

## Revenir à ce commit

`git reset --hard mettre_ici_le_hash_du_commit`

### Optionnel : Forcer la syncrhonisation avec le dépôt distant

Si ton projet est sur GitHub et que tu veux écraser l'historique distant :

`git push --force origin main`
