# Codes HTTP

- Les réponses informatives (100 - 199)
- Les réponses de succès (200 - 299)
- Les messages de redirection (300 - 399)
- Les erreurs du client (400 - 499)
- Les erreurs du serveur (500 - 599)

## 1xx Informational

| Code |           Nom           |                                    Description                                     |
| :--: | :---------------------: | :--------------------------------------------------------------------------------: |
| 100  |        Continuer        | Le serveur a reçu les en-têtes de requête et le client doit poursuivre la requête. |
| 101  | Changement de protocole |        Le serveur change de protocole en fonction de la demande du client.         |

## 2xx Success

| Code |      Nom      |                                      Description                                       |
| :--: | :-----------: | :------------------------------------------------------------------------------------: |
| 200  |      OK       |                                  La requête a réussi.                                  |
| 201  |     Créé      |  La requête a été satisfaite, ce qui a entraîné la création d'une nouvelle ressource.  |
| 202  |    Accepté    |    La requête a été acceptée pour traitement, mais le traitement n'est pas terminé.    |
| 204  | Aucun contenu | Le serveur a satisfait avec succès la requête, mais il n'y a aucun contenu à renvoyer. |

## 3xx Redirection

| Code |           Nom           |                                    Description                                    |
| :--: | :---------------------: | :-------------------------------------------------------------------------------: |
| 300  |     Choix multiples     | La ressource demandée a plusieurs choix, chacun avec des emplacements différents. |
| 301  | Déplacée définitivement |  La ressource demandée a été déplacée définitivement vers un nouvel emplacement.  |
| 302  |         Trouvée         |  La ressource demandée a été temporairement déplacée vers un autre emplacement.   |
| 304  |      Non modifiée       |        La version en cache du client de la ressource demandée est à jour.         |

## 4xx Client Errors

| Code |          Nom          |                                 Description                                 |
| :--: | :-------------------: | :-------------------------------------------------------------------------: |
| 400  |  Demande incorrecte   | Le serveur ne peut pas traiter la demande en raison d'une erreur du client. |
| 401  |     Non autorisé      |       Le client doit s'authentifier pour obtenir la réponse demandée.       |
| 403  |       Interdit        |        Le serveur a compris la demande, mais refuse de l'autoriser.         |
| 404  |      Introuvable      |            La ressource demandée est introuvable sur le serveur.            |
| 405  | Méthode non autorisée | La méthode spécifiée dans la demande n'est pas autorisée pour la ressource. |

## 5xx Server Errors

| Code |            Nom            |                                                         Description                                                          |
| :--: | :-----------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
| 500  | Erreur interne du serveur |                  Le serveur a rencontré une condition inattendue qui l'a empêché de répondre à la demande.                   |
| 501  |      Non implémenté       |                   Le serveur ne prend pas en charge la fonctionnalité requise pour répondre à la demande.                    |
| 503  |   Service indisponible    | Le serveur n'est actuellement pas en mesure de traiter la demande en raison d'une surcharge temporaire ou d'une maintenance. |
