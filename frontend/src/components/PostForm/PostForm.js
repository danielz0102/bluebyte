import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PostForm.css";
import axios from "axios";

export default function PostForm({ initialData = {}, onSubmit }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [category, setCategory] = useState(initialData.category || "General");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState(initialData.content || "");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialData.image || null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Debes iniciar sesión.");

    const postData = {
      title,
      category,
      content,
      image: image,
      userId: user.id,
      publishedAt: new Date().toISOString(),
      isDraft: false,
      username: user.username,
    };

    onSubmit(postData);
  };

  const getCategories = async () => {
    const { data } = await axios.get("http://localhost:3001/categorias");

    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Título</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Escribe un título"
        />
      </div>

      <div className="form-row">
        <label>Categoría</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.title}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>Contenido</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          placeholder="Escribe tu publicación..."
        ></textarea>
      </div>

      <div className="form-row">
        <label>Imagen (opcional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setImage(file);
            setPreviewUrl(file ? URL.createObjectURL(file) : null);
          }}
        />
        {image && <p>Seleccionado: {image.name}</p>}
        {previewUrl && (
          <div className="image-preview">
            <img
              src={previewUrl}
              alt="Previsualización"
              className="preview-img"
            />
          </div>
        )}
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit">
          Publicar
        </button>
        <Link to="/home" className="btn btn-secondary linklike">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
