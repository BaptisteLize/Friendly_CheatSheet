# Authentication 

## 🔐 jwtUtils.js — Décryptage complet

Ce fichier centralise toutes les interactions avec le `localStorage` concernant le **token JWT**. Cela permet :
- d’isoler la logique liée à l’authentification,
- de **ne pas dupliquer du code** dans tous les composants ou stores,
- et d’avoir un code plus lisible et testable.

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

#### 💡 À retenir

- `jwtService.js` ne fait **qu’interagir avec le `localStorage`**, rien d’autre.
- Il **ne connaît rien du contexte global** (authStore, React, etc.) → **100% réutilisable**.
- Tu peux **tester ses fonctions une par une** si besoin.

---

## 📄 Fichier apiRequest.js — Décryptage complet

### 🔗 Import

```js
import { getAuthHeaders } from "../services/jwtService";
```

- Cette fonction permet de récupérer dynamiquement le token JWT enregistré dans le `localStorage`.

- Elle retourne un objet de type `{ Authorization: "Bearer <token>" }` si un **token est présent**, ou un objet vide sinon.

- On utilise le spread operator (`...getAuthHeaders()`) plus bas pour fusionner proprement cet objet avec les autres headers, sans écraser les clés existantes.

### 🔍 Étapes détaillées

**1. Construction de l’URL**

- L’`endpoint` (ex: `/login`) est concaténé à la `BASE_URL`.

**2. Préparation des options de requête**

- `method`: par défaut `"GET"` mais peut être `"POST"`, `"PUT"`, `"DELETE"`, etc.

- `headers`:
  - Le `Content-Type` est systématiquement `application/json`.
  - Le header `Authorization` est ajouté automatiquement si un token est disponible.

**3. Ajout éventuel d’un corps à la requête**

```js
if (data) {
  options.body = JSON.stringify(data);
}
```

- Si des données sont fournies (ex: login, envoi de formulaire...), elles sont converties en JSON et ajoutées au body.

**4. Lancement de la requête avec fetch()**

```js
const response = await fetch(`${BASE_URL}${endpoint}`, options);
```

**5. Lecture de la réponse JSON**

```js
const result = await response.json();
```

**6. Gestion de l’erreur**

```js
if (!response.ok) {
  throw result;
}
```

- Si la réponse a échoué (response.ok === false, soit statut 400, 401, 500, etc.), on jette (throw) directement le corps JSON de la réponse.

- Ce throw sera capté dans un try/catch plus haut, typiquement dans un store Zustand ou un composant.

**7. Renvoi du résultat en cas de succès**

```js
return result;
```

- Si tout va bien, on retourne la donnée (généralement un objet { user, token }, { data }, etc.).

### ✅ Objectifs & Avantages

- 📦 **Centralisation** : une seule fonction gère tous les appels API du projet.

- 🧼 **Clean code** : plus de fetch() en double ou de répétition des headers.

- 🛡️ **Sécurité intégrée** : le token est automatiquement injecté si l’utilisateur est connecté.

- 🔁 **Réutilisable partout** : utilisable dans les fichiers authApi.js, userApi.js, les stores Zustand ou même des composants React.

- 🎯 **Modularité future** : ce fichier peut évoluer facilement pour intégrer des options plus poussées comme :

  - refreshToken

  - timeout / abortController

  - retries automatiques

  - gestion globale des erreurs réseau

### 🧾 Exemples d’utilisations dans autre fichier

```js
import { apiRequest } from "./apiRequest";

export async function login(email, password) {
  return await apiRequest("/login", "POST", { email, password });
}
```

Dans un store Zustand, on pourra ensuite faire :

```js
try {
  const data = await login(email, password);
  set({ user: data.user, token: data.token, error: null });
} catch (error) {
  set({ error: error.message });
}
```

### Bonus

#### ✅ Pourquoi ne pas mettre de try/catch dans apiRequest

