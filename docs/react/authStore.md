# authStore.js

```js
import { create } from "zustand";
import { setToken, getToken, clearToken } from "../services/jwtService";
import { loginRequest, registerRequest, fetchProfile } from "../services/authApi";

export const useAuthStore = create((set) => ({
  user: null,
  token: getToken(),
  error: null,

  async login(email, password) {
    set({ error: null });

    try {
      const { token, user } = await loginRequest(email, password);
      setToken(token);
      set({ token, user });
    } catch (err) {
      console.error("[LOGIN ERROR]", err);
      set({ error: err });
    }
  },

  async register(email, password) {
    set({ error: null });

    try {
      await registerRequest(email, password);
      set({ error: null });
    } catch (err) {
      console.error("[REGISTER ERROR]", err);
      set({ error: err });
    }
  },

  async fetchUserProfile() {
    try {
      const user = await fetchProfile();
      set({ user, error: null });
    } catch (err) {
      console.error("[PROFILE FETCH ERROR]", err);
      set({ user: null, error: err });
    }
  },

  logout() {
    clearToken();
    set({ user: null, token: null, error: null });
  },

  clearError() {
     set({ error: null });
  }

}));
```
