import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-header">
          <img src="/bluebyte-logo.png" alt="Bluebyte Logo" className="logo-img" />
          <h2>Iniciar sesión</h2>
        </div>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Nombre de usuario" />
          <input type="password" placeholder="Contraseña" />
          <div className="button-group">
            <button type="submit">Iniciar</button>
            <button type="button" className="register-btn" onClick={handleRegister}>
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;