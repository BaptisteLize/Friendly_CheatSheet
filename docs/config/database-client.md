# Configuration du client PostgreSQL via module pg
```js
// Charge les variables d'environnement
import "dotenv/config";

// Import du module PG
import pg from "pg";

// Créer un client de connexion (tunnel) vers notre base de données PostgreSQL
const client = new pg.Client(process.env.PG_URL);

// Ouvrir la connexion
client.connect();

// Exporter cette connexion, pour s'en servir dans d'autres fichiers
export default client;
```
