# Exemple de migration

```sql
BEGIN;

-- Ajout d'un champ "role" dans la table USER
ALTER TABLE "user" ADD "role" VARCHAR(50) NOT NULL DEFAULT 'member';
-- Grace au DEFAULT, tous les enregistrements existants vont avoir 'member' par défaut à l'exécution du script


-- Populate : on va créer/éditer un utilisateur (artificiellement) admin 
UPDATE "user"
SET "role" = 'admin'
WHERE "email" = 'jeff@oclock.io';

COMMIT;
```
