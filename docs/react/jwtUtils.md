# jwtUtils.js

```js
/**
 * Stores the JWT in localStorage.
 * @param {string} token - The JWT access token to be stored.
 */
export function setToken(token) {
  if (token) {
    localStorage.setItem("jwt_access_token", token);
  }
}

/**
 * Retrieves the stored JWT from localStorage.
 * @returns {string|null} - The stored JWT token or null if not found.
 */
export function getToken() {
  return localStorage.getItem("jwt_access_token");
}

/**
 * Removes the stored JWT from localStorage.
 */
export function clearToken() {
  localStorage.removeItem("jwt_access_token");
}
```
