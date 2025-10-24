import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <header className="topbar">
      <img src="/bluebyte-logo.png" alt="Bluebyte Logo" className="logo-img" />

      <div className="navbar-center">
        <input type="text" placeholder="Buscar" className="search-bar" />
      </div>

      <div className="user-profile">
        <img
          src={user?.image || "/default-avatar.png"}
          alt={user?.username || "Usuario"}
          className="profile-img"
        />        <span className="user-label">{user?.username || "Usuario"}</span>
      </div>
    </header>
  );
}

export default Navbar;
