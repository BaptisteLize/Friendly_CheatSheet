# Exemple d'un fichier complet de gestion d'une API dans un SPA
```js
import { api } from "./api.js";
import modal from "./modal-handler.js";
import card from "./card-handler.js";

const sortable = window.Sortable;

const list = {

  async init() {
    document.getElementById("add-list-button").addEventListener("click", () => modal.open("add-list-modal"));
    await this.fetchAndDisplayAll();
    this.handleForms("list");
    this.dragAndDrop();
  },

  dragAndDrop() {
    const listsContainer = document.getElementById("lists-container");
    sortable.create(listsContainer, { 
      animation: 300,
      handle: ".message-header",
      async onEnd() {
        try {
          const updates = Array.from(listsContainer.children).map((list, index) => {
            const id = list.dataset.id;
            const position = index + 1;
            return api.patchList({ id, position });
          });
          await Promise.all(updates);
        } catch (error) {
          console.error(error);
        }
      }
    });
  },

  fillModalFields(modalId, button) {
    const dialog = document.getElementById(modalId);
    const section = button.closest("section");
    dialog.querySelector("input[name='title']").value = section.querySelector(`[slot="list-title"]`).textContent;
    dialog.querySelector("input[name='id']").value = button.dataset.id;
  },

  openPatchModal(button) {
    this.fillModalFields("patch-list-modal", button);
    modal.open("patch-list-modal");
  },

  openDeleteModal(button) {
    this.fillModalFields("delete-list-modal", button);
    document.getElementById("feedback-delete-list").textContent = "Attention - Toutes les cartes attachées seront supprimées !";
    document.getElementById("feedback-delete-list").className = "notification is-danger"
    modal.open("delete-list-modal");
  },
  
  create(list) {
    const template = document.getElementById("list-template").content.cloneNode(true);

    template.querySelector("section").dataset.id = list.id;
    template.querySelector(`[slot="list-title"]`).textContent = list.title;

    template.querySelector(`[slot="patch-list-button"]`).dataset.id = list.id;
    template.querySelector(`[slot="patch-list-button"]`).addEventListener("click", (e) => this.openPatchModal(e.currentTarget));

    template.querySelector(`[slot="delete-list-button"]`).dataset.id = list.id;
    template.querySelector(`[slot="delete-list-button"]`).addEventListener("click", (e) => this.openDeleteModal(e.currentTarget));

    template.querySelector(`[slot="add-card-button"]`).dataset.list_id = list.id;
    template.querySelector(`[slot="add-card-button"]`).addEventListener("click", (e) => card.openAddModal("add-card-modal", e.currentTarget));

    return template;
  },
  
  addOne(list) {
    document.getElementById("lists-container").appendChild(this.create(list));
  },
  
  addAll(lists) {
    lists.forEach(list => this.addOne(list));
  },
  
  async fetchAndDisplayAll() {
    try {
      const lists = await api.getLists();
      lists.forEach(list => {
        this.addOne(list);
        if (list.cards && list.cards.length > 0) {
          card.addAll(list.cards);
        }
      })
    } catch (error) {
      console.error(error);
    }
  },
  
  handleForms(type) {
    document.querySelectorAll(`dialog[id*="${type}"] form`).forEach(form => {
      form.addEventListener("submit", async (e) => this.handleFormSubmission(e));
    });
  },

  async handleFormSubmission(e) {
    e.preventDefault();
    const form = e.target;
    const dialog = form.closest("dialog");
    const data = Object.fromEntries(new FormData(form));
    data.title = data.title.trim();
    const feedback = dialog.querySelector(".notification");
    
    if (!data.title) {
      feedback.textContent = "Le titre ne peut pas être vide.";
      feedback.className = "notification is-danger";
      return;
    }

    try {

      if (dialog.id === "add-list-modal") {
        const result = await api.postList(data); 
        this.addOne(result);

      } else if (dialog.id === "patch-list-modal") {
        const result = await api.patchList(data);
        document.querySelector(`[data-id="${result.id}"] [slot="list-title"]`).textContent = result.title;

      } else if (dialog.id === "delete-list-modal") {
        await api.deleteList(data.id);
        document.querySelector(`section[data-id="${data.id}"]`).remove();
      }
      
      modal.close();

    } catch (error) {
      console.error(error);
      feedback.textContent = error.message || "Une erreur est survenue.";
      feedback.className = "notification is-danger";
      return;
    }
  }
};

export default list;
```
