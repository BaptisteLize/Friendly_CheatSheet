# Gestion basique des boîtes de dialogue

```js
const modal = {

  init() {
    document.querySelectorAll(".close").forEach(e => { e.addEventListener("click", modal.close) });
  },

  escapeListener(e) {
    if (e.key === "Escape") {
      modal.close(e);
      document.removeEventListener("keydown", this.escapeListener);
    }
  },

  open(modal) {
    const modalElement = document.getElementById(modal);

    if (modalElement) {
      modalElement.classList.add("is-active");
      document.addEventListener("keydown", this.escapeListener);
    }
  },

  close(e) {
    let dialog;

    if (e?.type === "submit") {
      dialog = e.target.closest(".modal");
    }

    if (e?.target) {
      dialog = e.target.closest(".modal");
    }

    if (e?.key === "Escape") {
      dialog = Array.from(document.querySelectorAll(".modal.is-active")).pop();
    }

    if (dialog) {
      const notif = dialog.querySelector(".notification");
      const form = dialog.querySelector("form");

      if (notif) notif.className = "notification is-hidden";
      if (form) form.reset();

      dialog.classList.remove("is-active");
    }

    if (!document.querySelector(".modal.is-active")) {
      document.removeEventListener("keydown", modal.escapeListener);
    }

  }

};

export default modal;
```
