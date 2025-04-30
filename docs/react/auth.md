# Authentication 

## 🔐 jwtService.js — Décryptage complet

Ce fichier centralise toutes les interactions avec le `localStorage` concernant le **token JWT**. Cela permet :
- d’isoler la logique liée à l’authentification,
- de **ne pas dupliquer du code** dans tous les composants ou stores,
- et d’avoir un code plus lisible et testable.

---

### 📦 Fonctions exportées

#### `setToken(token)`

```js
export function setToken(token) {
  if (token) {
    localStorage.setItem("jwt_access_token", token);
  }
}
```

**✅ Objectif :**
Stocke un token JWT (généralement reçu après une connexion) dans le `localStorage`.

**🧠 Pourquoi c’est utile :**
- Le token est sauvegardé même après un rechargement de page.
- Il sera utilisé pour envoyer les requêtes sécurisées (routes privées).

---

#### `getToken()`

```js
export function getToken() {
  return localStorage.getItem("jwt_access_token");
}
```

**✅ Objectif :**
Récupère le token JWT stocké (s’il existe).

**🧠 Pourquoi c’est utile :**
- Permet de vérifier si un utilisateur est connecté.
- Utilisé dans `authStore.js` pour initialiser l’état du `token`.
- Nécessaire pour ajouter un `Authorization` header dans les appels API.

---

#### `clearToken()`

```js
export function clearToken() {
  localStorage.removeItem("jwt_access_token");
}
```

**✅ Objectif :**
Supprime complètement le token du `localStorage` (souvent au logout).

**🧠 Pourquoi c’est utile :**
- Empêche les futures requêtes sécurisées.
- Réinitialise la session utilisateur côté client.

---

#### `getAuthHeaders()`

```js
export function getAuthHeaders() {
  const token = getToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}
```

**✅ Objectif :**
Retourne un objet contenant les headers nécessaires à une requête sécurisée.

**🧠 Pourquoi c’est utile :**
- Permet de centraliser l’ajout du token dans toutes les requêtes.
- **Évite la répétition** du même code dans chaque `fetch`.

**🧪 Exemple d’utilisation :**
```js
fetch("/api/protected-route", {
  headers: {
    "Content-Type": "application/json",
    ...getAuthHeaders(), // Injecte Authorization si le token est présent
  }
});
```

---

#### 💡 À retenir

- `jwtService.js` ne fait **qu’interagir avec le `localStorage`**, rien d’autre.
- Il **ne connaît rien du contexte global** (authStore, React, etc.) → **100% réutilisable**.
- Tu peux **tester ses fonctions une par une** si besoin.

## 📄 Fichier authApi.js — Décryptage complet

### 🔗 Import

```js
import { getAuthHeaders } from "../services/jwtService";
```

Cette fonction permet de récupérer dynamiquement le token JWT enregistré dans le localStorage.

Elle retourne un objet de type { Authorization: "Bearer <token>" } si un token est présent.

On utilise le spread operator (...getAuthHeaders()) plus bas pour fusionner proprement cet objet avec les autres headers.

### 🔐 Fonction login

```js
export async function login(email, password) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}
```

#### 🧠 Objectif

Tenter une connexion utilisateur.

Si l’email/mot de passe sont valides, le backend renvoie un token et un user.

Sinon, il renvoie une erreur (ex : "identifiants invalides").

#### 🔍 Étapes
fetch() envoie une requête POST avec l’email et le mot de passe.

response.json() lit la réponse JSON (c’est-à-dire soit { user, token }, soit { message } en cas d’erreur).

Si la réponse HTTP (response.ok) est fausse (statut 400 ou 401 par exemple), on jette (throw) directement le corps de réponse (data).
Cela permet à l’appelant (comme le authStore) de récupérer l’erreur directement dans un bloc try/catch.

Si tout va bien, on retourne le data.

### 📝 Fonction register

```js
export async function register(email, password) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}
```

#### 🧠 Objectif

Créer un nouvel utilisateur.

Très similaire à login en termes de logique.

#### 🔍 Différence principale

Le backend renvoie souvent juste un message de confirmation, voire un token aussi selon le système.

Le front devra peut-être rediriger l’utilisateur ou afficher un message.

### 👤 Fonction fetchUserProfile

```js
export async function fetchUserProfile() {
  const response = await fetch("/api/users/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}
```

#### 🧠 Objectif

Récupérer les informations de l’utilisateur connecté grâce à son token.

C’est l’équivalent du /me ou /profile classique dans une API sécurisée.

#### 🔍 Particularité

On ajoute dynamiquement les headers d’authentification avec ...getAuthHeaders() :

```js
{ Authorization: "Bearer <token>" }
```

Si le token est absent ou invalide, le backend renvoie une erreur.

Si le token est bon, on récupère les infos du user.

### 🧾 Résumé global

Ce fichier centralise toutes les requêtes HTTP liées à l’authentification.

Chaque fonction fait une requête à l’API REST du backend, gère la réponse et jette (throw) l’erreur si nécessaire.

Le authStore.js capte ces erreurs dans un bloc try/catch et peut ensuite les afficher à l’utilisateur.

