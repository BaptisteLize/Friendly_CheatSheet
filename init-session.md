npm install express-session
// index.js

import session from "express-session";

// Middleware de session, à ajouter AVANT le router
app.use(session({
  secret: process.env.SESSION_SECRET, // phrase secrete pour générer des SESSION_ID securisé, plus difficilement devinable // graine de seeding
  resave: false, // (pas interessant) ne pas re-sauvegarder la session si elle n'est pas été modifié
  saveUninitialized: true, // (pas interessant) autoriser la création de session même si elle est vide
  cookie: {
    secure: false, // secure: false pour le HTTP // secure: true pour le HTTPS
    maxAge: 24 * 60 * 60 * 1000 // les cookies sont conservé par le navigateur 1 journée (24H en millisecondes)
  } 
}));
