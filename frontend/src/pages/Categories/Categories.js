import MainLayout from "../../components/MainLayout/";
import "./Categories.css";

function Categories() {
  const categorias = [
    {
      nombre: "Tecnología",
      descripcion: "Últimas innovaciones, gadgets y avances digitales.",
      imagen: "/images/tech.png",
    },
    {
      nombre: "Arte",
      descripcion: "Diseño, ilustración, animación y expresión visual.",
      imagen: "/images/art.png",
    },
    {
      nombre: "Gaming",
      descripcion: "Noticias, reseñas y cultura gamer.",
      imagen: "/images/gaming.png",
    },
    {
      nombre: "Ciencia",
      descripcion: "Descubrimientos, espacio, biología y más.",
      imagen: "/images/science.png",
    },
  ];

  return (
    <MainLayout>
      <h2 className="category-title">Explora por categoría</h2>
      <div className="category-grid">
        {categorias.map((cat, i) => (
          <div className="category-card" key={i}>
            <img src={cat.imagen} alt={cat.nombre} className="category-image" />
            <h3>{cat.nombre}</h3>
            <p>{cat.descripcion}</p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Categories;
