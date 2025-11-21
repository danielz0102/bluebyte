import { useState } from "react";
import { Link } from "react-router-dom";
import "../../components/PostForm/PostForm.css";

export default function EditPostForm({ initialData = {}, onSubmit }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [image, setImage] = useState(() => {});
  const [previewUrl, setPreviewUrl] = useState(`data:image/jpeg;base64,${initialData.image}` || null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Debes iniciar sesión.");

    const postData = {
      title,
      content,
      image: image,
      userId: user.id,
      publishedAt: new Date().toISOString(),
      username: user.username,
    };

    onSubmit(postData);
  };

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
          Editar
        </button>
        <Link to="/home" className="btn btn-secondary linklike">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
