# Paramètrages préalables

- architecture du projet :

  ![image](https://github.com/user-attachments/assets/285e5637-9d0f-4f55-91f5-11bde0afec91)

- repository github en public
- fichier `.env.example` paramétré comme suit :

  - ```env

    PORT=3000
    PG_URL=postgres://user:password@localhost:5432/databasename
    SESSION_SECRET=testT!Blabla!*
    NODE_ENV=production
    ```

- fichier de démarrage de l'application (server.js | index.js | app.js) paramétré comme suit à adapter aux dépendances projet :
  
  - ```js
    import "dotenv/config";
    import express from "express";
    import path from "path";
    import router from "./app/router.js";
    import connectPgSimple from "connect-pg-simple";
    import pg from "pg";
    import session from "express-session";
    
    
    const app = express();
    app.set("trust proxy", 1);
    
    app.set("view engine", "ejs");
    app.set("views", path.join(import.meta.dirname, "/app/views"));
    app.use(express.static(path.join(import.meta.dirname, "public")));
    app.use(express.urlencoded({ extended: true }));
    
    const pool = new pg.Pool({
      connectionString: process.env.PG_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    });
    
    const pgSession = connectPgSimple(session);
    const store = new pgSession({
      pool: pool,
      tableName: "user_sessions",
      createTableIfMissing: true
    });
    
    app.use(session({
      store,
      secret: process.env.SESSION_SECRET,
      resave: false, 
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000 // Conservé 30 jour
      } 
    }));
    
    app.use((req, res, next) => {
      res.locals.session = req.session;
      next();
    });
    
    app.use(router);
    
    const port = process.env.PORT || 3000;
    app.listen(port, () => {console.log(`Server started at http://localhost:${port}`);});
    ```