##### 1. 🎯 **Responsabilité unique (Single Responsibility Principle)**

`apiRequest()` a un seul rôle :  
➡️ envoyer une requête,  
➡️ retourner le résultat,  
➡️ ou **jeter (`throw`) l’erreur JSON** reçue du backend.

🔒 Elle **ne décide pas** comment gérer l’erreur (alerte, redirection, console, etc.).

##### 2. 📦 **Réutilisable dans tous les contextes**

Grâce à ce choix :

- on peut gérer les erreurs dans **les composants React** (ex: affichage de message),
- ou dans les **stores Zustand** (ex: `set({ error: err.message })`).

Chaque couche est **libre de réagir comme elle le souhaite**.

##### 3. 🧼 **Code plus clair et modulaire**

Avec ce design :

```js
// Dans un composant React ou un store Zustand
try {
  const user = await apiRequest("/user/me");
  set({ user });
} catch (err) {
  set({ error: err.message });
}
```

🟩 Le code reste lisible, testable, et chaque appel peut :

- gérer ses propres erreurs (ex: login vs dashboard),
- ou les propager à un gestionnaire global.

#### 🧠 Mais… Pourquoi ne pas gérer les erreurs directement dans apiRequest ?

##### 🤔 Mauvaise idée

```js
// Ce serait une erreur dans notre projet actuel
try {
  const res = await fetch(...);
  const data = await res.json();
  return data;
} catch (err) {
  alert("Erreur !"); // ❌ Mauvais pour la réutilisabilité
  return null;
}
```

📛 Problèmes :

- On ne peut plus gérer l’erreur **à l’endroit où on fait l’appel**.
- On **casse l'abstraction** : `apiRequest()` devient **trop lourde**, et **non testable**.
- Difficile à maintenir si on veut **changer l’affichage d’une erreur** dans un cas spécifique.

#### 🛡️ Et si on veut gérer des cas globaux (ex : perte de connexion, 500...) ?

👉 On pourra plus tard :

- Ajouter un **try/catch global dans apiRequest**, juste pour gérer les **erreurs réseau** (pas celles du backend),
- Intégrer un outil comme **Sentry** pour remonter les erreurs,
- Ajouter une logique de **refreshToken automatique** si `401 Unauthorized`.

Mais ce n’est **pas nécessaire à ce stade du projet**. Mieux vaut rester simple.

#### ✅ Résumé

| Avantage                         | Description                                                 |
| -------------------------------- | ----------------------------------------------------------- |
| 🧼 Code clair                    | apiRequest reste une fonction simple, lisible, réutilisable |
| 📦 Réutilisable                  | On peut l’utiliser dans n’importe quel store ou composant   |
| ⚖️ Comportement maîtrisé         | Chaque appel décide lui-même quoi faire en cas d’erreur     |
| 🎓 Conforme aux bonnes pratiques | Recommandé en React / REST API dans les projets pros        |
| 🧠 Évolutif                      | On pourra plus tard ajouter du logging, des retries, etc.   |

#### 📎 Conclusion pour l’équipe

👉 Ne pas mettre de `try/catch` dans `apiRequest()` est **un vrai choix de structure** :

 - **C’est volontaire**, pas un oubli.
 - Cela permet une gestion des erreurs **claire, souple et professionnelle**.
 - C’est **parfaitement conforme** aux attentes d’un projet React moderne + API REST.

#### ✅ Exemple recommandé dans un store Zustand

```js
try {
  const data = await apiRequest("/api/users/profile", "GET");
  set({ user: data, error: null });
} catch (error) {
  set({ error: error.message });
  toast.error(error.message);
}
```

---

## 🔁 Fichier `authStore.js` — décryptage complet

```js
import { create } from "zustand";
import { setToken, getToken, clearToken } from "../utils/jwtUtils";
import { loginRequest, registerRequest, fetchProfile } from "../services/authApi";
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
