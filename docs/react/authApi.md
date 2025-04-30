# authApi.js

```js
import { getAuthHeaders } from "../services/jwtService";

const BASE_URL = "http://localhost:3000";

export async function loginRequest(email, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw data;
  return data;
}

export async function registerRequest(email, password) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw data;
  return data;
}

export async function fetchProfile() {
  const response = await fetch(`${BASE_URL}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  const data = await response.json();
  if (!response.ok) throw data;
  return data;
}
```

## Refactorisé

```js
import { getToken, getAuthHeaders } from "../services/jwtService";

const BASE_URL = import.meta.env.VITE_API_URL;  // À TESTER POUR VOIR SI ÇA PEUT FONCTIONNER (juste plus simple pour la prod)
                                                // ou fixe : "http://localhost:3000"

/**
 * Utility function to make an API request.
 * It handles HTTP methods, body, headers, and errors.
 */
export async function apiRequest(endpoint, method = "GET", data = null, token = getToken()) { // TESTER si besoin de getToken() ou si getAuthHeaders directement suffirait
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(), // ajoute le token si fourni
    },
  };

  if (data) {
    options.body = JSON.stringify(data); // Ajoute les données au corps de la requête si présentes
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const result = await res.json();

    if (!response.ok) {
      throw result; // On jette la réponse backend pour laisser le composant/store gérer l'erreur
    }               // qui pourra l'utiliser directement en error.message ou error.details

    return result;

  } catch (error) {
      console.error("Erreur API:", error); // log optionnel
      throw error; // on relance l'erreur pour la propager
  }
}
```
