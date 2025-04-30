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
