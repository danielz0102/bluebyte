import MainLayout from "../components/MainLayout/";
import "./OptionsPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OptionsPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const ok = window.confirm("¿Seguro que deseas borrar tu cuenta?");
    if (ok) {
      axios.delete(`http://localhost:3001/user/${userId}`).catch((err) => {
        console.error("Error al borrar la cuenta:", err);
      });

      localStorage.removeItem("user");
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
