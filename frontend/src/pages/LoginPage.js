import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Alert from "../components/Alert/Alert";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:3001/login", {
      username,
      password,
    });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-header">
          <img
            src="/bluebyte-logo.png"
            alt="Bluebyte Logo"
            className="logo-img"
          />
          <h2>Iniciar sesión</h2>
        </div>
        {error && <Alert message={error} />}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button-group">
            <button type="submit">Iniciar</button>
            <button
              type="button"
              className="register-btn"
              onClick={handleRegister}
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
