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
  resave: false,  // Sauvegarde uniquement si modifié
  saveUninitialized: false, // Crée une session seulement si nécessaire
  cookie: {
    secure: false,  // Passer à `true` en production avec HTTPS
    httpOnly: true, // Protection contre les attaques XSS
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 jours (en millisecondes)
  }
}));
```

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
