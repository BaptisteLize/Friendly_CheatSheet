import "dotenv/config";
import { Sequelize } from "sequelize";

// Client de connexion vers la BDD
export const sequelize = new Sequelize(process.env.PG_URL);

// Bonus - pour tester, on peut se servir de la doc
// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }
