import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { httpClient } from "../httpClient";
import Alert from "../components/Alert/Alert";
import { Link } from "react-router-dom";

function RegisterPage() {
  localStorage.removeItem("user");

  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("image", imageFile);

    try {
      const { data } = await httpClient.post(
        "/registrar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      console.log(err);

      if (err.status === 401) {
        return setError(
          "Credenciales inválidas. Por favor, verifica tu información."
        );
      }

      if (err.status === 409) {
        return setError("El nombre de usuario ya existe");
      }

      setError(
        "Ha habido un error en el servidor. Inténtalo de nuevo más tarde."
      );
    }
  };

  const validate = () => {
    const user = (username || "").trim();
    const pass = (password || "").trim();
    const conf = (confirmPassword || "").trim();
    const usernameRe = /^[a-zA-Z0-9_.-]{3,20}$/;
    const passwordRe = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user || !pass || !conf || !email) {
      setError("Usuario, contraseñas y correo electrónico son obligatorios");
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
    if (pass !== conf) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    if (!imageFile) {
      setError("La foto de perfil es obligatoria");
      return false;
    }

    if (email && !emailRe.test(email)) {
      setError("Correo electrónico inválido");
      return false;
    }

    setError("");
    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="register-page"
      style={{
        backgroundColor: "#cce6ff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      <div className="register-box">
        <div className="register-header">
          <img
            src="/bluebyte-logo.png"
            alt="Bluebyte Logo"
            className="logo-img"
          />
          <h2>Únete a BlueByte</h2>
        </div>
        {error && <Alert message={error} />}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            onChange={(e) => setUsername(e.target.value.trim())}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            onChange={(e) => setConfirmPassword(e.target.value.trim())}
          />
          <div className="profile-photo">
            <label>Foto de perfil</label>
            <label htmlFor="file-upload" className="photo-placeholder">
              {profileImage ? (
                <img src={profileImage} alt="Preview" className="preview-img" />
              ) : (
                <span className="plus-sign">+</span>
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImageChange(e);
                setImageFile(e.target.files[0]);
              }}
              style={{ display: "none" }}
            />
          </div>

          <button type="submit">Registrarse</button>
          <Link to="/" className="login-link">
            Si ya tienes una cuenta, inicia sesión
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
