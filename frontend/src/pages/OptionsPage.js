import MainLayout from "../components/MainLayout/";
import "./OptionsPage.css";
import { useNavigate } from "react-router-dom";

export default function OptionsPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleDeleteAccount = () => {
    const ok = window.confirm(
      "¿Seguro que deseas borrar tu cuenta? (Acción de backend pendiente)"
    );
    if (ok) {
      alert("Tu solicitud de borrado se registró (simulada).");
      navigate("/");
    }
  };

  return (
    <MainLayout>
      <div className="page options-page">
        <div className="page-header">
          <h1>Opciones</h1>
        </div>

        <section className="card">
          <div className="options-list">
            <button className="btn btn-secondary" onClick={handleLogout}>
              Cerrar sesión
            </button>
            <button className="btn btn-danger" onClick={handleDeleteAccount}>
              Borrar cuenta
            </button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
