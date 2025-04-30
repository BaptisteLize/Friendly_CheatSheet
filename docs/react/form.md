# Gestion complète d'un formulaire

```jsx
import { useState, ChangeEvent, FormEvent } from "react";

export default function AddBookMark({bookmarks, categories, addNewBookmark}) {

  const initialFormState = {
    url: "",
    logo: "",
    title: "",
    categoryId: ""
  }

  const [formData, setFormData] = useState(initialFormState)
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value }
    setFormData(updatedData);
  }
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newBookMark = {
      id: bookmarks.length + 1,
      title: formData.title,
      image_url: formData.logo,
      url: formData.url,
      category_id: formData.categoryId
    }

    addNewBookmark(newBookMark)
    
    setFormData(initialFormState)
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Bookmark your URL</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              id="url"
              name="url"
              aria-label="URL"
              type="text"
              placeholder="Site URL"
              className="input input-bordered w-full max-w-xs"
              value={formData.url}
              onChange={handleChange}
            />
            <input
              id="logo"
              name="logo"
              aria-label="Logo"
              type="text"
              placeholder="Image Logo URL"
              className="input input-bordered w-full max-w-xs"
              value={formData.logo}
              onChange={handleChange}
            />
            <input
              id="title"
              name="title"
              aria-label="Title"
              type="text"
              placeholder="Title"
              className="input input-bordered w-full max-w-xs"
              value={formData.title}
              onChange={handleChange}
            />
            <select
              id="category"
              name="categoryId"
              aria-label="Category"
              className="select select-bordered w-full max-w-xs"
              value={formData.categoryId}
              onChange={handleChange}
            >
              <option disabled value="">
                Category
              </option>
              {categories.map((category) => (
                <option key={`category-${category.id}`} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

Autre exemple :

Avec l'import d'une fonction addNewExpense

```js
import { IExpense } from '../types/index.d';

export async function addNewExpense(data: IExpense) {
  try {
    const response = await fetch("http://localhost:3000/expenses", {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });         

      const result = await response.json();
            
      if (!response.ok) {      
        throw new Error(result?.message || "Erreur lors de l’ajout de la dépense.");
      }
      return result;


  } catch (error) {
      console.error(error);
      throw error;

  }
```

```jsx
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { TCategories, TExpenses } from "../../types";
import { addNewExpense } from "../../services/expenseService";

interface FormProps {
  expenses: TExpenses
  setExpenses: Dispatch<SetStateAction<TExpenses>>
  categories: TCategories
}

export function ExpensesAddForm({categories, expenses, setExpenses}: FormProps) {

  const initialFormState = {
    amount: "",
    description: "",
    date: "",
    categoryId: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newExpense = {
      amount: Number(formData.amount),
      description: formData.description,
      date: new Date(formData.date).toISOString().split("T")[0],
      category_id: Number(formData.categoryId),
    };

    addNewExpense(newExpense);

    setExpenses([...expenses, newExpense]);

    setFormData(initialFormState);
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">Ajouter une dépense</h1>
        <form onSubmit={handleSubmit} method="POST">
          <div className="field">
            <label className="label" htmlFor="category">
              Selection de la Catégorie
            </label>
            <div className="control">
            <select
              id="category"
              name="categoryId"
              aria-label="Category"
              className="select"
              value={formData.categoryId}
              onChange={handleChange}
            >
              <option disabled value=""> Select Category </option>
              {categories.map((category) => (
              <option key={`category-${category.id}`} value={category.id}>
              {category.name}
              </option>
              ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="description">
              Description de la dépense
            </label>
            <div className="control">
              <input
                name="description"
                className="input"
                type="text"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Ex : Courses, Restaurant..."
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="amount">
              Montant (€)
            </label>
            <div className="control">
              <input
                name="amount"
                className="input"
                type="number"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                placeholder="Ex : 25.50"
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="date">
              Date
            </label>
            <div className="control">
              <input
                name="date"
                className="input"
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" type="submit">
                Ajouter
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
```
