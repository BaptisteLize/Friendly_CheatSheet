# Mise en place des sessions

## Installation

npm i [express-session](https://www.npmjs.com/package/express-session) [connect-pg-simple](https://www.npmjs.com/package/connect-pg-simple)

*connect-pg-simple est optionnel et à utiliser dans le cas où vous souhaiter stocker les données des sessions en BDD dans une table gérée par la dépendance*

## Middlewares

pré-requis : 
  - dépendance dotenv
  - Définir la SESSION_SECRET dans le .env

**OPTIONNEL => Stockage des infos sessions dans une BDD**
```js
const pgSession = connectPgSimple(session); // permet de stocker la session dans la pool référencée, ici db
const store = new pgSession({
  pool: db, // nom donné au dataClient lors de l'import dans le fichier js de l'app
  tableName: "NOM_QUE_VOUS_SOUHAITEZ_POUR_LA_TABLE",
  createTableIfMissing: true
});
```

**OBLIGATOIRE => Middleware déclencheur de la session**
```js
app.use(session({
  /* store, À utiliser uniquement si vous avez mis en place connect-pg-simple */
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 jours (en millisecondes)
  }
}));
```

**🔹 resave: false** - Cette option définit si une session doit être sauvegardée dans le store à chaque requête, même si elle n'a pas été modifiée.

- false (recommandé):La session ne sera pas resauvegardée si elle n'a pas été modifiée.
- true: La session sera sauvegardée à chaque requête, même si elle n'a pas changé (peut causer des écritures inutiles dans le store).

**🔹 saveUninitialized: false** - Contrôle si une nouvelle session, créée mais non modifiée, doit être sauvegardée dans le store.

- false (recommandé): Si la session est nouvelle mais qu'aucune donnée n'y a été ajoutée, elle ne sera pas sauvegardée.
- true: Une session vierge sera sauvegardée même si elle ne contient encore aucune donnée.

### Test pour vérifier que la session est bien fonctionnelle :
```js
app.get('/test-session', (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }
  res.send(`Vous avez visité cette page ${req.session.views} fois`);
});
```
### Voir l'objet session : 
```js
app.use((req,res,next) => {
  console.log(req.session);
  next();  
});
```

### Permettre l'utilisation de req.session dans toutes les vues :
```js
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
```
