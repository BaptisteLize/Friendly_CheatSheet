## Aide memo connexion BDD 

- Se connecter à Postgres via PSQL : 
  - `sudo -i -u postgres psql`
  - `psql -d nomdedatabase -U nomdeuser`
- Créer un utilisateur de base de données
  - `CREATE USER pokemon WITH LOGIN PASSWORD 'pokemon';`
- Créer une base de données nommée
  - `CREATE DATABASE pokemon WITH OWNER pokemon;`
- Se déplacer sur la base de données :
  - `\c pokemon pokemon`
- Exécuter le script de création de tables sur cette base 
  - `\i <drag_and_drop_le_fichier_du_dossier_data/create_pokemon_db.sql>`
