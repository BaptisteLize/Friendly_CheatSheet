# apiRequest.ts

**Rappels :**

- La méthode JSON.stringify(valeur) convertit une valeur JavaScript en chaîne JSON

- La méthode .json(valeur) produit un objet JavaScript à partir d'une valeur JSON

```js
import { THttpMethods } from "../types/index";
import { getToken } from "../utils/jwtUtils.ts";

const BASE_URL = "http://localhost:3000/";

/**
 * Utility function to make any API request.
 * It handles methods, body, headers, auth token, and throw errors.
 */
export async function apiRequest<T>( endpoint: string, method: THttpMethods = "GET", data: T | null = null): Promise<T> {

  const token = getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {} ), // Ajoute la ligne d'auth si un token est présent
  }

  const options: RequestInit = { method, headers };

  // Si des données sont fournies (POST, PUT...), on les stringify dans le body
  if (data) { options.body = JSON.stringify(data); }

  // Envoi de la requête à l'API
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const result = await response.json(); // Comprendre ici que le résultat sera appelé en cas de réussite ou d'erreur
  // Ce sera pour autant toujours un résultat sous format .json()

  // Si la réponse échoue (statut HTTP >= 400), on "jette" l'erreur JSON
  if (!response.ok) {
    throw result; // Cette erreur pourra être directement attrapée dans un bloc try/catch externe
  }

  return result;
}
```
