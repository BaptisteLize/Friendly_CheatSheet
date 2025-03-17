# Seeding / Populate des données via sequelize
Exemple de fichier seedTables.js à utiliser avec un fichier à part seedData.js
```js
import { sequelize } from "../sequelize-client.js";
import { Pokemon, Type, Team } from "../models/index.js";
import { pokemonData, typeData, teamData, pokemonTypeData, teamPokemonData } from "./seedData.js";

async function seedDatabase() {
  try {
    await sequelize.sync();

    console.log("Seeding Types...");
    await Type.bulkCreate(typeData);

    console.log("Seeding Pokémon...");
    await Pokemon.bulkCreate(pokemonData);

    console.log("Seeding Teams...");
    await Team.bulkCreate(teamData);

    console.log("Seeding Pokémon-Types Associations...");
    await sequelize.models.pokemon_type.bulkCreate(pokemonTypeData);

    console.log("Seeding Team-Pokémon Associations...");
    await sequelize.models.team_pokemon.bulkCreate(teamPokemonData);

    console.log("Seeding completed!");
  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
```
