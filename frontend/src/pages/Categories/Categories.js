import MainLayout from "../../components/MainLayout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";

function Categories() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/categorias");
      setCategorias(data);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
      setError("No se pudieron cargar las categorías");
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
            <div className="category-card" key={i}>
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
    </MainLayout>
  );
}

export default Categories;
