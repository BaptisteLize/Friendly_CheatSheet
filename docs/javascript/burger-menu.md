# Burger Menu

```js
function showNavLinks() {
  const navLinks = document.getElementById("nav-links");
  const burgerMenu = document.getElementById("burger-menu");

  burgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  });
}
```
