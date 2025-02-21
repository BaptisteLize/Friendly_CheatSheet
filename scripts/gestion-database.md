# Pré requis

- dotenv (dependance)
- dotenv-cli (dev dependance)

## Scripts

Création des tables (avec drop inclus) :

```bash
"db:create": "npx dotenv -e .env -- bash -c 'psql -U ${PGUSER} -d ${PGDATABASE} -f data/create-db.sql'",
```

Populate des tables - remplissage avec échantillonage fictif (avec truncate inclus) :

```bash
"db:populate": "npx dotenv -e .env -- bash -c 'psql -U ${PGUSER} -d ${PGDATABASE} -f data/populate-db.sql'",
```

Reset global (drop, create, populate) :

```bash
"db:reset": "npx dotenv -e .env -- bash -c 'psql -U ${PGUSER} -d ${PGDATABASE} -f data/create-db.sql'; npx dotenv -e .env -- bash -c 'psql -U ${PGUSER} -d ${PGDATABASE} -f data/populate-db.sql'"
```
