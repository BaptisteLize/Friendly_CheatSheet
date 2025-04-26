# Populate / Seed tables

```sql
BEGIN;

SET client_encoding TO 'UTF8';

-- TRUNCATE supprime TOUS les enregistrements de la table, sans pour autant supprimer les tables elles-même.

TRUNCATE TABLE "level",
"answer",
"user",
"quiz",
"question",
"tag",
"quiz_has_tag" RESTART IDENTITY;

-- Déchargement des données de la table "users"

INSERT INTO "user" ("id", "firstname", "lastname", "email", "password") VALUES
(1, 'Philippe', 'Candille', 'philippe@oclock.io', '$argon2id$v=19$m=65536,t=3,p=4$blvQNIlniTOF5rvdgTqxRw$XJiLCOeETtj0M7CiPDUIQhX7f0PRu3utbYsFvehoIn4'),
(2, 'Jeff', 'Oclock', 'jeff@oclock.io', '$argon2id$v=19$m=65536,t=3,p=4$blvQNIlniTOF5rvdgTqxRw$XJiLCOeETtj0M7CiPDUIQhX7f0PRu3utbYsFvehoIn4'),
(3, 'Chuck', 'Norris', 'chuck@oclock.io', '$argon2id$v=19$m=65536,t=3,p=4$blvQNIlniTOF5rvdgTqxRw$XJiLCOeETtj0M7CiPDUIQhX7f0PRu3utbYsFvehoIn4');
-- Note : le mot de passe haché (avec argon2id) est 'password' ici ;-)

-- Déchargement des données de la table "levels"

INSERT INTO "level" ("id", "name") VALUES
(1, 'Débutant'),
(2, 'Confirmé'),
(3, 'Expert');

-- Déchargement des données de la table "quiz"

INSERT INTO "quiz" ("id", "title", "description", "author_id") VALUES
(1, 'Animaux célèbres - I', 'Tantôt effrayants, tantôt drôles.', 1),
(2, 'Le chocolat - I', 'Bon pour le moral, un peu moins pour le foie.', 1),
(3, 'Linux - I', 'Non, ce n''est pas un pingouin!', 1),
(4, 'Star Wars - I', 'La légende continue.', 1),
(5, 'Les bières belges - I', 'Patrimoine exporté dans le monde entier', 3);

-- Déchargement des données de la table "question"

INSERT INTO "question" ("id", "quiz_id", "description", "level_id", "anecdote", "wiki") VALUES
(1, 1, 'Dans le film d''animation L''Âge de glace, qu''est-ce qui échappe à l''écureuil Scrat ?', 1, 'À l''occasion de la sortie de L''Âge de glace 4, Scrat a eu son double de cire au Musée Grévin le 20 juin 2012.', 'Scrat'),
(2, 7, 'Comment se nomme l''orque à sauver dans une saga cinématographique populaire ?', 1, 'Si les deuxième et troisième films sont des suites du premier, le 4e n''a aucun lien avec le reste et est en quelque sorte un reboot.', 'Sauvez_Willy_(série_de_films)'),
(3, 8, 'Dans le film Les Dents de la mer, quel animal provoque la terreur sur l''île d''Amity ?', 1, 'Les Dents de la mer est un film charnière qui a rétrospectivement été considéré comme le premier des blockbusters américains.', 'Les_Dents_de_la_mer'),
(4, 1, 'Quel personnage de Disney, ami de Mickey Mouse, est un chien anthropomorphe très maladroit ?', 1, 'À partir des années 1990, Dingo est devenu papa dans une série télévisée dans laquelle son fils se prénomme Max.', 'Dingo_(Disney)'),
(5, 7, 'Dans un film d''animation de Disney, comment se nomme le renardeau ami d''un chien de chasse ?', 1, 'Rox et Rouky est le dernier dessin animé de Disney commençant par un générique complet et finissant par « The End ».', 'Rox_et_Rouky'),
(6, 8, 'Quel est le nom du chien de Mickey, apparenté à la race des Saint-Hubert ?', 1, 'Dessiné par Norman Ferguson, Pluto est considéré comme l''un des premiers personnages Disney à sortir du modèle standard.', 'Pluto_(Disney)');

-- Déchargement des données de la table "answer"

INSERT INTO "answer" ("id", "description", "question_id", "is_valid") VALUES
(1, 'Un gland', 1, true),
(2, 'Willy', 2, true),
(3, 'Un requin', 3, true),
(4, 'Dingo', 4, true),
(5, 'Rox', 5, true);

INSERT INTO "answer" ("id", "description", "question_id") VALUES
(265, 'Une pierre', 1),
(266, 'Tom', 2),
(267, 'Une orque', 3),
(268, 'Félix', 4),
(269, 'Alex', 5);

-- Déchargement des données de la table "tag"

INSERT INTO "tag" ("id", "name") VALUES
(1, 'Cinema'),
(2, 'Technologie'),
(3, 'Gastronomie'),
(4, 'Littérature'),
(5, 'Histoire'),
(6, 'Animaux');

-- Déchargement des données de la table "quiz_has_tag"

INSERT INTO "quiz_has_tag" ("quiz_id", "tag_id") VALUES
(1, 1),
(1, 6),
(2, 3),
(2, 7),
(2, 9),
(3, 2);

COMMIT;

-- Mise à jour des séquences d'ID

BEGIN;

-- Note : Postgres, avec le fait d'ajouter IDENTITY BY DEFAULT au lieu de ALWAYS, ne met pas à jour le curseur de l'incrément de la séquence de façon implicite !
-- Il faut donc mettre à jour la valeur courante de chacune des séquences en séléctionnant l'id maximum de chaque table une fois le seeding terminé.
SELECT setval('level_id_seq', (SELECT MAX(id) from "level"));
SELECT setval('answer_id_seq', (SELECT MAX(id) from "answer"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));
SELECT setval('question_id_seq', (SELECT MAX(id) from "question"));
SELECT setval('quiz_id_seq', (SELECT MAX(id) from "quiz"));
SELECT setval('tag_id_seq', (SELECT MAX(id) from "tag"));

COMMIT;
```
