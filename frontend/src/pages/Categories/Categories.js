import MainLayout from "../../components/MainLayout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { httpClient } from "../../httpClient";
import "./Categories.css";

function Categories() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const { data } = await httpClient.get("/categorias");
      setCategorias(data);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
      setError("No se pudieron cargar las categorías");
    }
  };

  const openCategory = async (catId) => {
    try {
      const { data } = await httpClient.get(`/categorias/${catId}/posts`);
      setPosts(data);
      setSelectedCategory(catId);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Error al obtener publicaciones");
    }
  };

  return (
    <MainLayout>
      <div className="up" onClick={() => navigate("/categorias/crear")}>
        <h2 className="category-title">Explora por categoría</h2>
        <button className="btn_categoria">Crear Categoría</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="category-grid">
        {categorias.length > 0 ? (
          categorias.map((cat, i) => (
            <div
              className="category-card"
              key={i}
              onClick={() => openCategory(cat.id)} 
            >
              <img
                src={`data:image/jpeg;base64,${cat.image}`}
                alt={cat.title}
                className="category-image"
              />
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
            </div>
          ))
        ) : (
          <p>No hay categorías registradas</p>
        )}
      </div>

      {}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>X</button>

            <h2>
              Categoría: {categorias.find(c => c.id === selectedCategory)?.title || "Cargando..."}
            </h2>

            {posts.length === 0 ? (
              <p>No hay publicaciones en esta categoría</p>
            ) : (
              posts.map(post => (
                <div key={post.id} className="post-card">
                  <h3>{post.title}</h3>
                  <small>
                    por <b>{post.username}</b> - {new Date(post.publishedAt).toLocaleDateString()}
                  </small>

                  <div className="post-image-container">
                    <img
                      src={`data:image/jpeg;base64,${post.image}`}
                      alt={post.title}
                      className="post-image"
                    />
                  </div>

                  <p>{post.content}</p>

                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
                    Ver publicación completa
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default Categories;