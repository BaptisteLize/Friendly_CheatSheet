# Gestion complète d'un formulaire
```jsx
import { useState } from "react";

export default function AddBookMark({bookmarks, categories, addNewBookmark}) {

  const initialFormState = {
    url: "",
    logo: "",
    title: "",
    categoryId: ""
  }

  const [formData, setFormData] = useState(initialFormState)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value }
    setFormData(updatedData);
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
