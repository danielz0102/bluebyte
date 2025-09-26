import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import "./CreatePostPage.css";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí luego conectan con su back: POST /api/posts
    alert("Publicación creada (mock)!");
  };

  return (
    <MainLayout>
      <div className="page create-post-page">
        <div className="page-body">
          <div className="page-header">
            <h1>Publicar</h1>
          </div>

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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>General</option>
                <option>Anuncios</option>
                <option>Tutoriales</option>
                <option>Soporte</option>
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
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
              {image && <p>Seleccionado: {image.name}</p>}
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
        </div>
      </div>
    </MainLayout>
  );
}
