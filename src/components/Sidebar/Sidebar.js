import './Sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar-left">
      <div className="menu-item">
        <button
          className={location.pathname === '/nuevo-post' ? 'active' : ''}
          onClick={() => navigate('/nuevo-post')}
        >
          <img src="/icons/plus.png" alt="Nuevo Post" className="menu-icon" />
          Nuevo Post
        </button>
      </div>

      <div className="menu-item">
        <button
          className={location.pathname === '/home' ? 'active' : ''}
          onClick={() => navigate('/home')}
        >
          <img src="/icons/home.png" alt="Inicio" className="menu-icon" />
          Inicio
        </button>
      </div>

      <div className="menu-item">
        <button
          className={location.pathname === '/categorias' ? 'active' : ''}
          onClick={() => navigate('/categorias')}
        >
          <img src="/icons/categories.png" alt="Categorías" className="menu-icon" />
          Categorías
        </button>
      </div>

      <div className="menu-item">
        <button
          className={location.pathname === '/perfil' ? 'active' : ''}
          onClick={() => navigate('/perfil')}
        >
          <img src="/icons/profile.png" alt="Perfil" className="menu-icon" />
          Perfil
        </button>
      </div>

      <div className="menu-item">
        <button
          className={location.pathname === '/opciones' ? 'active' : ''}
          onClick={() => navigate('/opciones')}
        >
          <img src="/icons/settings.png" alt="Opciones" className="menu-icon" />
          Opciones
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;