import './Post.css';
import { useState } from 'react';

function Post() {
  const [comentarios, setComentarios] = useState([
    '¡Me encantó este post!',
    'Muy interesante, gracias por compartir.',
  ]);
  const [nuevoComentario, setNuevoComentario] = useState('');

  const handleComentar = () => {
    if (nuevoComentario.trim()) {
      setComentarios([...comentarios, nuevoComentario]);
      setNuevoComentario('');
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <span className="post-user">Usuario</span>
        <span className="post-category">Categoría: Tecnología</span>
        <span className="post-date">Agosto 06, 2025</span>
      </div>

      <h3 className="post-title">Título del Post</h3>
      <p className="post-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
      </p>

      <div className="post-image-container">
        <img src="/images/post.png" alt="Post visual" className="post-image" />
      </div>

      <div className="post-actions">
        <div className="likes">
          <img src="/icons/like.png" alt="Like icon" className="like-icon" />
          <span>20 likes</span>
        </div>
        <div className="comments-count">
          <img src="/icons/comment.png" alt="Comment icon" className="comment-icon" />
          <span>{comentarios.length} comentarios</span>
        </div>
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

      <div className="comment-list">
        {comentarios.map((c, i) => (
          <p key={i} className="comment-item">💬 {c}</p>
        ))}
      </div>
    </div>
  );
}

export default Post;