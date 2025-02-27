# Exemple de migration

```sql
-- Script de migration
-- Objectif : modifier la structure de la BDD afin d'ajouter le champ `role` sur la table USER

BEGIN;

-- Ajout d'un champ "role" dans la table USER
ALTER TABLE "user" ADD "role" VARCHAR(50) NOT NULL DEFAULT 'member';
-- Grace au DEFAULT, tous les enregistrements existants vont avoir 'member' par défaut à l'exécution du script


-- Populate : on va créer/éditer un utilisateur (artificiellement) admin 
UPDATE "user"
SET "role" = 'admin'
WHERE "email" = 'jeff@oclock.io';
-- On pourrait dans un second temps, imaginer une page d'administration des admins, accessibles uniquement par ceux-ci (voire par un super-admin)


COMMIT;
```
