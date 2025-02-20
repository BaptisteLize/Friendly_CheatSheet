# Sequelize

Pourquoi Sequelize ? 
- car il est basé sur Active Record que l'on a étudié
- car il est très populaire, avec bcp de resources et tutoriel
- documentation est "pas trop mal"
- basé sur de la POO, donc illustre ce qu'on a appris ensemble

Un ORM n'est pas necessairement basé sur la POO 
- c'est le cas pour Sequelize
- ce n'est pas le cas pour Drizzle

### Intérêt

- Avec un ORM, on définit nos modèles 1 fois, et on profite de l'ensemble des fonctions mises à disposition par le modèle, sans avoir à les coder.

Professionnelement : 
- on utilise un ORM lorsqu'on veut aller vite
- on utilise un dataMapper lorsqu'on veut un contrôle total des requêtes passés à la BDD
- en pratique, on peut coupler les deux ! 

### Documentation

https://sequelize.org/

### Mise en place

- `npm install sequelize`
- `npm install pg`
- Créer un fichier `sequelize-client.js`

```js

```

### Types courant pour Sequelize

[Documentation complète](https://sequelize.org/docs/v7/models/data-types/)

| Postgres     | Sequelize   | Explication                         |
| ------------ | ----------- | ----------------------------------- |
| `TEXT`       | `TEXT`      | chaine de caractère illimité        |
| `VARCHAR(N)` | `STRING(N)` | chaine de caractère de maximum N    |
| `CHAR(N)`    | `CHAR(N)`   | chaine de caractère de exactement N |
| `INTEGER`    | `INTEGER`   | entier                              |
| `BOOLEAN`    | `BOOLEAN`   |                                     |


## Recap' S10

- Gestion de projet
  - User stories
  - Kanban
  - Wireframes

- Modélisation MERISE
  - MCD
  - MLD
  - MPD (SQL)

- Architecture
  - index.js
  - router.js
  - controller.js
  - ESLint
  - Script NPM
  - ESM (import/export)

- POO
  - Classe et instance
    - `class` (usine à gateau)
    - `this` (gateau)
   - Constructeur
    - `constructor`
    - `new`
  - Attributs (d'instance) : 
    - public
    - privé `#`
  - Getters & Setters 
    - `get`
    - `set`
  - Héritage
    - `extends` (hériter des props et méthodes)
    - `super()` (appel du constructeur parent)

- Data Access Layer
  - 2 grands mécanismes : 
    - à la main
    - avec un ORM

  - à la main (dans notre cas S07/S08/S09) :
    - database-client.js
    - data-mapper.js (Data Mapper)
      - Requêtes SQL
    - controleurs :
      - appels au dataMapper

  - à la main (début de saison S10)
    - database-client.js
    - Model.js (Active Record)
      - Requêtes SQL
    - controleurs : 
      - appels classes et méthodes des classes

  - avec un ORM (Sequelize -> Active Record)
    - Installer
    - sequelize-client.js
    - Level.js 
      - juste la définition du modèle à écrire (les attributs)
      - mais pas les méthodes (Sequelize s'en charge dans leur CoreModel)
    - controleurs : 
      - appels aux classes et méthodes de classes (fournies par ORM)
