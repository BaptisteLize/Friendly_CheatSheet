# Configuration du client PostgreSQL via module pg
```js
import "dotenv/config";
import pg from "pg";

// Créer un client de connexion (tunnel) vers notre base de données PostgreSQL
const client = new pg.Client(process.env.PG_URL);

// Ouvrir la connexion
client.connect();

export default client;
```
