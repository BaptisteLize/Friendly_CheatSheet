# Gestion basique des boîtes de dialogue
```js
const modal = {

  init() {
    document.querySelectorAll(".close").forEach(e => { e.addEventListener("click", modal.close) });
  },

  escapeListener(e) {
    if (e.key === "Escape") {
      modal.close();
      document.removeEventListener("keydown", this.escapeListener);
    }
  },

  open(modalId) {
    document.getElementById(modalId).showModal();
    document.addEventListener("keydown", modal.escapeListener);
  },

  close() {
    const dialog = document.querySelector("dialog[open]");
    const notif = dialog.querySelector(".notification");
    const form = dialog.querySelector("form");

    if (notif) notif.className = "notification is-hidden";
    if (form) form.reset();
    
    dialog.close();

    if (!document.querySelector("dialog[open]")) {
      document.removeEventListener("keydown", modal.escapeListener);
    }
  },

};

export default modal;
```
