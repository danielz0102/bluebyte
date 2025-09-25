import './Navbar.css';

function Navbar() {
  return (
    <header className="topbar">
      <img src="/bluebyte-logo.png" alt="Bluebyte Logo" className="logo-img" />

      <div className="navbar-center">
        <input type="text" placeholder="Buscar" className="search-bar" />
      </div>

      <div className="user-profile">
        <img src="/default-avatar.png" alt="Usuario" className="profile-img" />
        <span className="user-label">Usuario</span>
      </div>
    </header>
  );
}


export default Navbar;