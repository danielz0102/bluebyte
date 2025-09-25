
import './PostDetailPage.css';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const mockPost = {
  id: 1,
  title: 'Primer Post de ejemplo',
  author: 'Usuario',
  date: '2025-09-20',
  content: 'Este es un contenido de ejemplo para la pantalla de Publicaciones y comentarios. Aquí podrán ver el post y comentar.',
};

export default function PostDetailPage() {
  const [comments, setComments] = useState([
    { id: 1, user: 'Ana', text: '¡Excelente publicación!' },
    { id: 2, user: 'Luis', text: 'Gracias por compartir.' },
  ]);
  const [text, setText] = useState('');

  const addComment = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setComments([...comments, { id: Date.now(), user: 'Tú', text: t }]);
    setText('');
  };

  return (
    <div className="page post-detail-page">
      <Navbar />
      <div className="page-body">
        <div className="page-header">
          <h1>Publicación</h1>
          <div className="breadcrumbs">
            <Link to="/home">Inicio</Link> <span>/</span> <span>Publicaciones y comentarios</span>
          </div>
        </div>

        <article className="card post-card">
          <h2>{mockPost.title}</h2>
          <div className="meta">
            <span>por <b>{mockPost.author}</b></span>
            <span>{mockPost.date}</span>
          </div>
          <p className="content">{mockPost.content}</p>
        </article>

        <section className="card comments-card">
          <h3>Comentarios ({comments.length})</h3>
          <ul className="comment-list">
            {comments.map(c => (
              <li key={c.id}>
                <b>{c.user}:</b> <span>{c.text}</span>
              </li>
            ))}
          </ul>

          <form className="add-comment" onSubmit={addComment}>
            <input
              placeholder="Escribe un comentario..."
              value={text}
              onChange={(e)=>setText(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">Comentar</button>
          </form>
        </section>
      </div>
    </div>
  );
}
