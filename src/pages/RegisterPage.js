import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RegisterPage() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/home');
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
          <img src="/bluebyte-logo.png" alt="Bluebyte Logo" className="logo-img" />
          <h2>Únete a BlueByte</h2>
        </div>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Nombre de usuario" />
          <input type="password" placeholder="Contraseña" />
          <input type="password" placeholder="Confirmar contraseña" />

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
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;