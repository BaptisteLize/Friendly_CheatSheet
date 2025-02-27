# Différents codes erreurs

https://developer.mozilla.org/fr/docs/Web/HTTP/Status

## Erreurs les plus rencontrées

- 4XX = Erreurs clients

  `404` - Not Found
  - Indique que le client a demandé une route qui n'existe pas.

  `403` - Unauthorized
  - Indique que le client a demandé l'accès à une route pour laquelle il n'a pas les droits d'accès.
 
  `400` - Bad Request
  - Indique que le serveur ne peut pas comprendre ou traiter la requête en raison d'une erreur côté client (par exemple une requête dont la syntaxe ou le contenu est invalide).
 
  - `409` - Conflict
  - Indique que la requête entre en conflit avec l'état actuel du serveur. Ce code est utilisé dans les situations où l'utilisateur peut être en mesure de résoudre le conflit et de soumettre à nouveau la requête.

- 5XX = Erreurs serveur

  `500` - Unexpected Server Error :
  - Indique un problème lié au serveur, connexion base de donnée ou host du site/app

