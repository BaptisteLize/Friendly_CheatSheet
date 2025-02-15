Penser à installer :

npm i express-session connect-pg-simple

Définir la SESSION_SECRET dans le .env pour l'utiliser *pré-requis : dépendance dotenv*

```js

const pgSession = connectPgSimple(session); // permet de stocker la session dans la pool référencée, ici db
const store = new pgSession({
  pool: db,
  tableName: "user_sessions",
  createTableIfMissing: true
});

app.use(session({
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,  // Sauvegarde uniquement si modifié
  saveUninitialized: false, // Crée une session seulement si nécessaire
  cookie: {
    secure: false,  // Passer à `true` en production avec HTTPS
    httpOnly: true, // Protection contre les attaques XSS
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 jours
  }
}));

app.use((req,res,next) => {
  console.log(req.session);
  next();  
});

```
Test pour vérifier que la session est bien fonctionnelle et conservée en mémoire :

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
Voir l'objet session : 
```js

app.use((req,res,next) => {
  console.log(req.session);
  next();  
});

```

Permettre l'utilisation de req.session dans toutes les vues :

```js

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

```
