import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Alert from "../components/Alert/Alert";

function LoginPage() {
  localStorage.removeItem("user");

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const { data } = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      console.log(err);

      if (err.status === 401) {
        return setError(
          "Credenciales inválidas. Por favor, verifica tu información."
        );
      }

      setError(
        "Ha habido un error en el servidor. Inténtalo de nuevo más tarde."
      );
    }
  };

  const validate = () => {
    if (!username || !password) {
      setError("Llene los campos faltantes");
      return false;
    }

    setError("");
    return true;
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
            onChange={(e) => setUsername(e.target.value.trim())}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={(e) => setPassword(e.target.value.trim())}
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
