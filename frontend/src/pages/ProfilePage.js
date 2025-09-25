
import './ProfilePage.css';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  return (
    <div className="page profile-page">
      <Navbar />
      <div className="page-body">
        <div className="page-header">
          <h1>Mi Perfil</h1>
          <div className="breadcrumbs">
            <Link to="/home">Inicio</Link> <span>/</span> <span>Perfil</span>
          </div>
        </div>

        <section className="card">
          <div className="profile-grid">
            <div className="avatar-column">
              <img src="/default-avatar.png" alt="Avatar" className="avatar-lg" />
              <button className="btn btn-secondary">Cambiar foto</button>
            </div>
            <form className="form-column" onSubmit={(e)=>e.preventDefault()}>
              <div className="form-row">
                <label>Nombre</label>
                <input type="text" placeholder="Tu nombre" />
              </div>
              <div className="form-row">
                <label>Usuario</label>
                <input type="text" placeholder="usuario123" />
              </div>
              <div className="form-row">
                <label>Correo</label>
                <input type="email" placeholder="correo@ejemplo.com" />
              </div>
              <div className="form-row">
                <label>Bio</label>
                <textarea placeholder="Cuéntanos sobre ti..." rows="3"></textarea>
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" type="submit">Guardar cambios</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
