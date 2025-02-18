Création des tables (avec drop inclus) :
```bash
"db:create": "npx dotenv -e .env -- bash -c 'psql -U ${PGUSER} -d ${PGDATABASE} -f data/create-db.sql'",
```
Populate des tables (remplissage) : 
```bash
"db:populate": "npx dotenv -e .env -- bash -c 'psql -U ${PGUSER} -d ${PGDATABASE} -f data/populate-db.sql'",
```

Reset global (drop, create, populate) :
```sql
"db:reset": "npx dotenv -e .env -- bash -c 'psql -U ${PGUSER} -d ${PGDATABASE} -f data/create-db.sql'; npx dotenv -e .env -- bash -c 'psql -U ${PGUSER} -d ${PGDATABASE} -f data/populate-db.sql'"
```
