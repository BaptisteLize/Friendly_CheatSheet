# Snippets Alert Error / Success

Utilisation classes Bootstrap cf [Alerts - Bootstrap](https://getbootstrap.com/docs/4.1/components/alerts/)

```ejs
<!-- Toast en cas d'erreur  -->
  <% if (locals.errorMessage) { %>
    <div class="alert alert-danger" role="alert">
      <%= errorMessage %>
    </div>
  <% } %>

  <!-- Toast en cas de succès  -->
  <% if (locals.successMessage) { %>
    <div class="alert alert-success" role="alert">
      <%= successMessage %>
    </div>
  <% } %>
```
