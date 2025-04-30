# apiRequest.js

```js
import { getAuthHeaders } from "../services/jwtService";

const BASE_URL = import.meta.env.VITE_API_URL; // Peut aussi être fixée en dur : "http://localhost:3000"

/**
 * Utility function to make any API request.
 * It handles methods, body, headers, auth token, and throw errors.
 */
export async function apiRequest(endpoint, method = "GET", data = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(), // Ajoute automatiquement le token si présent
    },
  };

  // Si des données sont fournies (POST, PUT...), on les stringify dans le body
  if (data) {
    options.body = JSON.stringify(data);
  }

  // Envoi de la requête à l'API
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const result = await response.json();

  // Si la réponse échoue (statut HTTP >= 400), on "jette" l'erreur JSON
  if (!response.ok) {
    throw result; // Cette erreur pourra être directement attrapée dans un bloc try/catch externe
  }

  return result;
}
```
