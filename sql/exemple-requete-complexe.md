# Exemple requête complexe SQL

Pour render toutes les informations nécessaires à une vue, usage de toutes les connaissances acquises en SQL pour sortir un resultat complet.

```js
async getOnePokemon(pokemonId) {
    const result = await db.query(`
      SELECT 
      pokemon.id AS id,
      pokemon.name AS name,
      STRING_AGG(DISTINCT type.name, ', ') AS type_name,
      STRING_AGG(DISTINCT evolution.evolution_pokemon_id::TEXT, ', ') AS evolution_ids,
      STRING_AGG(DISTINCT pokemon_evolution.name, ', ') AS evolution_names,
      STRING_AGG(DISTINCT evolution.evolution_level::TEXT, ', ') AS evolution_levels,
      STRING_AGG(evolution.require_stone::TEXT, ', ') AS require_stones,
      STRING_AGG(evolution.require_exchange::TEXT, ', ') AS require_exchanges
      FROM pokemon
      JOIN type ON pokemon.id = type.pokemon_id
      LEFT JOIN evolution ON pokemon.id = evolution.base_pokemon_id
      LEFT JOIN pokemon AS pokemon_evolution ON evolution.evolution_pokemon_id = pokemon_evolution.id
      WHERE pokemon.id = $1
      GROUP BY pokemon.id`, [pokemonId]);
    const pokemon = result.rows[0];
    return pokemon;
  },
  ```
