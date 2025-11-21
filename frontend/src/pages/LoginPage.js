import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../httpClient";
import { useState, useEffect } from "react";
import Alert from "../components/Alert/Alert";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const { data } = await httpClient.post("/login", {
        username,
        password,
      });

      console.log({ user: data.user });

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      console.log(err);

      if (err.response?.status === 401) {
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
    const user = (username || "").trim();
    const pass = (password || "").trim();
    const usernameRe = /^[a-zA-Z0-9_.-]{3,20}$/;
    const passwordRe = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/;

    if (!user || !pass) {
      setError("Llene los campos faltantes");
      return false;
    }
    if (!usernameRe.test(user)) {
      setError(
        "Usuario inválido: usa 3-20 caracteres alfanuméricos (._-), sin espacios."
      );
      return false;
    }
    if (!passwordRe.test(pass)) {
      setError(
        "Contraseña inválida: mínimo 8, al menos 1 número y 1 carácter especial, sin espacios."
      );
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
