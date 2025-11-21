import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PostForm.css";
import { httpClient } from "../../httpClient";

export default function PostForm({ initialData = {}, onSubmit }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [category, setCategory] = useState(initialData.category || "General");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState(initialData.content || "");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialData.image || null);
  const navigate = useNavigate();

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
    const { data } = await httpClient.get("/categorias");

    if (data.length === 0) {
      alert("No hay categorías disponibles. Crea una categoría primero.");
      navigate("/categorias/crear");
      return;
    }

    setCategories(data);
    setCategory(data[0].id);
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
            <option key={cat.id} value={cat.id}>
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
        <label>Imagen</label>
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
