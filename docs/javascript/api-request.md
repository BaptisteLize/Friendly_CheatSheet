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

    if (!response.ok) throw new Error(result.message || `Erreur HTTP : ${response.status}`);

    return result;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const api = {
  getPokemons: () => apiRequest("pokemons"),
  getTypes: () => apiRequest("types"),
  getTeams: () => apiRequest("teams"),

  postTeam: (data) => apiRequest("teams", "POST", data),
  addPokemonToTeam: (teamId, pokemonId) => apiRequest(`teams/${teamId}/pokemons/${pokemonId}`, "POST"),

  deleteTeam: (id) => apiRequest(`teams/${id}`, "DELETE"),

  updateTeam: (data) => apiRequest(`teams/${data.id}`, "PATCH", { name: data.name, description: data.description }),  
};
```
