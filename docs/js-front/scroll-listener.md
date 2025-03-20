# Écouteur de scroll
```js
window.addEventListener("scroll", async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 50) { 
        console.log("Chargement de nouveaux éléments..."); 
        // Ici, on appellera la fonction pour charger plus d'éléments
    }
});
```
📝 Explication :

- scrollTop → combien l'utilisateur a scrollé depuis le haut
- scrollHeight → hauteur totale du document
- clientHeight → hauteur visible de la fenêtre
  
On déclenche l'action quand on est à 50 pixels du bas de la page.
