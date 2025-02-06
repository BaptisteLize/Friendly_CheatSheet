# Exercice jointures

1. Récupérer les restaurants et leur ville associée
      +
2. Récupérer les restaurants (juste le nom, à renommer resto_name) et leur ville associée (juste le nom, à renommer city_name)

      ```sql
        SELECT restaurant.name AS resto_name, city.name AS city_name
        FROM restaurant
        JOIN city
        ON city.id = restaurant.city_id
        WHERE city.id = restaurant.city_id;
      ```

3. Récupérer les restaurants et leur catégorie associée.
      +
4. Récupérer les restaurants (juste le nom, à renommer resto_name) et leur catégorie associée (juste leur nom, à renommer category_name).

      ```sql
        SELECT restaurant.name AS resto_name, category.name AS category_name
        FROM restaurant
        JOIN category
        ON category.id = restaurant.category_id
        WHERE category.id = restaurant.category_id;
      ```

5. Récupérer la liste des restaurants mexicains (Mexican)

      ```sql
        SELECT restaurant.name AS resto_name, category.name AS category_name 
        FROM restaurant
        JOIN category
        ON category.id = restaurant.category_id
        WHERE category.name = 'Mexican';
      ```

6. Récupérer la liste des restaurants de Los Santos

      ```sql
        SELECT restaurant.name AS resto_name, city.name AS city_name 
        FROM restaurant
        JOIN city
        ON city.id = restaurant.city_id
        WHERE city.name = 'Los Santos';
      ```

7. (bonus) Récupérer la liste des restaurants (juste le nom), avec leur ville (juste le nom) et leur catégorie (juste le nom).

      ```sql
        SELECT restaurant.name AS resto_name, city.name AS city_name, category.name AS category_name 
        FROM restaurant
        JOIN city
        ON city.id = restaurant.city_id
        JOIN category
        ON category.id = restaurant.category_id
        WHERE city.id = restaurant.city_id
        AND category.id = restaurant.category_id
        ORDER BY category_name ASC;
      ```

8. (bonus) Récupérer la liste des restaurants préférés d'Alice (double jointure)

      ```sql
        SELECT CONCAT("user".firstname, ' ', "user".lastname) AS user_name, restaurant.name AS resto_name, city.name AS city_name, category.name AS category_name 
        FROM "user"
        JOIN favorite
        ON "user".id = favorite.user_id
        JOIN restaurant
        ON restaurant.id = favorite.restaurant_id
        JOIN category
        ON category.id = restaurant.category_id
        JOIN city
        ON city.id = restaurant.city_id
        WHERE "user".firstname ILIKE '%alice%';
      ```
