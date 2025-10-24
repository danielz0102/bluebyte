import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { useParams } from "react-router-dom";
import "./PostDetailPage.css";
import axios from "axios";

const mockPost = {
  id: 1,
  title: "Primer Post de ejemplo",
  author: "Usuario",
  date: "2025-09-20",
  content:
    "Este es un contenido de ejemplo para la pantalla de Publicaciones y comentarios. Aquí podrán ver el post y comentar.",
};

export default function PostDetailPage() {
  const { id } = useParams();
  const [comments, setComments] = useState([
    { id: 1, user: "Ana", text: "¡Excelente publicación!" },
    { id: 2, user: "Luis", text: "Gracias por compartir." },
  ]);
  const [post, setPost] = useState(null);
  const [text, setText] = useState("");

  const getPost = async (postId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/publicaciones/${postId}`
      );

      setPost(data);
    } catch (err) {
      console.error("Error al cargar la publicación:", err);
      alert("Error al cargar la publicación");
    }
  };

  useEffect(() => {
    getPost(id);
  }, [id]);

  const addComment = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setComments([...comments, { id: Date.now(), user: "Tú", text: t }]);
    setText("");
  };

  return (
    <MainLayout>
      <div className="page post-detail-page">
        <div className="page-body">
          <div className="page-header">
            <h1>Publicación</h1>
          </div>

          <article className="card post-card">
            <h2>{post?.title ?? "Cargando..."}</h2>
            <div className="meta">
              <span>
                por <b>{post?.username}</b>
              </span>
              <span>{new Date(post?.publishedAt).toLocaleDateString()}</span>
            </div>
            <img
              src={post?.image ? `data:image/jpeg;base64,${post.image}` : ""}
              alt={post?.title}
              style={{ maxWidth: "600px" }}
            />
            <p className="content">{post?.content}</p>
          </article>

          <section className="card comments-card">
            <h3>Comentarios ({comments.length})</h3>
            <ul className="comment-list">
              {comments.map((c) => (
                <li key={c.id}>
                  <b>{c.user}:</b> <span>{c.text}</span>
                </li>
              ))}
            </ul>

            <form className="add-comment" onSubmit={addComment}>
              <input
                placeholder="Escribe un comentario..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Comentar
              </button>
            </form>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
