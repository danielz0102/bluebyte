import './Categories.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Notifications from '../../components/Notifications/Notifications';

function Categories() {
  const categorias = [
    {
      nombre: 'Tecnología',
      descripcion: 'Últimas innovaciones, gadgets y avances digitales.',
      imagen: '/images/tech.png',
    },
    {
      nombre: 'Arte',
      descripcion: 'Diseño, ilustración, animación y expresión visual.',
      imagen: '/images/art.png',
    },
    {
      nombre: 'Gaming',
      descripcion: 'Noticias, reseñas y cultura gamer.',
      imagen: '/images/gaming.png',
    },
    {
      nombre: 'Ciencia',
      descripcion: 'Descubrimientos, espacio, biología y más.',
      imagen: '/images/science.png',
    },
  ];

  return (
    <div
      className="categories-page"
      style={{
        backgroundColor: "#cce6ff",
        backgroundImage: "url('/circuit.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      <Navbar />

      <div className="main-layout">
        <Sidebar />
        <main className="content-area">
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
        </main>
        <Notifications />
      </div>
    </div>
  );
}

export default Categories;