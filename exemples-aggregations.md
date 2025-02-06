# Exercice aggregation

1. Le nombre de Pokémons qui possèdent une évolution.

    ```sql
    SELECT COUNT(evolution.base_pokemon_id) FROM evolution;
    ```

2. La liste des noms des Pokémons qui évoluent, et le niveau qu'ils doivent atteindre pour évoluer.

    ```sql
    SELECT pokemon.name AS pokemon_name, evolution.evolution_level AS evolution_level 
    FROM pokemon
    JOIN evolution
    ON pokemon.id = evolution.base_pokemon_id
    ORDER BY evolution_level ASC;
    ```

3. Le nom du dresseur qui possède le plus de Pokémon au stockage, et le nombre de Pokémon qu'il/elle possède.

    ```sql
    SELECT trainer.name AS trainer_name, COUNT(stored_pokemon.trainer_id) AS stored_pokemon 
    FROM trainer
    JOIN stored_pokemon
    ON trainer.id = stored_pokemon.trainer_id
    GROUP BY trainer.name
    ORDER BY stored_pokemon DESC
    LIMIT 1;
    ```

4. Pour chaque dresseur, son nom et la moyenne (arrondie) des niveaux de ses Pokémons portés.

    ```sql
    SELECT trainer.name AS trainer_name, ROUND(AVG(carried_pokemon.pokemon_level)) AS avg_pokemon_level 
    FROM trainer
    JOIN carried_pokemon
    ON trainer.id = carried_pokemon.trainer_id
    GROUP BY trainer.name;
    ```

5. Le nombre de Pokémon de type 'Eau' que porte Peter.

    ```sql
    SELECT trainer.name AS trainer_name, COUNT(carried_pokemon.pokemon_id) as pokemon_count, "type".name AS pokemon_type 
    FROM trainer
    JOIN carried_pokemon
    ON trainer.id = carried_pokemon.trainer_id
    JOIN pokemon
    ON carried_pokemon.pokemon_id = pokemon.id
    JOIN "type"
    ON pokemon.id = "type".pokemon_id
    WHERE "type".name = 'Eau' and trainer.name = 'Peter'
    GROUP BY trainer.name, "type".name;
    ```

6. Mais alors, qui est le meilleur dresseur !? (critère : somme des niveaux de chaque Pokémon porté)

    ```sql
    SELECT trainer.name AS trainer_name, SUM(carried_pokemon.pokemon_level) as sumlevel_of_carried_pokemon 
    FROM trainer
    JOIN carried_pokemon
    ON trainer.id = carried_pokemon.trainer_id
    JOIN pokemon
    ON carried_pokemon.pokemon_id = pokemon.id
    GROUP BY trainer.name
    ORDER BY sumlevel_of_carried_pokemon DESC
    LIMIT 1;
    ```
