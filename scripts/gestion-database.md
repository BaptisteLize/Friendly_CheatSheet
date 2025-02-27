# Scripts Base de données

Pré-requis :
  - **dotenv** (dependance)
  - **dotenv-cli** (dev dependance)

![image](https://github.com/user-attachments/assets/75f3bf6d-9c9b-4e7c-801c-ec092ac7843b)
![image (1)](https://github.com/user-attachments/assets/9b80e75e-e6e2-4b7e-ba5a-b0f28ffb9f7b)

## Scripts

Les exemples de scripts ci-dessus sont fonctionnels si votre dossier data est à la racine, pensez à modifier le chemin en fonction si votre dossier data est dans votre dossier app en ajoutant :
`./app/`   pour Linux
ou
`.\app\`   pour Windows

Création des tables (avec drop inclus) :

Linux
```bash
"db:create": "npx dotenv -e .env -- bash -c 'psql -U ${PGUSER} -d ${PGDATABASE} -f data/create-db.sql'",
```
Windows
```bash
"db:create": "npx dotenv -e .env -- powershell -Command "psql -U $env:PGUSER -d $env:PGDATABASE -f data\create_tables.sql"",
```

Populate des tables - remplissage avec échantillonage fictif (avec truncate inclus) :

Linux
```bash
"db:populate": "npx dotenv -e .env -- bash -c 'psql -U ${PGUSER} -d ${PGDATABASE} -f data/populate-db.sql'",
```
Windows
```bash
"db:populate": "npx dotenv -e .env -- powershell -Command "psql -U $env:PGUSER -d $env:PGDATABASE -f data\add_to_tables.sql"",
```

Reset global (drop, create, populate) :

Linux
```bash
"db:reset": "npx dotenv -e .env -- bash -c 'psql -U ${PGUSER} -d ${PGDATABASE} -f data/create-db.sql'; npx dotenv -e .env -- bash -c 'psql -U ${PGUSER} -d ${PGDATABASE} -f data/populate-db.sql'"
```
Windows
Windows
```bash
"db:reset": "npx dotenv -e .env -- powershell -Command "psql -U $env:PGUSER -d $env:PGDATABASE -f data\create_tables.sql; psql -U $env:PGUSER -d $env:PGDATABASE -f data\add_to_tables.sql""
```
