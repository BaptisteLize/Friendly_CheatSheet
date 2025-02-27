# Snippets Navlinks

Ajusté si un utilisateur connecté est trouvé ou non

```ejs
<% if (locals.user) { %>
<!-- Si l'utilisateur est connecté -->
<a class="p-2 text-white" href="/me"><%= user.firstname %></a>
<a class="p-2 text-white" href="/logout">Se déconnecter</a>
             
<% } else { %>
<!-- Si l'utilisaetur n'est pas connecté -->
<a class="p-2 text-white" href="/register">S'inscrire</a>
<a class="p-2 text-white" href="/login">Se connecter</a>
<% } %>
```
