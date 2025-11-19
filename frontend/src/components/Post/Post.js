import { useState } from "react";
import { Link } from "react-router-dom";
import { useComments } from "../../hooks/useComments";
import "./Post.css";

function Post({ post }) {
  const { comments, postComment } = useComments(post.id);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [mostrarComentarios, setMostrarComentarios] = useState(false);

  const handleComentar = async () => {
    setNuevoComentario("");
    await postComment(nuevoComentario);
  };

  const toggleComentarios = () => {
    setMostrarComentarios(!mostrarComentarios);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <span className="post-user">{post.username || "Usuario"}</span>
        <span className="post-category">Categoría: {post.category}</span>
        <span className="post-date">
          {new Date(post.publishedAt).toLocaleDateString()}
        </span>
      </div>

      <h3 className="post-title">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="post-text">{post.content}</p>

      {post.image && (
        <div className="post-image-container">
          <img
            src={`data:image/jpeg;base64,${post.image}`}
            alt="Post visual"
            className="post-image"
          />
        </div>
      )}

      <div className="post-actions">
        <div className="comments-count">
          <img
            src="/icons/comment.png"
            alt="Comment icon"
            className="comment-icon"
          />
          <span>{comments.length} comentarios</span>
        </div>
        <button onClick={toggleComentarios} className="toggle-comments-btn">
          {mostrarComentarios ? "Ocultar comentarios" : "Ver comentarios"}
        </button>
      </div>

      {mostrarComentarios && (
        <div className="comment-card">
          <div className="comment-scroll">
            {comments.map((c, i) => (
              <div key={i} className="comment-item">
                <div className="comment-header">
                  <img
                    src={`data:image/jpeg;base64,${c.image}`}
                    alt={c.username}
                    className="comment-avatar"
                  />
                  <div>
                    <p>
                      <strong>{c.username}</strong> comentó:
                    </p>
                    <p className="comment-date">
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p>{c.content}</p>
              </div>
            ))}
          </div>

          <div className="comment-box">
            <input
              type="text"
              placeholder="Escribe un comentario..."
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
            />
            <button onClick={handleComentar}>Comentar</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Post;
