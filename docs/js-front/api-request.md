# API REQUEST 
```js
const BASE_URL = "http://localhost:3000";

async function apiRequest(endpoint, method = "GET", data = null) {
  try {
    const options = { method, headers: { "Content-Type": "application/json" } };
    
    if (data) options.body = JSON.stringify(data);

    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    
    if (method === "DELETE" && response.status === 204) return { success: true };

    const result = await response.json();
    
    if (!response.ok) throw new Error(result.error || `Erreur HTTP : ${response.status}`);

    return result;

  } catch (error) {
    throw error;
  }
}

export const api = {
  getLists: () => apiRequest("lists"),
  postList: (data) => apiRequest("lists", "POST", data),
  patchList: (data) => apiRequest(`lists/${data.id}`, "PATCH", { title: data.title, position: data.position }),
  deleteList: (id) => apiRequest(`lists/${id}`, "DELETE"),

  getCards: () => apiRequest("cards"),
  postCard: (data) => apiRequest("cards", "POST", data),
  patchCard: (data) => apiRequest(`cards/${data.id}`, "PATCH", { content: data.content, position: data.position }),
  deleteCard: (id) => apiRequest(`cards/${id}`, "DELETE"),
};
```
