import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar-left">
      <div className="menu-item">
  <button>
    <img src="/icons/plus.png" alt="Nuevo Post" className="menu-icon" />
    Nuevo Post
  </button>
</div>

<div className="menu-item">
  <button className="active">
    <img src="/icons/home.png" alt="Inicio" className="menu-icon" />
    Inicio
  </button>
</div>

<div className="menu-item">
  <button>
    <img src="/icons/categories.png" alt="Categorías" className="menu-icon" />
    Categorías
  </button>
</div>

<div className="menu-item">
  <button>
    <img src="/icons/profile.png" alt="Perfil" className="menu-icon" />
    Perfil
  </button>
</div>

<div className="menu-item">
  <button>
    <img src="/icons/settings.png" alt="Opciones" className="menu-icon" />
    Opciones
  </button>
</div>
    </aside>
  );
}

export default Sidebar;