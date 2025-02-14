Penser à installer :

npm i express-session connect-pg-simple

Définir la SESSION_SECRET dans le .env pour l'utiliser

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
  resave: true, 
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000 // Conservé 1 mois
  } 
}));

app.use((req,res,next) => {
  console.log(req.session);
  next();  
});

```