On garde une bonne séparation des responsabilités :
→ ici : on gère juste la communication avec l’API
→ ailleurs (dans le store) : on gère les états, erreurs, redirections, messages...


## 🔁 Fichier `authStore.js` — décryptage complet

```js
import { create } from "zustand";
import {
  setToken,
  getToken,
  clearToken,
} from "../services/jwtService";
import {
  loginRequest,
  registerRequest,
  fetchProfile,
} from "../api/authApi";
```

### 🔹 1. Les imports

`create` : fonction principale de Zustand pour créer un store

`jwtService.js` : permet de gérer le token dans `localStorage` (set, get, clear)

`authApi.js` : contient les appels API séparés pour login, register et fetch du profil

🎯 Avantage : chaque responsabilité est dans son propre fichier → le `store` reste concentré sur la logique métier front.

### 🔹 2. Création du store

```js
const useAuthStore = create((set) => ({
```

`create((set) => ({ ... }))` : c’est la structure classique de Zustand.

`set()` permet de modifier l’état du store.

On définit ici les états initiaux et les fonctions.

#### 🔸 États initiaux

```js
  user: null,
  token: getToken(),
  error: null,
```

`user` : l'utilisateur connecté (ou `null` au départ)

`token` : on va chercher directement un token déjà existant dans `localStorage` grâce à `getToken()`. Pratique en cas de "connexion persistante".

`error` : utilisé pour stocker les éventuels messages d’erreurs à afficher dans l’UI.

🎯 Pourquoi garder `token` ici si on a déjà `localStorage` ? Parce que React a besoin d’un état observable pour re-render automatiquement. Si on ne le met que dans `localStorage`, il ne peut pas suivre les changements.

### 🔹 3. Fonction `login`

```js
  async login(email, password) {
    set({ error: null }); // Réinitialise l’erreur précédente (si elle existe)

    try {
      const { token, user, error } = await loginRequest(email, password);

      if (error) {
        return set({ error });
      }

      setToken(token); // Stocke le token dans localStorage
      set({ token, user, error: null }); // Met à jour l’état
    } catch (err) {
      set({ error: { message: "Login failed. Please try again." } });
    }
  },
```

#### 🔍 Étapes

- On efface les erreurs précédentes

- On appelle la fonction `loginRequest()` (extrait dans `authApi.js`)

- Si le backend renvoie une erreur, on la stocke dans `store.error`

- Sinon, on :

 - sauvegarde le token

 - met à jour les données dans le store (et React suit automatiquement)

### 🔹 4. Fonction `register`

```js
  async register(email, password) {
    set({ error: null });

    try {
      const { error } = await registerRequest(email, password);

      if (error) {
        return set({ error });
      }

      // Inscription réussie : pas de login auto
      set({ error: null });
    } catch (err) {
      set({ error: { message: "Registration failed. Please try again." } });
    }
  },
```

Même logique que `login`, mais ici on ne stocke pas l'utilisateur ni le token.

Pourquoi ? Pour forcer une connexion manuelle après inscription (choix UX fréquent).

### 🔹 5. Fonction `fetchUser`

```js
  async fetchUser() {
    try {
      const { user, error } = await fetchProfile();

      if (error) {
        return set({ user: null, error });
      }

      set({ user, error: null });
    } catch (err) {
      set({ error: { message: "Failed to load profile." } });
    }
  },
```

Récupère les infos de profil depuis `/api/users/profile`

Envoie automatiquement le `token` via `getAuthHeaders()` (géré dans `authApi.js`)

Si ça échoue : on vide `user` et on stocke l’erreur

### 🔹 6. Fonction `logout`

```js
  logout() {
    clearToken(); // Supprime le token du localStorage
    set({ token: null, user: null, error: null }); // Réinitialise tout
  },
```

Supprime les données locales

Déconnecte totalement l’utilisateur

### 🔹 7. Fonction clearError

```js
  clearError() {
    set({ error: null });
  },
```

Petite fonction utilitaire simple

Permet d'effacer les messages d’erreur si besoin, par exemple au chargement d’un formulaire ou à la fermeture d’une modal

✅ Et enfin l’export du store

```js
}));

export default useAuthStore;
```

On l’exporte comme un hook React

Utilisable facilement dans n’importe quel composant :

```js
const { user, token, login, error } = useAuthStore();
```

🧠 Résumé visuel mental

```js
useAuthStore = {
  user: null ou { id, email, ... },
  token: "abc.def.ghi",
  error: { message: "Unauthorized" },

  login(email, pass),
  register(email, pass),
  fetchUser(),
  logout(),
  clearError()
}
```

### 🤔 8. Comment l’utiliser dans un composant React ?

Exemple : `LoginForm.jsx`

```jsx
const { login, error, clearError } = useAuthStore();

useEffect(() => {
  clearError(); // On nettoie les anciennes erreurs
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  await login(email, password);
};

return (
  <>
    {error && <p>{error.message}</p>}
    <form onSubmit={handleSubmit}>
      {/* Champs email/password */}
    </form>
  </>
);
```
