import './Post.css';

function Post() {
  return (
    <article className="post-card">
      <header className="post-header">
        <div className="user-info">
          <img src="/default-avatar.png" alt="Usuario" className="user-avatar" />
          <span className="user-name">Usuario</span>
        </div>
        <div className="post-meta">
          <span className="category">Categoría</span>
          <span className="date">Agosto 06, 2025</span>
        </div>
      </header>

      <h2 className="post-title">Título</h2>
      <p className="post-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
      </p>

      <div className="post-image">
        <img src="/image-placeholder.png" alt="Post visual" />
      </div>

      <footer className="post-footer">
        <div className="comments">
          <img src="/icons/comment.png" alt="Comentarios" className="comment-icon" />
          <span className="comment-count">20</span>
        </div>
        <button className="comment-button">Comentar</button>
      </footer>
    </article>
  );
}

export default Post;