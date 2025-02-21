# Se connecter à une base de données postgreSQL 

- Se connecter à Postgres : 
  - `sudo -i -u postgres psql`
    OU
    - Connexion nommée :
      - `psql -d nom-data-base -U nom-de-user`

- Créer un utilisateur de base de données
  - `CREATE USER nom-de-user WITH LOGIN PASSWORD 'password';`

- Créer une base de données nommée
  - `CREATE DATABASE nom-data-base WITH OWNER nom-de-user;`

- Se déplacer sur la base de données :
  - `\c nom-data-base nom-user`

- Exécuter le script de création des tables sur cette base 
  - `\i <drag_and_drop_le_fichier_du_dossier_data/create_db.sql>`
