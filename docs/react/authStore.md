# 🔁 Fichier `authStore.js` — décryptage complet

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

## 🔹 1. Les imports

`create` : fonction principale de Zustand pour créer un store

`jwtService.js` : permet de gérer le token dans `localStorage` (set, get, clear)

`authApi.js` : contient les appels API séparés pour login, register et fetch du profil

🎯 Avantage : chaque responsabilité est dans son propre fichier → le `store` reste concentré sur la logique métier front.

## 🔹 2. Création du store

```js
const useAuthStore = create((set) => ({
```

`create((set) => ({ ... }))` : c’est la structure classique de Zustand.

`set()` permet de modifier l’état du store.

On définit ici les états initiaux et les fonctions.

### 🔸 États initiaux

```js
  user: null,
  token: getToken(),
  error: null,
```

`user` : l'utilisateur connecté (ou `null` au départ)

`token` : on va chercher directement un token déjà existant dans `localStorage` grâce à `getToken()`. Pratique en cas de "connexion persistante".

`error` : utilisé pour stocker les éventuels messages d’erreurs à afficher dans l’UI.

🎯 Pourquoi garder `token` ici si on a déjà `localStorage` ? Parce que React a besoin d’un état observable pour re-render automatiquement. Si on ne le met que dans `localStorage`, il ne peut pas suivre les changements.

## 🔹 3. Fonction `login`

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

### 🔍 Étapes

- On efface les erreurs précédentes

- On appelle la fonction `loginRequest()` (extrait dans `authApi.js`)

- Si le backend renvoie une erreur, on la stocke dans `store.error`

- Sinon, on :

 - sauvegarde le token

 - met à jour les données dans le store (et React suit automatiquement)

## 🔹 4. Fonction `register`

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

🔹 5. Fonction `fetchUser`

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

## 🔹 6. Fonction `logout`

```js
  logout() {
    clearToken(); // Supprime le token du localStorage
    set({ token: null, user: null, error: null }); // Réinitialise tout
  },
```

Supprime les données locales

Déconnecte totalement l’utilisateur

## 🔹 7. Fonction clearError

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

## 🤔 8. Comment l’utiliser dans un composant React ?

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
